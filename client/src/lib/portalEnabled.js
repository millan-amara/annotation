/**
 * Whether the contributor portal (/user/*) is served. Off in production until
 * VITE_ENABLE_PORTAL=true is set, so the site can deploy before the Supabase
 * project exists; public pages check this before linking to it.
 */
export const PORTAL_ENABLED =
  import.meta.env.VITE_ENABLE_PORTAL === "true" || import.meta.env.DEV;

export const PORTAL_SIGNUP = "/user/signup";
export const PORTAL_SIGNIN = "/user/login";
