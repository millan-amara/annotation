import { Link, NavLink, useNavigate } from "react-router-dom";
import { Home, Upload, Wallet, User, Shield, LogOut } from "lucide-react";
import { useAuth, usePortalTitle } from "../../lib/portal";
import { COMPANY } from "../../data/company";

const NAV = [
  { to: "/user/dashboard", label: "Home", icon: Home },
  { to: "/user/submissions", label: "Submissions", icon: Upload },
  { to: "/user/payments", label: "Payments", icon: Wallet },
  { to: "/user/profile", label: "Profile", icon: User },
];

const ADMIN_NAV = { to: "/user/admin", label: "Admin", icon: Shield };

function Brand() {
  return (
    <Link to="/user/dashboard" className="flex items-center gap-2">
      <img src="/logo.svg" alt="" className="h-6 w-6" />
      <span className="font-display text-base font-semibold text-ink-950 tracking-tight">
        {COMPANY.name}
      </span>
      <span className="text-xs text-ink-500">contributors</span>
    </Link>
  );
}

/**
 * Shell for every signed-in portal page. A sidebar from `md` up; below that a
 * slim header and a bottom tab bar, since contributors are mostly on phones.
 * `aside` adds a right-hand column on large screens, stacked below on phones.
 */
export default function PortalLayout({ title, children, wide = false, aside = null }) {
  usePortalTitle(title);
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const items = profile?.is_admin ? [...NAV, ADMIN_NAV] : NAV;

  const handleSignOut = async () => {
    await signOut();
    navigate("/user/login", { replace: true });
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? "bg-ink-950 text-white" : "text-ink-700 hover:bg-ink-100"
    }`;

  return (
    <div className="min-h-screen bg-ink-50">
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-60 flex-col justify-between border-r border-ink-200 bg-white">
        <div>
          <div className="px-5 py-5">
            <Brand />
          </div>
          <nav className="space-y-1 px-3">
            {items.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                <item.icon size={18} aria-hidden="true" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="border-t border-ink-100 p-4">
          <p className="truncate px-1 text-sm font-medium text-ink-900">
            {profile?.full_name || profile?.email}
          </p>
          <button
            onClick={handleSignOut}
            className="mt-2 flex items-center gap-2 px-1 text-sm text-ink-500 hover:text-signal-error"
          >
            <LogOut size={16} aria-hidden="true" />
            Sign out
          </button>
        </div>
      </aside>

      <header className="md:hidden sticky top-0 z-20 flex h-14 items-center justify-between border-b border-ink-200 bg-white px-4">
        <Brand />
        <button
          onClick={handleSignOut}
          className="flex items-center gap-1.5 text-sm text-ink-500"
          aria-label="Sign out"
        >
          <LogOut size={18} aria-hidden="true" />
        </button>
      </header>

      <main className="md:pl-60 pb-24 md:pb-10">
        <div className={`mx-auto px-4 py-6 sm:px-6 md:py-10 ${wide || aside ? "max-w-6xl" : "max-w-3xl"}`}>
          <h1 className="mb-6 font-display text-2xl font-semibold text-ink-950">{title}</h1>
          {aside ? (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
              <div className="space-y-6">{children}</div>
              <aside className="space-y-6 lg:sticky lg:top-10">{aside}</aside>
            </div>
          ) : (
            <div className="space-y-6">{children}</div>
          )}
        </div>
      </main>

      <nav className="md:hidden fixed inset-x-0 bottom-0 z-20 flex border-t border-ink-200 bg-white pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium ${
                isActive ? "text-accent-700" : "text-ink-500"
              }`
            }
          >
            <item.icon size={20} aria-hidden="true" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

/** Centred card for the signed-out pages: sign in, sign up, password reset. */
export function AuthShell({ title, children }) {
  usePortalTitle(title);
  return (
    <div className="min-h-screen bg-ink-50 flex flex-col items-center px-4 py-10 sm:py-16">
      <div className="mb-8">
        <Brand />
      </div>
      <div className="w-full max-w-md rounded-lg border border-ink-200 bg-white p-6 sm:p-8">
        <h1 className="mb-6 font-display text-xl font-semibold text-ink-950">{title}</h1>
        {children}
      </div>
      <Link to="/" className="mt-6 text-sm text-ink-500 hover:text-ink-800">
        Back to {COMPANY.name}
      </Link>
    </div>
  );
}
