import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "./supabase";
import { payDateFor, periodOf } from "./portal";
import { PAYMENT_TERMS } from "../data/portal";

const add = (map, currency, amount) => {
  map[currency] = (map[currency] || 0) + amount;
};

/**
 * Earnings arithmetic in one place, so the dashboard, payments page and admin
 * balances can never disagree. Amounts are set by an admin at review time.
 *
 * Accepted work belongs to the pay period (month) it was accepted in; each
 * period is paid by PAYMENT_TERMS.payDay of the next month. The statement has
 * one line per period and currency:
 *   accruing  the current month, still open
 *   due       closed and not yet fully paid
 *   paid      settled
 * Money totals are { currency: amount } maps, so currencies are never mixed.
 */
export function summarise(submissions, payments, now = new Date()) {
  const totals = {
    minutesSubmitted: 0,
    minutesAccepted: 0,
    pending: 0,
    earned: {},
    paid: {},
    due: {},
    accruing: {},
    statement: [],
    nextPayDate: null,
    lastFeedback: "",
  };
  const current = periodOf(now);
  const lines = {};
  const line = (period, currency) => {
    const key = `${period}|${currency}`;
    lines[key] ??= { period, currency, earned: 0, paid: 0 };
    return lines[key];
  };

  for (const s of submissions) {
    totals.minutesSubmitted += Number(s.minutes_submitted) || 0;
    totals.minutesAccepted += Number(s.minutes_accepted) || 0;
    if (s.status === "pending") totals.pending += 1;
    const amount = Number(s.amount) || 0;
    if (amount && s.pay_period) {
      line(s.pay_period, s.currency).earned += amount;
      add(totals.earned, s.currency, amount);
    }
  }

  for (const p of payments) {
    const amount = Number(p.amount) || 0;
    // Payments recorded before pay periods existed settle the month before
    // the one they were paid in.
    const period = p.period || periodOf(new Date(new Date(p.paid_on).getTime() - 20 * 864e5));
    line(period, p.currency).paid += amount;
    add(totals.paid, p.currency, amount);
  }

  for (const l of Object.values(lines)) {
    l.outstanding = l.earned - l.paid;
    l.payDate = payDateFor(l.period, PAYMENT_TERMS.payDay);
    if (l.outstanding < 0.005) l.status = "paid";
    else if (l.period >= current) l.status = "accruing";
    else l.status = "due";

    if (l.status === "due") add(totals.due, l.currency, l.outstanding);
    if (l.status === "accruing") add(totals.accruing, l.currency, l.outstanding);
    if (l.status !== "paid" && (!totals.nextPayDate || l.payDate < totals.nextPayDate)) {
      totals.nextPayDate = l.payDate;
    }
  }
  totals.statement = Object.values(lines).sort((a, b) =>
    a.period === b.period ? a.currency.localeCompare(b.currency) : a.period < b.period ? 1 : -1
  );

  const reviewed = submissions
    .filter((s) => s.feedback && s.reviewed_at)
    .sort((a, b) => (a.reviewed_at < b.reviewed_at ? 1 : -1));
  totals.lastFeedback = reviewed[0]?.feedback || "";
  return totals;
}

/** The signed-in contributor's submissions and payments, with totals. */
export function useContributorData(userId) {
  const [state, setState] = useState({
    submissions: [],
    payments: [],
    loaded: false,
    error: "",
  });

  const reload = useCallback(async () => {
    const [s, p] = await Promise.all([
      supabase
        .from("submissions")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false }),
      supabase
        .from("payments")
        .select("*")
        .eq("user_id", userId)
        .order("paid_on", { ascending: false }),
    ]);
    setState({
      submissions: s.data ?? [],
      payments: p.data ?? [],
      loaded: true,
      error: s.error?.message || p.error?.message || "",
    });
  }, [userId]);

  useEffect(() => {
    reload();
  }, [reload]);

  const totals = useMemo(
    () => summarise(state.submissions, state.payments),
    [state.submissions, state.payments]
  );

  return { ...state, totals, reload };
}
