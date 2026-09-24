/**
 * Site copy, keyed by locale.
 *
 * English is the source of truth: `useT` falls back to it whenever a key is
 * missing from another locale, so a partially translated locale degrades to
 * English rather than showing raw keys.
 *
 * The zh entries below cover navigation and footer chrome only: enough to
 * prove the plumbing works. No page copy has been translated, and none should
 * be published until a native business-Chinese speaker has reviewed it. Pay
 * particular attention to industry terms (数据标注, 语音采集, 转写, 质检):
 * getting those subtly wrong reads as an outsider to anyone in the field.
 */

export const DEFAULT_LOCALE = 'en';

/**
 * Locales actually served. Chinese stays off until a native business-Chinese
 * speaker has reviewed the copy: a half-reviewed Chinese page aimed at Chinese
 * buyers is worse than no Chinese page at all, and an hreflang alternate that
 * resolves to English copy actively misleads search engines.
 *
 * Set VITE_ENABLE_ZH=true once the review is done.
 */
export const ENABLED_LOCALES = [
  'en',
  ...(import.meta.env.VITE_ENABLE_ZH === 'true' ? ['zh'] : []),
];

export const LOCALE_META = {
  en: { label: 'English', short: 'EN', htmlLang: 'en' },
  zh: { label: '中文', short: '中文', htmlLang: 'zh-Hans' },
};

const en = {
  nav: {
    capabilities: 'Capabilities',
    company: 'Company',
    jobs: 'Jobs',
    cta: 'Start a project',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
  },
  footer: {
    blurb:
      'Speech, image and text training data, collected and annotated by native-speaker teams we recruit, contract and manage ourselves.',
    services: 'Services',
    company: 'Company',
    capabilities: 'Capabilities',
    quality: 'How quality is controlled',
    startProject: 'Start a project',
    supplierInfo: 'Company & compliance',
    openRoles: 'Open roles',
    contact: 'Contact',
    privacy: 'Privacy',
    terms: 'Terms',
    rights: 'All rights reserved.',
  },
};

const zh = {
  nav: {
    capabilities: '服务能力',
    company: '公司与合规',
    jobs: '招募岗位',
    cta: '开始合作',
    openMenu: '打开菜单',
    closeMenu: '关闭菜单',
    language: '语言',
  },
  footer: {
    blurb:
      '语音、图像与文本训练数据。由我们自行招募、签约并管理的母语者团队完成采集与标注。',
    services: '服务',
    company: '公司',
    capabilities: '服务能力',
    quality: '质量管控流程',
    startProject: '开始合作',
    supplierInfo: '公司与合规',
    openRoles: '招募岗位',
    contact: '联系我们',
    privacy: '隐私政策',
    terms: '使用条款',
    rights: '版权所有。',
  },
};

export const translations = { en, zh };
