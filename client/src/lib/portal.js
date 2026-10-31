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

export function formatMoney(amount, currency = "USD") {
  // Shillings are paid in whole units; dollars to the cent.
  const digits = currency === "KES" ? 0 : 2;
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(Number(amount) || 0);
}

/** A { currency: amount } map as one string, e.g. "US$40.00 + KES 1,200". */
export function formatAmounts(byCurrency) {
  const parts = Object.entries(byCurrency || {})
    .filter(([, amount]) => Math.abs(amount) >= 0.005)
    .map(([currency, amount]) => formatMoney(amount, currency));
  return parts.length ? parts.join(" + ") : formatMoney(0);
}

/* Pay periods are calendar months in Nairobi time, written "YYYY-MM". */

const NAIROBI_MONTH = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Africa/Nairobi",
  year: "numeric",
  month: "2-digit",
});

export function periodOf(date = new Date()) {
  return NAIROBI_MONTH.format(new Date(date));
}

/** "2026-10" -> "October 2026" */
export function periodLabel(period) {
  const [year, month] = period.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** The date a period is paid: `payDay` of the following month. */
export function payDateFor(period, payDay) {
  const [year, month] = period.split("-").map(Number);
  return new Date(Date.UTC(year, month, payDay));
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
  };
}

/** The contributor's application to a project, or undefined. */
export function applicationFor(applications, slug) {
  return applications.find((a) => a.project === slug);
}

/** One line explaining where an application stands. */
export function applicationMessage(application, profile) {
  switch (application?.status) {
    case "applied":
      return `Application received. We'll message you on WhatsApp at ${profile.phone} once we've reviewed it.`;
    case "approved":
      return "You're in. Work to the brief, upload to your folder, and log each batch under Submissions.";
    case "paused":
      return "Your place on this project is paused, so new batches can't be logged for now.";
    case "rejected":
      return "We couldn't offer you a place on this project. We'll let you know about others.";
    case "withdrawn":
      return "You withdrew from this project. You can apply again while it's open.";
    default:
      return "";
  }
}

/** An application that is live: not withdrawn and not turned down. */
export function isActiveApplication(application) {
  return Boolean(application) && !["withdrawn", "rejected"].includes(application.status);
}

/** Starting values for a project's questions, from a previous application if any. */
export function initialAnswers(project, previous = {}) {
  const answers = {};
  for (const q of project.questions) {
    answers[q.key] = previous[q.key] ?? (q.type === "multi" ? [] : "");
  }
  return answers;
}

/** First unanswered required question's message, or "" when all are answered. */
export function missingAnswer(project, answers) {
  for (const q of project.questions) {
    if (q.optional) continue;
    const value = answers[q.key];
    if (q.type === "multi" ? !value?.length : value === "" || value === null) {
      return q.type === "multi" ? `${q.label} Choose at least one.` : `Please answer: ${q.label}`;
    }
  }
  return "";
}

/** Answers shaped for storage: numbers as numbers, blanks as null. */
export function cleanAnswers(project, answers) {
  const out = {};
  for (const q of project.questions) {
    const value = answers[q.key];
    out[q.key] = q.type === "number" ? (value === "" ? null : Number(value)) : value;
  }
  return out;
}
