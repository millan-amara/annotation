import emailjs from "@emailjs/browser";

// EmailJS credentials. The public key is safe to ship in the bundle, but these
// are read from env first so they can be rotated without a code change.
export const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_pm4kpg1";
export const EMAILJS_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_qdgkji2";
export const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "FfC2jgC2scsnjnV9p";

export const CONTACT_EMAIL = "contact@spherepulseapp.com";

/**
 * Submit a contact <form> element through EmailJS.
 * Throws on failure so callers can surface an error state to the visitor.
 */
export async function sendContactForm(formElement) {
  if (!formElement) {
    throw new Error("sendContactForm called without a form element");
  }

  return emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formElement, {
    publicKey: EMAILJS_PUBLIC_KEY,
  });
}

/**
 * Fallback used when EmailJS fails: a prefilled mailto so the enquiry still
 * reaches us instead of being silently dropped.
 */
export function buildMailtoFallback({ name = "", company = "", message = "" }) {
  const subject = encodeURIComponent(
    company ? `Project enquiry - ${company}` : "Project enquiry"
  );
  const body = encodeURIComponent(
    [name && `Name: ${name}`, company && `Company: ${company}`, "", message]
      .filter((line) => line !== false && line !== undefined)
      .join("\n")
  );
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}
