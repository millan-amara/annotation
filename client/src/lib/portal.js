import { createContext, useContext, useEffect, useState } from "react";
import { COMPANY } from "../data/company";

export const AuthContext = createContext(null);

/** Sets the tab title and keeps portal pages out of search results. */
export function usePortalTitle(title) {
  useEffect(() => {
    document.title = `${title} · ${COMPANY.name} contributors`;
    let robots = document.head.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, nofollow");
  }, [title]);
}

/** Session, profile and consent records for the signed-in contributor. */
export function useAuth() {
  return useContext(AuthContext);
}

/** Latest answer per checkbox for one consent form, keyed by item_key. */
export function latestConsents(consents, form) {
  const latest = {};
  for (const row of consents) {
    if (row.form !== form) continue;
    const prev = latest[row.item_key];
    if (!prev || row.created_at >= prev.created_at) latest[row.item_key] = row;
  }
  return latest;
}

/**
 * True when every required item of the current version of a consent
 * definition has been accepted. A new version means asking again.
 */
export function hasConsented(consents, form, definition) {
  const latest = latestConsents(consents, form);
  return definition.items
    .filter((item) => item.required)
    .every((item) => {
      const row = latest[item.key];
      return row && row.accepted && row.form_version === definition.version;
    });
}

/** Rows to insert for one answered consent form. */
export function consentRows(userId, form, definition, answers) {
  return definition.items.map((item) => ({
    user_id: userId,
    form,
    form_version: definition.version,
    item_key: item.key,
    accepted: Boolean(answers[item.key]),
    wording: item.text,
  }));
}

export function isProfileComplete(profile) {
  return Boolean(
    profile?.full_name && profile?.phone && profile?.country && profile?.city
  );
}

/** One-line description of where a contributor's payments go. */
export function describePayout(payout) {
  if (!payout) return "";
  if (payout.method === "mpesa") {
    return `M-Pesa ${payout.mpesa_number} (${payout.mpesa_name})`;
  }
  return `${payout.bank_name}, ${payout.account_name}, account ${payout.account_number}`;
}

export function formatHours(minutes) {
  const hours = (Number(minutes) || 0) / 60;
  return `${hours.toFixed(1)} h`;
}

export function formatMoney(amount, currency = "KES") {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
}

export function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Checkbox answers for a ConsentForm; canSubmit once every required item is ticked. */
export function useConsentAnswers(definition) {
  const [answers, setAnswers] = useState({});
  const canSubmit = definition.items
    .filter((item) => item.required)
    .every((item) => answers[item.key]);
  const set = (key, value) => setAnswers((prev) => ({ ...prev, [key]: value }));
  return { answers, set, canSubmit };
}

export const EMPTY_PROFILE = {
  full_name: "",
  phone: "",
  country: "",
  city: "",
  categories: [],
  weekly_hours: "",
};

/** The editable subset of a profile row, ready for a form. */
export function profileFormValues(profile) {
  const values = { ...EMPTY_PROFILE };
  for (const key of Object.keys(EMPTY_PROFILE)) {
    if (profile?.[key] !== null && profile?.[key] !== undefined) {
      values[key] = profile[key];
    }
  }
  return values;
}

/** The same values, shaped for an update to the profiles table. */
export function profileUpdate(values) {
  return {
    ...values,
    full_name: values.full_name.trim(),
    phone: values.phone.trim(),
    city: values.city.trim(),
    weekly_hours: values.weekly_hours === "" ? null : Number(values.weekly_hours),
  };
}
