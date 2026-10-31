/**
 * Form and display primitives for the contributor portal. Built for phones
 * first: most contributors will sign up, log submissions and check payments
 * from a phone, so inputs are full-width with 16px text (which also stops iOS
 * zooming on focus).
 */

const inputClass =
  "w-full rounded-md border border-ink-300 bg-white px-3 py-2.5 text-base text-ink-900 placeholder:text-ink-400 focus:border-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-200 disabled:bg-ink-50";

export function Field({ label, hint, children }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-ink-800">{label}</span>
      {children}
      {hint && <span className="block text-xs text-ink-500">{hint}</span>}
    </label>
  );
}

export function Input(props) {
  return <input className={inputClass} {...props} />;
}

export function Select({ children, ...props }) {
  return (
    <select className={inputClass} {...props}>
      {children}
    </select>
  );
}

export function Textarea(props) {
  return <textarea rows={3} className={inputClass} {...props} />;
}

export function Checkbox({ checked, onChange, children, required }) {
  return (
    <label className="flex gap-3 items-start rounded-md border border-ink-200 bg-white p-3 cursor-pointer hover:border-ink-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-accent-600"
      />
      <span className="text-sm text-ink-800 leading-relaxed">
        {required ? (
          <strong className="font-semibold">(required) </strong>
        ) : (
          <em className="text-ink-500">(optional) </em>
        )}
        {children}
      </span>
    </label>
  );
}

const noticeTones = {
  error: "bg-signal-error-soft text-signal-error border-signal-error/20",
  success: "bg-signal-success-soft text-signal-success border-signal-success/20",
  info: "bg-ink-50 text-ink-700 border-ink-200",
};

export function Notice({ tone = "info", children }) {
  if (!children) return null;
  return (
    <div className={`rounded-md border px-4 py-3 text-sm ${noticeTones[tone]}`}>
      {children}
    </div>
  );
}

export function Panel({ title, action, children, className = "" }) {
  return (
    <section className={`rounded-lg border border-ink-200 bg-white ${className}`}>
      {(title || action) && (
        <header className="flex items-center justify-between gap-3 border-b border-ink-100 px-4 py-3 sm:px-5">
          <h2 className="font-display text-base font-semibold text-ink-950">{title}</h2>
          {action}
        </header>
      )}
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}

export function Stat({ label, value, hint }) {
  return (
    <div className="rounded-lg border border-ink-200 bg-white p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-ink-500">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-ink-950 tabular-nums">
        {value}
      </p>
      {hint && <p className="mt-0.5 text-xs text-ink-500">{hint}</p>}
    </div>
  );
}

const pillTones = {
  applied: "bg-ink-100 text-ink-700",
  pending: "bg-ink-100 text-ink-700",
  approved: "bg-signal-success-soft text-signal-success",
  accepted: "bg-signal-success-soft text-signal-success",
  partial: "bg-accent-50 text-accent-700",
  paused: "bg-ink-100 text-ink-600",
  rejected: "bg-signal-error-soft text-signal-error",
};

export function StatusPill({ status }) {
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-xs font-medium capitalize ${
        pillTones[status] || pillTones.pending
      }`}
    >
      {status}
    </span>
  );
}

export function Spinner() {
  return (
    <div className="flex justify-center py-16" role="status" aria-label="Loading">
      <span className="h-6 w-6 rounded-full border-2 border-ink-300 border-t-transparent animate-spin" />
    </div>
  );
}
