import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Jobs from "./pages/Jobs";
import Capabilities from './pages/Capabilities';
import Company from "./pages/Company";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import WorkerDashboard from "./pages/WorkerDashboard";
import WorkerJobs from "./pages/WorkerJobs";
import JobDetails from "./pages/JobDetails";
import Payments from "./pages/Payments";
import NotFound from "./pages/NotFound";
import ScrollToTop from './components/ScrollToTop.jsx';
import LocaleProvider from './i18n/LocaleProvider';
import { ENABLED_LOCALES } from './i18n/translations';

/**
 * The contributor portal is still a mock-data prototype: no authentication, no
 * real balances, a logout button that does nothing. Serving it publicly meant
 * anyone could open /user/payments and see invented earnings and a working
 * "Withdraw" button.
 *
 * It stays in the codebase and stays routable in development, but it is off in
 * production until it has real auth behind it. Set VITE_ENABLE_PORTAL=true in
 * the environment to turn it on.
 */
const PORTAL_ENABLED =
  import.meta.env.VITE_ENABLE_PORTAL === 'true' || import.meta.env.DEV;

/**
 * The public pages, mounted once per locale. English is served unprefixed at
 * "/", other locales under their own prefix ("/zh/company"), so a link can be
 * sent to someone in the language they read rather than relying on a toggle
 * they have to find.
 */
function LocalisedSite({ locale }) {
  return (
    <LocaleProvider locale={locale}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/capabilities" element={<Capabilities />} />
        <Route path="/company" element={<Company />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {PORTAL_ENABLED && (
          <>
            <Route path="/user/dashboard" element={<WorkerDashboard />} />
            <Route path="/user/payments" element={<Payments />} />
            <Route path="/workerjobs" element={<WorkerJobs />} />
            <Route path="/workerjobs/show" element={<JobDetails />} />
          </>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </LocaleProvider>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {ENABLED_LOCALES.includes('zh') && (
          <Route path="/zh/*" element={<LocalisedSite locale="zh" />} />
        )}
        <Route path="/*" element={<LocalisedSite locale="en" />} />
      </Routes>
    </Router>
  );
}

export default App
