import React, { useMemo } from 'react';
import { LocaleContext } from './LocaleContext';

export default function LocaleProvider({ locale, children }) {
  const value = useMemo(() => ({ locale }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
