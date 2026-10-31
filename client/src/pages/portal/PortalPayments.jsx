import { useState } from "react";
import { useAuth, describePayout, formatAmounts, formatDate, formatMoney, periodLabel } from "../../lib/portal";
import { useContributorData } from "../../lib/usePortalData";
import { PAYMENT_TERMS } from "../../data/portal";
import PortalLayout from "../../components/portal/PortalLayout";
import PayoutForm from "../../components/portal/PayoutForm";
import { NextPaymentStat, Statement } from "../../components/portal/Money";
import { Notice, Panel, Spinner, Stat } from "../../components/portal/Controls";
import { Button } from "../../components/ui/Button";

function PayoutPanel() {
  const { user, profile, payout, refresh } = useAuth();
  const [editing, setEditing] = useState(false);

  if (!payout || editing) {
    return (
      <Panel title="Payment details">
        {!payout && (
          <p className="mb-5 text-sm text-ink-600 leading-relaxed">
            Tell us where to send your earnings. You can add these any time
            before your first payment, and change them later.
          </p>
        )}
        <PayoutForm
          userId={user.id}
          phone={profile.phone}
          payout={payout}
          onSaved={async () => {
            await refresh();
            setEditing(false);
          }}
          onCancel={payout ? () => setEditing(false) : undefined}
        />
      </Panel>
    );
  }

  return (
    <Panel
      title="Payment details"
      action={<Button variant="secondary" onClick={() => setEditing(true)}>Change</Button>}
    >
      <p className="text-sm text-ink-800">{describePayout(payout)}</p>
      <p className="mt-2 text-xs text-ink-500">Last updated {formatDate(payout.updated_at)}</p>
    </Panel>
  );
}

export default function PortalPayments() {
  const { profile } = useAuth();
  const { payments, totals, loaded, error } = useContributorData(profile.id);

  return (
    <PortalLayout title="Payments">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <NextPaymentStat totals={totals} />
        <Stat label="Earned" value={formatAmounts(totals.earned)} hint="all time" />
        <Stat label="Paid" value={formatAmounts(totals.paid)} hint="all time" />
      </div>

      <Notice tone="error">{error}</Notice>

      <Panel title="How you're paid">
        <div className="space-y-2 text-sm text-ink-700 leading-relaxed">
          <p>{PAYMENT_TERMS.summary}</p>
          <p>{PAYMENT_TERMS.conversion}</p>
        </div>
      </Panel>

      <Panel title="Monthly statement">
        {!loaded ? <Spinner /> : <Statement lines={totals.statement} />}
      </Panel>

      <PayoutPanel />

      <Panel title="Payment history">
        {!loaded ? (
          <Spinner />
        ) : payments.length === 0 ? (
          <p className="text-sm text-ink-500">No payments yet.</p>
        ) : (
          <ul className="divide-y divide-ink-100">
            {payments.map((p) => (
              <li key={p.id} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-ink-900">
                    {formatDate(p.paid_on)}
                    {p.period && <span className="font-normal text-ink-500"> · for {periodLabel(p.period)}</span>}
                  </p>
                  <p className="text-xs text-ink-500">
                    {p.method}
                    {p.reference && ` · ${p.reference}`}
                  </p>
                  {p.local_amount && (
                    <p className="mt-0.5 text-xs text-ink-500">
                      Sent as {formatMoney(p.local_amount, p.local_currency)}
                      {p.exchange_rate && ` at ${Number(p.exchange_rate)}`}
                      {p.rate_source && ` (${p.rate_source})`}
                    </p>
                  )}
                  {p.note && <p className="mt-1 text-sm text-ink-700">{p.note}</p>}
                </div>
                <p className="font-display text-base font-semibold text-ink-950 tabular-nums">
                  {formatMoney(p.amount, p.currency)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </PortalLayout>
  );
}
