import { formatAmounts, formatDate, formatMoney, periodLabel } from "../../lib/portal";
import { Stat } from "./Controls";

/** What's owed next: closed months awaiting payday, else this month so far. */
export function NextPaymentStat({ totals }) {
  const dueNow = Object.keys(totals.due).length > 0;
  return (
    <Stat
      label={dueNow ? "Due to you" : "This month so far"}
      value={formatAmounts(dueNow ? totals.due : totals.accruing)}
      hint={totals.nextPayDate ? `paid by ${formatDate(totals.nextPayDate)}` : "paid monthly"}
    />
  );
}

const STATUS = {
  accruing: { label: "In progress", className: "text-ink-600" },
  due: { label: "Due", className: "text-accent-700" },
  paid: { label: "Paid", className: "text-signal-success" },
};

/** One line per month: earned, paid, and whether it's open, due or settled. */
export function Statement({ lines }) {
  if (lines.length === 0) {
    return <p className="text-sm text-ink-500">Nothing yet. Accepted work will appear here by month.</p>;
  }
  return (
    <ul className="divide-y divide-ink-100">
      {lines.map((l) => {
        const status = STATUS[l.status];
        return (
          <li key={`${l.period}-${l.currency}`} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-ink-900">{periodLabel(l.period)}</p>
              <p className="text-xs text-ink-500">
                Earned {formatMoney(l.earned, l.currency)}
                {l.paid > 0 && ` · paid ${formatMoney(l.paid, l.currency)}`}
              </p>
            </div>
            <div className="text-right">
              <p className="font-display text-base font-semibold text-ink-950 tabular-nums">
                {formatMoney(l.status === "paid" ? l.paid : l.outstanding, l.currency)}
              </p>
              <p className={`text-xs font-medium ${status.className}`}>
                {l.status === "paid"
                  ? status.label
                  : l.status === "due" && l.payDate < new Date()
                    ? "Due now"
                    : `${status.label}: paid by ${formatDate(l.payDate)}`}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
