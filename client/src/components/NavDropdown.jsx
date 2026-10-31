import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

/**
 * Navbar dropdown.
 *
 * Opens on hover for mouse users and on click/Enter for everyone else. A
 * hover-only menu is unreachable by keyboard and invisible to touch, which is
 * the usual failing of this pattern.
 *
 * Closes on Escape, on outside click, and on navigation. Focus returns to the
 * trigger when Escape closes it.
 */
function NavDropdown({ label, to, items, linkClasses }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const triggerRef = useRef(null);
  const closeTimer = useRef(null);
  const { pathname, hash } = useLocation();

  // Close whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointerDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  // A short delay stops the menu snapping shut when the pointer crosses the
  // gap between the trigger and the panel.
  const openNow = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const isActive = pathname === to;

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`${linkClasses({ isActive })} inline-flex items-center gap-1 cursor-pointer`}
      >
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full pt-3 z-50">
          <div className="min-w-[17rem] rounded-md border border-ink-200 bg-white py-2 shadow-sm">
            <Link
              to={to}
              className="block px-4 py-2 text-sm font-medium text-ink-950 hover:bg-ink-50"
            >
              {label} overview
            </Link>
            <div className="my-2 border-t border-ink-100" />
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block px-4 py-2 text-sm text-ink-600 hover:bg-ink-50 hover:text-ink-950"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavDropdown;
