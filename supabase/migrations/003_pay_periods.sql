-- Migration 003: monthly pay periods and USD amounts.
--
-- Accepted work is paid monthly: everything accepted in a calendar month is
-- paid by the 15th of the next. Amounts are in USD; each payment also records
-- the local amount actually sent, the exchange rate and where the rate came
-- from. Run after 002. A fresh project just runs schema.sql.
-- SQL Editor -> New query -> paste -> Run.

alter table public.submissions
  add column pay_period text check (pay_period ~ '^\d{4}-\d{2}$');

alter table public.submissions alter column currency set default 'USD';

create or replace function public.guard_submission()
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
      new.pay_period := null;
    end if;
  elsif new.status is distinct from old.status
    or new.minutes_accepted is distinct from old.minutes_accepted
    or new.amount is distinct from old.amount then
    new.reviewed_at := now();
  end if;

  -- The pay period is the month (Nairobi time) the work was first accepted.
  -- It is set once, so editing a review later never moves earnings into a
  -- different month; an admin can still change it deliberately.
  if new.status in ('accepted', 'partial') then
    if new.pay_period is null then
      new.pay_period := to_char(now() at time zone 'Africa/Nairobi', 'YYYY-MM');
    end if;
  else
    new.pay_period := null;
  end if;
  return new;
end;
$$;

-- Work already accepted belongs to the month it was reviewed.
update public.submissions
set pay_period = to_char(reviewed_at at time zone 'Africa/Nairobi', 'YYYY-MM')
where status in ('accepted', 'partial') and reviewed_at is not null;

alter table public.payments
  add column period text check (period ~ '^\d{4}-\d{2}$'),  -- the pay period this settles
  add column local_amount numeric(12, 2) check (local_amount > 0),  -- what was sent, e.g. KES
  add column local_currency text,
  add column exchange_rate numeric(12, 4) check (exchange_rate > 0),
  add column rate_source text;

alter table public.payments alter column currency set default 'USD';
