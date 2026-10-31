import { VIDEO_CATEGORIES } from "../../data/portal";
import { COUNTRIES, PINNED_COUNTRIES } from "../../data/countries";
import { Field, Input, RequiredNote, Select } from "./Controls";

export default function ProfileFields({ values, onChange }) {
  const set = (key) => (e) => onChange({ ...values, [key]: e.target.value });

  const toggleCategory = (category) => {
    const has = values.categories.includes(category);
    onChange({
      ...values,
      categories: has
        ? values.categories.filter((c) => c !== category)
        : [...values.categories, category],
    });
  };

  return (
    <div className="space-y-4">
      <RequiredNote />
      <Field label="Full name">
        <Input required value={values.full_name} onChange={set("full_name")} autoComplete="name" />
      </Field>

      <Field label="WhatsApp number" hint="We use this to brief you and send feedback.">
        <Input
          required
          type="tel"
          value={values.phone}
          onChange={set("phone")}
          placeholder="+254 7XX XXX XXX"
          autoComplete="tel"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Country">
          <Select required value={values.country} onChange={set("country")} autoComplete="country-name">
            <option value="">Choose your country</option>
            {PINNED_COUNTRIES.map((c) => (
              <option key={`pinned-${c}`} value={c}>{c}</option>
            ))}
            <option disabled>──────────</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label="Town or city">
          <Input required value={values.city} onChange={set("city")} />
        </Field>
      </div>

      <Field
        label="Hours of footage you could film per week"
        hint="A realistic estimate. It helps us plan; it is not a commitment."
        optional
      >
        <Input
          type="number"
          min="0"
          step="0.5"
          inputMode="decimal"
          value={values.weekly_hours}
          onChange={set("weekly_hours")}
        />
      </Field>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-ink-800">
          Categories you can film <span className="font-normal text-ink-500">(choose at least one)</span>
        </legend>
        <div className="flex flex-wrap gap-2 pt-1">
          {VIDEO_CATEGORIES.map((category) => {
            const on = values.categories.includes(category);
            return (
              <button
                key={category}
                type="button"
                onClick={() => toggleCategory(category)}
                aria-pressed={on}
                className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                  on
                    ? "border-accent-600 bg-accent-50 text-accent-700"
                    : "border-ink-300 bg-white text-ink-700 hover:bg-ink-50"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
