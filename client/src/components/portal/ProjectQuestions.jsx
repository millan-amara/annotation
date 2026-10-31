import { Field, Input } from "./Controls";

/**
 * Renders a project's `questions` from data/portal.js. Supported types:
 * "multi" (choose any of `options`) and "number".
 */
export default function ProjectQuestions({ questions, answers, onChange }) {
  const set = (key, value) => onChange({ ...answers, [key]: value });

  return (
    <div className="space-y-5">
      {questions.map((q) =>
        q.type === "multi" ? (
          <fieldset key={q.key} className="space-y-2">
            <legend className="text-sm font-medium text-ink-800">
              {q.label}
              {q.optional && <span className="font-normal text-ink-500"> (optional)</span>}
            </legend>
            {q.hint && <p className="text-xs text-ink-500">{q.hint}</p>}
            <div className="flex flex-wrap gap-2 pt-1">
              {q.options.map((option) => {
                const chosen = answers[q.key] || [];
                const on = chosen.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={on}
                    onClick={() =>
                      set(q.key, on ? chosen.filter((c) => c !== option) : [...chosen, option])
                    }
                    className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                      on
                        ? "border-accent-600 bg-accent-50 text-accent-700"
                        : "border-ink-300 bg-white text-ink-700 hover:bg-ink-50"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ) : (
          <Field key={q.key} label={q.label} hint={q.hint} optional={q.optional}>
            <Input
              type="number"
              min="0"
              step="0.5"
              inputMode="decimal"
              required={!q.optional}
              value={answers[q.key] ?? ""}
              onChange={(e) => set(q.key, e.target.value)}
            />
          </Field>
        )
      )}
    </div>
  );
}
