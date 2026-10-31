import { useState } from "react";
import { useAuth, describePayout, formatDate, formatMoney } from "../../lib/portal";
import { useContributorData } from "../../lib/usePortalData";
import PortalLayout from "../../components/portal/PortalLayout";
import PayoutForm from "../../components/portal/PayoutForm";
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
  const { profile, payout } = useAuth();
  const { payments, totals, loaded, error } = useContributorData(profile.id);

  return (
    <PortalLayout title="Payments">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Stat label="Earned" value={formatMoney(totals.earned)} hint="from accepted footage" />
        <Stat label="Paid" value={formatMoney(totals.paid)} />
        <Stat label="Balance due" value={formatMoney(totals.earned - totals.paid)} />
      </div>

      <PayoutPanel />

      <Panel title="Payment history">
        <Notice tone="error">{error}</Notice>
        <p className="mb-4 text-sm text-ink-600 leading-relaxed">
          We pay after your footage is reviewed.
          {payout?.method === "bank"
            ? " Each payment shows its bank reference, so you can match it to your statement."
            : " Each payment shows its M-Pesa transaction code, so you can match it to the message on your phone."}
        </p>
        {!loaded ? (
          <Spinner />
        ) : payments.length === 0 ? (
          <p className="text-sm text-ink-500">No payments yet.</p>
        ) : (
          <ul className="divide-y divide-ink-100">
            {payments.map((p) => (
              <li key={p.id} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-ink-900">{formatDate(p.paid_on)}</p>
                  <p className="text-xs text-ink-500">
                    {p.method}
                    {p.reference && ` · ${p.reference}`}
                  </p>
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
