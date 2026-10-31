import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Restores scroll position on navigation.
 *
 * Previously this watched `pathname` alone and always jumped to the top, which
 * broke the two cases the navbar dropdowns depend on: landing on a URL with a
 * hash, and changing only the hash while already on the page.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }

    // The target may not be mounted yet on a cross-page jump, so try on the
    // next frame as well before giving up and going to the top.
    const scrollToTarget = () => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
      }
      return false;
    };

    if (scrollToTarget()) return undefined;

    const frame = requestAnimationFrame(() => {
      if (!scrollToTarget()) window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
