import { Checkbox } from "./Controls";

/**
 * Renders a consent definition from data/portal.js: the notice, then one
 * checkbox per item, none pre-ticked. Required items must be ticked before
 * `canSubmit` (from useConsentAnswers) is true; optional ones never block.
 */
export default function ConsentForm({ definition, answers, onChange, collapsible = false }) {
  const notice = (
    <div className="space-y-4">
      {definition.notice.map((section) => (
        <div key={section.heading}>
          <h3 className="text-sm font-semibold text-ink-950">{section.heading}</h3>
          <p className="mt-1 text-sm text-ink-700 leading-relaxed">{section.body}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-5">
      {collapsible ? (
        <details className="group rounded-md border border-ink-200 bg-ink-50 px-4 py-3">
          <summary className="cursor-pointer text-sm font-medium text-accent-700">
            {definition.noticeTitle}
          </summary>
          <div className="mt-4">{notice}</div>
        </details>
      ) : (
        notice
      )}

      <div className="space-y-2">
        <p className="text-sm font-semibold text-ink-950">Please confirm each separately</p>
        {definition.items.map((item) => (
          <Checkbox
            key={item.key}
            required={item.required}
            checked={Boolean(answers[item.key])}
            onChange={(value) => onChange(item.key, value)}
          >
            {item.text}
          </Checkbox>
        ))}
      </div>

      <p className="text-xs text-ink-500">Consent form version {definition.version}</p>
    </div>
  );
}
