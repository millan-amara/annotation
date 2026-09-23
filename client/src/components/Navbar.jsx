import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { COMPANY } from '../data/company';
import { useT, useLocalePath } from '../i18n/LocaleContext';
import LanguageSwitcher from './LanguageSwitcher';
import { ButtonLink } from './ui/Button';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => setMobileMenuOpen(false);
  const t = useT();
  const lp = useLocalePath();

  const navItems = [
    { label: t('nav.capabilities'), to: lp('/capabilities') },
    { label: t('nav.company'), to: lp('/company') },
    { label: t('nav.jobs'), to: lp('/jobs') },
  ];

  const linkClasses = ({ isActive }) =>
    [
      'text-sm transition-colors',
      isActive ? 'text-ink-950 font-medium' : 'text-ink-600 hover:text-ink-950',
    ].join(' ');

  const mobileLinkClasses = ({ isActive }) =>
    isActive ? 'text-ink-950 font-medium' : 'text-ink-600';

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-ink-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to={lp('/')} className="flex items-center gap-2.5" onClick={closeMenu}>
          <img src="/logo.png" alt="" className="h-7 w-7 rounded" />
          <span className="font-display text-lg font-semibold text-ink-950 tracking-tight">
            {COMPANY.name}
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end className={linkClasses}>
              {item.label}
            </NavLink>
          ))}
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

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-ink-200">
          <div className="px-6 py-5 flex flex-col gap-5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={mobileLinkClasses}
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
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
