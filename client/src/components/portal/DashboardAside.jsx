import { Link } from "react-router-dom";
import { Check, Mail, Phone, ShieldCheck } from "lucide-react";
import { COMPANY } from "../../data/company";
import { Panel } from "./Controls";

/**
 * "Getting started" checklist. Each step ticks itself off from the
 * contributor's data and links to where it gets done; the panel goes away
 * once every step is complete.
 */
export function GettingStarted({ steps }) {
  const done = steps.filter((s) => s.done).length;
  if (done === steps.length) return null;

  return (
    <Panel title="Getting started" action={<span className="text-xs text-ink-500">{done} of {steps.length}</span>}>
      <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-ink-100" aria-hidden="true">
        <div className="h-full bg-accent-600" style={{ width: `${(done / steps.length) * 100}%` }} />
      </div>
      <ol className="space-y-3">
        {steps.map((step, i) => {
          const isNext = !step.done && steps.slice(0, i).every((s) => s.done);
          return (
            <li key={step.label} className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                  step.done
                    ? "bg-signal-success text-white"
                    : isNext
                      ? "border-2 border-accent-600 text-accent-700"
                      : "border border-ink-300 text-ink-400"
                }`}
              >
                {step.done ? <Check size={12} strokeWidth={3} aria-hidden="true" /> : i + 1}
              </span>
              <span className="text-sm leading-snug">
                {step.to && !step.done ? (
                  <Link to={step.to} className={isNext ? "font-medium text-accent-700 hover:underline" : "text-ink-700 hover:underline"}>
                    {step.label}
                  </Link>
                ) : (
                  <span className={step.done ? "text-ink-500 line-through decoration-ink-300" : "text-ink-700"}>
                    {step.label}
                  </span>
                )}
                {isNext && step.hint && <span className="mt-0.5 block text-xs text-ink-500">{step.hint}</span>}
              </span>
            </li>
          );
        })}
      </ol>
    </Panel>
  );
}

export function HelpCard() {
  return (
    <Panel title="Need help?">
      <div className="space-y-2.5 text-sm">
        <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-ink-700 hover:text-accent-700">
          <Mail size={16} className="text-ink-400" aria-hidden="true" />
          {COMPANY.email}
        </a>
        {COMPANY.phone && (
          <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-ink-700 hover:text-accent-700">
            <Phone size={16} className="text-ink-400" aria-hidden="true" />
            {COMPANY.phone}
          </a>
        )}
      </div>
      <div className="mt-4 flex gap-3 rounded-md bg-ink-50 p-3">
        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-signal-success" aria-hidden="true" />
        <p className="text-xs text-ink-600 leading-relaxed">
          We never charge a fee to join, apply or get paid. If anyone asks you to
          pay, it isn't us. Report it to {COMPANY.email}.
        </p>
      </div>
    </Panel>
  );
}
