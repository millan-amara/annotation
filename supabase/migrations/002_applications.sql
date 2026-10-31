-- Migration 002: per-project applications.
--
-- Approval, Drive folder and project answers (categories, weekly hours) move
-- from the profile to a new applications table, one row per contributor per
-- project. Run after 001. A fresh project just runs schema.sql.
-- SQL Editor -> New query -> paste -> Run.

-- ---------------------------------------------------------------------------
-- Applications: one per contributor per project. Approval, the contributor's
-- Drive folder and their answers to the project's questions live here, so
-- being approved for one project says nothing about the next.
-- ---------------------------------------------------------------------------

create table public.applications (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid()
    references public.profiles (id) on delete cascade,
  project text not null,       -- a project slug from client/src/data/portal.js
  answers jsonb not null default '{}',
  status text not null default 'applied'
    check (status in ('applied', 'approved', 'paused', 'rejected', 'withdrawn')),
  drive_folder_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, project)
);

create index applications_project_idx on public.applications (project, status);

-- A contributor may edit their answers, withdraw, and re-apply after
-- withdrawing. Everything else (approval, Drive folder) is an admin's call.
-- auth.uid() is null in the SQL editor, which is trusted like an admin.
create function public.guard_application()
returns trigger
language plpgsql
as $$
declare
  contributor boolean := auth.uid() is not null and not public.is_admin();
begin
  if tg_op = 'INSERT' then
    new.created_at := now();
    if contributor then
      new.status := 'applied';
      new.drive_folder_url := null;
    end if;
  elsif contributor then
    if new.user_id is distinct from old.user_id
      or new.project is distinct from old.project
      or new.drive_folder_url is distinct from old.drive_folder_url
      or (new.status is distinct from old.status and not (
        (new.status = 'withdrawn' and old.status in ('applied', 'approved', 'paused'))
        or (new.status = 'applied' and old.status = 'withdrawn')
      )) then
      raise exception 'Only an administrator can change that field';
    end if;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

create trigger guard_application
  before insert or update on public.applications
  for each row execute function public.guard_application();

alter table public.applications enable row level security;

create policy "Read own applications, admins read all" on public.applications
  for select using (user_id = auth.uid() or public.is_admin());

create policy "Apply to projects" on public.applications
  for insert with check (user_id = auth.uid());

create policy "Update own application, admins update all" on public.applications
  for update using (user_id = auth.uid() or public.is_admin());

-- Contributors may only log submissions for projects they're approved on.
drop policy "Log own submissions" on public.submissions;

create policy "Log submissions for approved projects" on public.submissions
  for insert with check (
    user_id = auth.uid()
    and exists (
      select 1 from public.applications a
      where a.user_id = auth.uid()
        and a.project = submissions.project
        and a.status = 'approved'
    )
  );

-- Carry existing profiles over as applications to the first video project,
-- keeping their status and Drive folder.
insert into public.applications (user_id, project, answers, status, drive_folder_url)
select
  id,
  'video-collection-1',
  jsonb_build_object('categories', to_jsonb(categories), 'weekly_hours', weekly_hours),
  status,
  drive_folder_url
from public.profiles
where full_name is not null and cardinality(categories) > 0;

-- The profile guard referred to the columns about to go.
create or replace function public.protect_profile_fields()
returns trigger
language plpgsql
as $$
begin
  if auth.uid() is not null and not public.is_admin() then
    if new.is_admin is distinct from old.is_admin
      or new.email is distinct from old.email then
      raise exception 'Only an administrator can change that field';
    end if;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

alter table public.profiles
  drop column categories,
  drop column weekly_hours,
  drop column status,
  drop column drive_folder_url;
