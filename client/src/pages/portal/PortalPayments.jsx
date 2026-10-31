import { useAuth, formatDate, formatMoney } from "../../lib/portal";
import { useContributorData } from "../../lib/usePortalData";
import PortalLayout from "../../components/portal/PortalLayout";
import { Notice, Panel, Spinner, Stat } from "../../components/portal/Controls";

export default function PortalPayments() {
  const { profile } = useAuth();
  const { payments, totals, loaded, error } = useContributorData(profile.id);

  return (
    <PortalLayout title="Payments">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Stat label="Earned" value={formatMoney(totals.earned)} hint="from accepted footage" />
        <Stat label="Paid" value={formatMoney(totals.paid)} />
        <Stat label="Balance due" value={formatMoney(totals.earned - totals.paid)} />
      </div>

      <p className="text-sm text-ink-600 leading-relaxed">
        Payments go to your M-Pesa number ending{" "}
        <span className="font-medium text-ink-900">{profile.mpesa_number.slice(-3)}</span>{" "}
        after your footage is reviewed. Each payment below shows its M-Pesa
        transaction code so you can match it to the message on your phone.
      </p>

      <Panel title="Payment history">
        <Notice tone="error">{error}</Notice>
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
