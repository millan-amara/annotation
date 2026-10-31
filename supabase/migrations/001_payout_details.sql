-- Migration 001: move payment details off the profile into payout_details.
--
-- Only for a database set up with the first version of schema.sql (the one
-- with profiles.mpesa_number). A fresh project just runs schema.sql.
-- SQL Editor -> New query -> paste -> Run.

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

-- Carry over any M-Pesa numbers already entered. The registered name wasn't
-- collected before, so the contributor's profile name stands in for it; they
-- can correct it on the Payments page.
insert into public.payout_details (user_id, method, mpesa_number, mpesa_name)
select id, 'mpesa', mpesa_number, coalesce(full_name, '')
from public.profiles
where mpesa_number is not null and mpesa_number <> '';

alter table public.profiles drop column mpesa_number;
