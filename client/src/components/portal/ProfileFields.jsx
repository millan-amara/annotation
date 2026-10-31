import { COUNTRIES, PINNED_COUNTRIES } from "../../data/countries";
import { Field, Input, RequiredNote, Select } from "./Controls";

export default function ProfileFields({ values, onChange }) {
  const set = (key) => (e) => onChange({ ...values, [key]: e.target.value });

  return (
    <div className="space-y-4">
      <RequiredNote />
      <Field label="Full name">
        <Input required value={values.full_name} onChange={set("full_name")} autoComplete="name" />
      </Field>

      <Field label="WhatsApp number" hint="Include your country code, e.g. +254. We use this to brief you and send feedback.">
        <Input
          required
          type="tel"
          value={values.phone}
          onChange={set("phone")}
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
    </div>
  );
}
