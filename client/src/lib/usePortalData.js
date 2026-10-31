import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "./supabase";

/**
 * Earnings arithmetic in one place, so the dashboard, payments page and admin
 * balances can never disagree. Amounts are set by an admin at review time.
 */
export function summarise(submissions, payments) {
  const totals = {
    minutesSubmitted: 0,
    minutesAccepted: 0,
    earned: 0,
    paid: 0,
    pending: 0,
    lastFeedback: "",
  };
  for (const s of submissions) {
    totals.minutesSubmitted += Number(s.minutes_submitted) || 0;
    totals.minutesAccepted += Number(s.minutes_accepted) || 0;
    totals.earned += Number(s.amount) || 0;
    if (s.status === "pending") totals.pending += 1;
  }
  for (const p of payments) totals.paid += Number(p.amount) || 0;

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
