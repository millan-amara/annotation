# Contributor portal: setup

The portal lives at `/user/*` (`/user/login` to start). Contributors sign up,
complete a profile, agree to the roster and project terms, log footage batches
they have uploaded to Drive, choose to be paid by M-Pesa or bank, and see their
reviews and payments. Admins approve contributors, review submissions and
record payments, all from `/user/admin`.

Footage itself never touches the portal: it stays in Google Drive.

## 1. Create the Supabase project

1. Sign up at supabase.com and create a project. Choose the region closest to
   Kenya that is offered (currently Europe, e.g. Frankfurt or London, is the
   usual choice).
2. **SQL Editor -> New query**, paste all of `supabase/schema.sql`, **Run**.
3. **Project Settings -> API**: copy the project URL and the anon (publishable)
   key.

### Updating an existing database

If you ran an earlier `schema.sql`, apply the files in `supabase/migrations/`
that came after it, in order, the same way (SQL Editor -> paste -> Run).
- `001_payout_details.sql` moves payment details off the profile into their
  own table and carries over any M-Pesa numbers already entered.
- `002_applications.sql` moves approval, Drive folders and project answers
  from the profile to per-project applications, carrying existing profiles
  over as applications to the first video project.
- `003_pay_periods.sql` adds monthly pay periods and USD amounts, with the
  local amount, exchange rate and rate source on each payment.

## 2. Configure sign-in

**Authentication -> URL Configuration**

- Site URL: `https://peskaya.com` (or wherever the site is served)
- Redirect URLs: add `https://peskaya.com/user/**` and, for local work,
  `http://localhost:5173/user/**`

**Authentication -> Sign In / Providers -> Email**: leave "Confirm email" on.

**Email sending: do this before inviting contributors.** Supabase's built-in
email sender is for testing only and sends just a few emails per hour. With
dozens of sign-ups in a day, confirmation and password-reset emails will stop
arriving. Under **Authentication -> Emails -> SMTP Settings**, connect a real
sender (Resend, Brevo, Postmark and Amazon SES all have free or cheap tiers),
sending from an address on the company domain.

While editing emails, change the confirmation email's wording to mention
Peskaya so contributors recognise it.

## 3. Environment variables

Locally: copy `client/.env.example` to `client/.env.local` and fill it in.

On Vercel: **Project -> Settings -> Environment Variables**, add the same three
(`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ENABLE_PORTAL=true`) and
redeploy. Without `VITE_ENABLE_PORTAL=true` the portal routes don't exist in
production.

## 4. Make yourself an admin

Sign up through `/user/login` like a contributor and complete your profile.
Then in the SQL editor:

```sql
update public.profiles
set is_admin = true
where email = 'you@example.com';
```

Sign out and back in; an **Admin** tab appears.

## Adding a project

Projects are defined in `client/src/data/portal.js`, in `PROJECTS`. Each one
has its brief, its `questions` (asked when someone applies; answers are stored
on the application), its spec and its consent terms. Copy the existing entry,
give it a new `slug`, and set `open: true`. The portal pages, the Jobs page and
the admin filters pick it up from there. Changing an existing project's terms
means bumping its `consent.version`; approved contributors are then asked to
agree again before logging more work.

## Day-to-day

1. **Sign-up** asks only for name, WhatsApp number and location, plus a
   general consent to hold those details. Nothing project-specific.
2. **Applying**: contributors pick an open project from their home page, read
   the brief, answer the project's questions and agree to its terms.
3. **Approving**: applications appear under Admin -> Applications, filtered to
   `applied`. Check the answers, message them on WhatsApp (the number is a
   link), then set the status to `approved` and paste in their Drive folder
   link. Approval is per project; approving someone for one project gives
   them nothing on another.
   - Create one Drive folder per contributor per project, shared with them as
     editor.
   - Only approved contributors can log batches for that project; the
     database enforces it.
4. **Review**: Admin -> Review lists pending batches. Open the files, check
   each clip against the spec, then record minutes accepted, amount earned and
   feedback. The contributor sees this immediately.
5. **Pay, monthly**: work counts towards the month you accept it in review,
   and each month is paid by the 15th of the next (`PAYMENT_TERMS` in
   `client/src/data/portal.js`). Amounts are in USD.
   - Admin -> Payments -> **Owed** lists each contributor's unpaid months.
     Closed months have a **Pay** button; the current month is shown but
     can't be paid yet.
   - Convert at the Central Bank of Kenya mean rate on the day, and send.
     For M-Pesa, check that the name M-Pesa shows matches the registered
     name they gave before confirming.
   - Record the payment: the USD amount, the amount actually sent in KES,
     the rate source, and the M-Pesa code or bank reference. The rate is
     worked out for you. The contributor sees all of it on their statement.

## Data protection notes

- Consent records are append-only and store the exact wording each person saw.
  If you change any consent text in `client/src/data/portal.js`, **bump its
  `version`**: everyone is then asked to agree to the new version.
- The consent wording is still the draft in `docs/contributor-consent.md` and
  should go to the legal reviewer before wide use.
- Account deletion requests: delete the user under **Authentication -> Users**.
  Their profile, consents and submissions go with it. If they have payment
  records, deletion is blocked on purpose: payments are financial records;
  decide with your accountant what to keep.
- Collect only what's in the profile form. Don't add ID-number fields unless
  payment or tax rules require them.
