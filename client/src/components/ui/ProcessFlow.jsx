import React from 'react';

/**
 * Horizontal process diagram: numbered nodes on a connecting rule, with the
 * stage described beneath each.
 *
 * Built in HTML rather than SVG on purpose. The text wraps, scales with the
 * type scale, stays selectable and reaches a screen reader as ordinary
 * markup: none of which is true of text baked into an SVG. The "graphic"
 * part is the rule and the nodes, which CSS draws perfectly well.
 *
 * Collapses to a vertical sequence below `md`, where five columns of prose
 * would be unreadable.
 */
export function ProcessFlow({ steps }) {
  return (
    <ol className="relative">
      {/* Desktop: the connecting rule, behind the nodes. */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute left-5 right-[calc(20%-1.25rem)] top-5 h-px bg-ink-200"
      />

      <div className="grid gap-10 md:grid-cols-5 md:gap-6">
        {steps.map((step, idx) => (
          <li key={step.title} className="relative flex md:block gap-5">
            {/* Mobile: vertical rule through the nodes. */}
            {idx < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="md:hidden absolute left-5 top-11 bottom-[-2.5rem] w-px bg-ink-200"
              />
            )}

            <div className="relative shrink-0">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-300 bg-white font-display text-sm font-semibold text-accent-600 tabular-nums">
                {String(idx + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="md:mt-5">
              <h3 className="text-lg font-semibold text-ink-950 mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-ink-600 leading-relaxed">{step.description}</p>
            </div>
          </li>
        ))}
      </div>
    </ol>
  );
}

/**
 * The QA sequence, drawn as a gate with a rework path returning to the start.
 *
 * The loop is the whole point: it shows that work that misses goes back into
 * the process before delivery, which is the claim the page makes in words a
 * few lines above.
 */
export function QualityGate({ steps, outcome }) {
  return (
    <div>
      <ol className="grid gap-5 md:grid-cols-4">
        {steps.map((step, idx) => (
          <li
            key={step.title}
            className="relative rounded-md border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-display text-sm font-semibold text-accent-300 tabular-nums">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <h3 className="text-base font-semibold text-white leading-snug">
                {step.title}
              </h3>
            </div>
            <p className="text-sm text-ink-400 leading-relaxed">{step.description}</p>

            {/* Connector into the next checkpoint. */}
            {idx < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="hidden md:block absolute top-1/2 -right-5 w-5 h-px bg-white/20"
              />
            )}
          </li>
        ))}
      </ol>

      {/* The rework path: a single bracket returning output to the start. */}
      <div
        aria-hidden="true"
        className="mt-5 h-7 border-l border-r border-b border-white/20 rounded-b-md"
      />
      <p className="mt-4 text-sm text-ink-400">
        <span className="text-accent-300 font-medium">Rework path:</span> {outcome}
      </p>
    </div>
  );
}
