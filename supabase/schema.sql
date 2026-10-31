-- Peskaya contributor portal: tables, access rules and triggers.
--
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- See docs/portal-setup.md for the rest of the setup.
--
-- Access model, enforced here rather than in the browser (the browser is not
-- trusted; anyone can call the API with the public key):
--   - A contributor can read their own rows and nothing else.
--   - A contributor can edit their own profile details, but not their status,
--     admin flag or Drive folder.
--   - A contributor can log submissions, but cannot set review results.
--   - Consent records are append-only. Withdrawal is a new row, never an edit,
--     so there is always a record of what was agreed and when.
--   - Payout details (M-Pesa or bank) are readable by their owner and admins.
--   - Payments are written by admins only.

-- ---------------------------------------------------------------------------
-- Profiles: one per signed-up user, created automatically at sign-up.
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  phone text,
  country text,
  city text,
  categories text[] not null default '{}',
  weekly_hours numeric(5, 1) check (weekly_hours >= 0),
  status text not null default 'applied'
    check (status in ('applied', 'approved', 'paused', 'rejected')),
  drive_folder_url text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Security definer so policies can call it without recursing into the
-- profiles policies themselves.
create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select is_admin from public.profiles where id = auth.uid()),
    false
  );
$$;

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- auth.uid() is null when you run SQL in the dashboard editor, which is how
-- the first admin gets set (see docs/portal-setup.md).
create function public.protect_profile_fields()
returns trigger
language plpgsql
as $$
begin
  if auth.uid() is not null and not public.is_admin() then
    if new.status is distinct from old.status
      or new.is_admin is distinct from old.is_admin
      or new.drive_folder_url is distinct from old.drive_folder_url
      or new.email is distinct from old.email then
      raise exception 'Only an administrator can change that field';
    end if;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

create trigger protect_profile_fields
  before update on public.profiles
  for each row execute function public.protect_profile_fields();

alter table public.profiles enable row level security;

create policy "Read own profile, admins read all" on public.profiles
  for select using (id = auth.uid() or public.is_admin());

create policy "Update own profile, admins update all" on public.profiles
  for update using (id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------------
-- Consents: append-only log. One row per checkbox per time it was answered.
-- ---------------------------------------------------------------------------

create table public.consents (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  form text not null,          -- 'roster', or a project slug
  form_version text not null,
  item_key text not null,
  accepted boolean not null,
  wording text not null,       -- the exact text the contributor saw
  created_at timestamptz not null default now()
);

create index consents_user_id_idx on public.consents (user_id);

-- The timestamp is evidence; don't let the browser supply it.
create function public.stamp_created_at()
returns trigger
language plpgsql
as $$
begin
  new.created_at := now();
  return new;
end;
$$;

create trigger stamp_consent_time
  before insert on public.consents
  for each row execute function public.stamp_created_at();

alter table public.consents enable row level security;

create policy "Read own consents, admins read all" on public.consents
  for select using (user_id = auth.uid() or public.is_admin());

create policy "Record own consent" on public.consents
  for insert with check (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- Submissions: a contributor logs a batch of footage they uploaded to Drive;
-- an admin reviews it and records accepted minutes, amount and feedback.
-- ---------------------------------------------------------------------------

create table public.submissions (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid()
    references public.profiles (id) on delete cascade,
  project text not null,
  category text not null,
  clip_count integer not null check (clip_count > 0),
  minutes_submitted numeric(7, 1) not null check (minutes_submitted > 0),
  files_url text not null,
  notes text,
  status text not null default 'pending'
    check (status in ('pending', 'accepted', 'partial', 'rejected')),
  minutes_accepted numeric(7, 1) check (minutes_accepted >= 0),
  amount numeric(10, 2) check (amount >= 0),
  currency text not null default 'KES',
  feedback text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create index submissions_user_id_idx on public.submissions (user_id);

create function public.guard_submission()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' then
    new.created_at := now();
    if not public.is_admin() then
      new.status := 'pending';
      new.minutes_accepted := null;
      new.amount := null;
      new.feedback := null;
      new.reviewed_at := null;
    end if;
  elsif new.status is distinct from old.status
    or new.minutes_accepted is distinct from old.minutes_accepted
    or new.amount is distinct from old.amount then
    new.reviewed_at := now();
  end if;
  return new;
end;
$$;

create trigger guard_submission
  before insert or update on public.submissions
  for each row execute function public.guard_submission();

alter table public.submissions enable row level security;

create policy "Read own submissions, admins read all" on public.submissions
  for select using (user_id = auth.uid() or public.is_admin());

create policy "Log own submissions" on public.submissions
  for insert with check (user_id = auth.uid());

create policy "Admins review submissions" on public.submissions
  for update using (public.is_admin());

create policy "Withdraw own pending submission" on public.submissions
  for delete using (
    (user_id = auth.uid() and status = 'pending') or public.is_admin()
  );

-- ---------------------------------------------------------------------------
-- Payout details: how a contributor wants to be paid. One row per contributor,
-- kept apart from the profile so bank details are only loaded where needed.
-- ---------------------------------------------------------------------------

create table public.payout_details (
  user_id uuid primary key default auth.uid()
    references public.profiles (id) on delete cascade,
  method text not null check (method in ('mpesa', 'bank')),
  mpesa_number text,
  mpesa_name text,             -- as registered with M-Pesa, checked when sending
  bank_name text,
  bank_branch text,
  account_name text,
  account_number text,
  swift_code text,             -- only needed for banks outside Kenya
  updated_at timestamptz not null default now(),
  check (
    (method = 'mpesa' and mpesa_number is not null and mpesa_name is not null)
    or (method = 'bank' and bank_name is not null and account_name is not null
        and account_number is not null)
  )
);

create function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger touch_payout_details
  before insert or update on public.payout_details
  for each row execute function public.touch_updated_at();

alter table public.payout_details enable row level security;

create policy "Read own payout details, admins read all" on public.payout_details
  for select using (user_id = auth.uid() or public.is_admin());

create policy "Add own payout details" on public.payout_details
  for insert with check (user_id = auth.uid());

create policy "Update own payout details" on public.payout_details
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- Payments: written by admins, visible to the contributor they were paid to.
-- ---------------------------------------------------------------------------

create table public.payments (
  id bigint generated always as identity primary key,
  -- Restrict, not cascade: a payment record outlives an account deletion
  -- request and has to be dealt with deliberately.
  user_id uuid not null references public.profiles (id) on delete restrict,
  amount numeric(10, 2) not null check (amount > 0),
  currency text not null default 'KES',
  method text not null default 'M-Pesa',  -- 'M-Pesa' or 'Bank transfer'
  reference text,
  paid_on date not null default current_date,
  note text,
  created_at timestamptz not null default now()
);

create index payments_user_id_idx on public.payments (user_id);

alter table public.payments enable row level security;

create policy "Read own payments, admins read all" on public.payments
  for select using (user_id = auth.uid() or public.is_admin());

create policy "Admins record payments" on public.payments
  for insert with check (public.is_admin());

create policy "Admins correct payments" on public.payments
  for update using (public.is_admin());

create policy "Admins delete payments" on public.payments
  for delete using (public.is_admin());
