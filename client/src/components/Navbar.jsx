import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { COMPANY } from '../data/company';
import { useT, useLocalePath } from '../i18n/LocaleContext';
import LanguageSwitcher from './LanguageSwitcher';
import NavDropdown from './NavDropdown';
import { ButtonLink } from './ui/Button';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => setMobileMenuOpen(false);
  const t = useT();
  const lp = useLocalePath();

  /**
   * Dropdowns only where a page genuinely has sections worth jumping to.
   * Jobs and Contact are single-purpose pages and stay direct links: an
   * invented sub-menu on a short page reads as a site pretending to be larger
   * than it is.
   */
  const navItems = [
    {
      label: t('nav.capabilities'),
      to: lp('/capabilities'),
      items: [
        { label: 'What we collect and annotate', to: lp('/capabilities') + '#data-types' },
        { label: 'Languages we recruit for', to: lp('/capabilities') + '#languages' },
        { label: 'How a project runs', to: lp('/capabilities') + '#workflow' },
        { label: 'How quality is controlled', to: lp('/capabilities') + '#quality' },
        { label: 'Frequently asked', to: lp('/capabilities') + '#faq' },
      ],
    },
    {
      label: t('nav.company'),
      to: lp('/company'),
      items: [
        { label: 'Legal entity', to: lp('/company') + '#entity' },
        { label: 'How we contract and operate', to: lp('/company') + '#terms-of-engagement' },
        { label: 'Delivery history', to: lp('/company') + '#track-record' },
      ],
    },
    { label: t('nav.jobs'), to: lp('/jobs') },
  ];

  const linkClasses = ({ isActive }) =>
    [
      'text-[15px] transition-colors',
      isActive ? 'text-ink-950 font-medium' : 'text-ink-600 hover:text-ink-950',
    ].join(' ');

  const mobileLinkClasses = ({ isActive }) =>
    isActive ? 'text-ink-950 font-medium' : 'text-ink-600';

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-ink-200">
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
        <Link to={lp('/')} className="flex items-center gap-2.5" onClick={closeMenu}>
          <img src="/logo.svg" alt="" className="h-7 w-7" />
          <span className="font-display text-lg font-semibold text-ink-950 tracking-tight">
            {COMPANY.name}
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
            item.items ? (
              <NavDropdown
                key={item.to}
                label={item.label}
                to={item.to}
                items={item.items}
                linkClasses={linkClasses}
              />
            ) : (
              <NavLink key={item.to} to={item.to} end className={linkClasses}>
                {item.label}
              </NavLink>
            )
          )}
          <LanguageSwitcher />
          <ButtonLink to={lp('/contact')}>{t('nav.cta')}</ButtonLink>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-ink-700"
          aria-label={mobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu: sections listed inline, since a floating panel on a
          touch screen is worse than a short list. */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-ink-200 max-h-[80vh] overflow-y-auto">
          <div className="px-6 py-5 flex flex-col gap-5">
            {navItems.map((item) => (
              <div key={item.to}>
                <NavLink
                  to={item.to}
                  end
                  className={mobileLinkClasses}
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
                {item.items && (
                  <div className="mt-3 ml-4 flex flex-col gap-3 border-l border-ink-200 pl-4">
                    {item.items.map((sub) => (
                      <Link
                        key={sub.to}
                        to={sub.to}
                        className="text-sm text-ink-500"
                        onClick={closeMenu}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <ButtonLink to={lp('/contact')} className="w-full" onClick={closeMenu}>
              {t('nav.cta')}
            </ButtonLink>
            <LanguageSwitcher onNavigate={closeMenu} />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
