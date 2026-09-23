import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, MapPin } from 'lucide-react';
import { COMPANY } from '../data/company';
import { useT, useLocalePath } from '../i18n/LocaleContext';

/**
 * Site-wide footer. Previously each page carried its own copy of a single
 * copyright line, in two different styles; this is the one shared version.
 */
const Footer = () => {
  const year = new Date().getFullYear();
  const t = useT();
  const lp = useLocalePath();

  const columns = [
    {
      heading: t('footer.services'),
      links: [
        { label: t('footer.capabilities'), to: lp('/capabilities') },
        { label: t('footer.quality'), to: lp('/capabilities') + '#faq' },
        { label: t('footer.startProject'), to: lp('/contact') },
      ],
    },
    {
      heading: t('footer.company'),
      links: [
        { label: t('footer.supplierInfo'), to: lp('/company') },
        { label: t('footer.openRoles'), to: lp('/jobs') },
        { label: t('footer.contact'), to: lp('/contact') },
      ],
    },
  ];

  const entityLine = [
    COMPANY.legalName,
    COMPANY.registrationNumber && `Reg. no. ${COMPANY.registrationNumber}`,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <footer className="bg-ink-950 text-ink-400 border-t border-ink-800">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              to={lp('/')}
              className="inline-flex items-center gap-3 text-xl font-bold text-white mb-4"
            >
              <img src="/logo.png" alt="" className="h-8 w-8 rounded" />
              {COMPANY.name}
            </Link>
            <p className="text-sm leading-relaxed max-w-sm mb-6">{t('footer.blurb')}</p>
            <div className="space-y-2 text-sm">
              <a
                href={'mailto:' + COMPANY.email}
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Mail size={16} />
                {COMPANY.email}
              </a>
              <a
                href={COMPANY.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                {COMPANY.city}, {COMPANY.country}
              </div>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((column) => (
            <div key={column.heading}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">
                {column.heading}
              </h3>
              <ul className="space-y-3 text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="hover:text-white transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal bar */}
        <div className="mt-12 pt-8 border-t border-ink-800 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-sm">
          <div>
            <div>
              &copy; {year} {COMPANY.name}. {t('footer.rights')}
            </div>
            {entityLine && <div className="text-ink-500 mt-1">{entityLine}</div>}
          </div>
          <div className="flex gap-6">
            <Link to={lp('/privacy')} className="hover:text-white transition">
              {t('footer.privacy')}
            </Link>
            <Link to={lp('/terms')} className="hover:text-white transition">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
