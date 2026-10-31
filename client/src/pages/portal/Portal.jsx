import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth, hasConsented, isProfileComplete } from "../../lib/portal";
import { ROSTER_CONSENT } from "../../data/portal";
import AuthProvider from "../../components/portal/AuthProvider";
import { AuthShell } from "../../components/portal/PortalLayout";
import { Notice, Spinner } from "../../components/portal/Controls";
import PortalLogin from "./PortalLogin";
import PortalResetPassword from "./PortalResetPassword";
import PortalOnboarding from "./PortalOnboarding";
import PortalDashboard from "./PortalDashboard";
import PortalProject from "./PortalProject";
import PortalSubmissions from "./PortalSubmissions";
import PortalPayments from "./PortalPayments";
import PortalProfile from "./PortalProfile";
import PortalAdmin from "./PortalAdmin";

/**
 * Guards a signed-in page. Contributors who have not finished their profile
 * and roster consent are sent to onboarding first, so no other page has to
 * handle a half-registered account.
 */
function RequireAuth({ children, admin = false, onboarding = false }) {
  const { user, profile, consents, loading, error } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner />;
  if (!user) {
    return <Navigate to="/user/login" replace state={{ from: location.pathname }} />;
  }
  if (!profile) {
    return (
      <AuthShell title="Something went wrong">
        <Notice tone="error">
          We could not load your account{error ? `: ${error.message}` : "."} Please
          refresh the page.
        </Notice>
      </AuthShell>
    );
  }

  const onboarded =
    isProfileComplete(profile) && hasConsented(consents, "roster", ROSTER_CONSENT);
  if (!onboarded && !onboarding) return <Navigate to="/user/onboarding" replace />;
  if (admin && !profile.is_admin) return <Navigate to="/user/dashboard" replace />;
  return children;
}

function NotConfigured() {
  return (
    <AuthShell title="Contributor portal">
      <Notice>
        The contributor portal is not available yet. Please check back soon.
      </Notice>
    </AuthShell>
  );
}

export default function Portal() {
  if (!supabase) return <NotConfigured />;

  const guarded = (element, options) => (
    <RequireAuth {...options}>{element}</RequireAuth>
  );

  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<PortalLogin />} />
        <Route path="signup" element={<PortalLogin initialMode="signup" />} />
        <Route path="reset-password" element={<PortalResetPassword />} />
        <Route
          path="onboarding"
          element={guarded(<PortalOnboarding />, { onboarding: true })}
        />
        <Route path="dashboard" element={guarded(<PortalDashboard />)} />
        <Route path="projects/:slug" element={guarded(<PortalProject />)} />
        <Route path="submissions" element={guarded(<PortalSubmissions />)} />
        <Route path="payments" element={guarded(<PortalPayments />)} />
        <Route path="profile" element={guarded(<PortalProfile />)} />
        <Route path="admin" element={guarded(<PortalAdmin />, { admin: true })} />
        <Route path="*" element={<Navigate to="/user/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}
