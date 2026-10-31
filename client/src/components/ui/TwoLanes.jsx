import React from 'react';

/**
 * The positioning, drawn: two kinds of work feeding one managed delivery.
 *
 * This is the claim the homepage makes in prose a few lines above, and it is
 * the thing a vendor needs to grasp in about three seconds: they can hand us
 * either lane without onboarding a second supplier.
 *
 * HTML and CSS rather than SVG, for the same reason as the process flow: the
 * labels wrap, scale and stay readable to a screen reader.
 */
function Lane({ eyebrow, title, items }) {
  return (
    <div className="rounded-md border border-ink-200 bg-white p-6">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-600 mb-2">
        {eyebrow}
      </div>
      <h3 className="text-lg font-semibold text-ink-950 mb-4 leading-snug">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-600"
            />
            <span className="text-sm text-ink-600 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TwoLanes({ lanes, outcome }) {
  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2">
        {lanes.map((lane) => (
          <Lane key={lane.title} {...lane} />
        ))}
      </div>

      {/* Both lanes converge on one supplier. */}
      <div aria-hidden="true" className="relative h-16">
        <div className="absolute left-[25%] right-[25%] top-0 h-8 border-l border-r border-b border-ink-300 rounded-b-md" />
        <div className="absolute left-1/2 top-8 h-8 w-px -translate-x-1/2 bg-ink-300" />
      </div>

      <div className="rounded-md border border-accent-600 bg-accent-50 p-6 text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-600 mb-2">
          {outcome.eyebrow}
        </div>
        <h3 className="text-lg font-semibold text-ink-950 mb-2">{outcome.title}</h3>
        <p className="text-sm text-ink-600 leading-relaxed max-w-xl mx-auto">
          {outcome.description}
        </p>
      </div>
    </div>
  );
}

export default TwoLanes;
