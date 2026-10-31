import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { AuthContext } from "../../lib/portal";

export default function AuthProvider({ children }) {
  // undefined while the stored session is being read, null when signed out.
  const [session, setSession] = useState(undefined);
  const [profile, setProfile] = useState(null);
  const [consents, setConsents] = useState([]);
  const [loadedFor, setLoadedFor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, next) =>
      setSession(next)
    );
    return () => data.subscription.unsubscribe();
  }, []);

  const userId = session?.user?.id ?? null;

  const refresh = useCallback(async () => {
    if (!userId) return;
    const [p, c] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).single(),
      supabase
        .from("consents")
        .select("*")
        .eq("user_id", userId)
        .order("created_at"),
    ]);
    setError(p.error || c.error || null);
    setProfile(p.data ?? null);
    setConsents(c.data ?? []);
    setLoadedFor(userId);
  }, [userId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = {
    session,
    user: session?.user ?? null,
    profile,
    consents,
    error,
    refresh,
    loading: session === undefined || (userId !== null && loadedFor !== userId),
    signOut: () => supabase.auth.signOut(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
