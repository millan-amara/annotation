import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Jobs from "./pages/Jobs";
import Capabilities from './pages/Capabilities';
import Company from "./pages/Company";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import ScrollToTop from './components/ScrollToTop.jsx';
import LocaleProvider from './i18n/LocaleProvider';
import { ENABLED_LOCALES } from './i18n/translations';
import { PORTAL_ENABLED } from './lib/portalEnabled';

/**
 * The contributor portal (/user/*): Supabase auth, profiles, consent records,
 * submissions and payments. Setup is in docs/portal-setup.md. Lazy-loaded, so
 * the public pages never download the Supabase client.
 */
const Portal = lazy(() => import("./pages/portal/Portal"));

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
        {PORTAL_ENABLED && (
          <Route
            path="/user/*"
            element={
              <Suspense fallback={null}>
                <Portal />
              </Suspense>
            }
          />
        )}
        {ENABLED_LOCALES.includes('zh') && (
          <Route path="/zh/*" element={<LocalisedSite locale="zh" />} />
        )}
        <Route path="/*" element={<LocalisedSite locale="en" />} />
      </Routes>
    </Router>
  );
}

export default App
