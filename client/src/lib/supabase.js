import { createClient } from "@supabase/supabase-js";

// The anon key is public by design: what a visitor can read or write is
// decided by the row-level security policies in supabase/schema.sql, not by
// keeping this key secret.
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** Null when the portal has not been configured for this environment. */
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
