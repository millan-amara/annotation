import { useState } from "react";
import { Smartphone, Landmark } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { Checkbox, Field, Input, Notice, RequiredNote } from "./Controls";
import { Button } from "../ui/Button";

const METHODS = [
  { id: "mpesa", label: "M-Pesa", icon: Smartphone, hint: "Fastest. Paid straight to your phone." },
  { id: "bank", label: "Bank transfer", icon: Landmark, hint: "To a bank account in your name." },
];

const clean = (value) => value.trim() || null;

/**
 * Choose M-Pesa or bank and enter the details for it. Saving replaces the
 * contributor's single payout_details row, and clears the fields of the
 * method they didn't choose so stale details are never paid to.
 */
export default function PayoutForm({ userId, phone, payout, onSaved, onCancel }) {
  const [method, setMethod] = useState(payout?.method || "mpesa");
  const [sameAsWhatsApp, setSameAsWhatsApp] = useState(
    !payout?.mpesa_number || payout.mpesa_number === phone
  );
  const [values, setValues] = useState({
    mpesa_number: payout?.mpesa_number || "",
    mpesa_name: payout?.mpesa_name || "",
    bank_name: payout?.bank_name || "",
    bank_branch: payout?.bank_branch || "",
    account_name: payout?.account_name || "",
    account_number: payout?.account_number || "",
    swift_code: payout?.swift_code || "",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const set = (key) => (e) => setValues({ ...values, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const mpesa = method === "mpesa";
    const { error: saveError } = await supabase.from("payout_details").upsert({
      user_id: userId,
      method,
      mpesa_number: mpesa ? (sameAsWhatsApp ? phone : clean(values.mpesa_number)) : null,
      mpesa_name: mpesa ? clean(values.mpesa_name) : null,
      bank_name: mpesa ? null : clean(values.bank_name),
      bank_branch: mpesa ? null : clean(values.bank_branch),
      account_name: mpesa ? null : clean(values.account_name),
      account_number: mpesa ? null : clean(values.account_number),
      swift_code: mpesa ? null : clean(values.swift_code)?.toUpperCase() ?? null,
    });
    setBusy(false);
    if (saveError) setError(saveError.message);
    else onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink-800">How would you like to be paid?</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {METHODS.map((m) => (
            <label
              key={m.id}
              className={`flex cursor-pointer gap-3 rounded-md border p-3 ${
                method === m.id ? "border-accent-600 bg-accent-50" : "border-ink-200 bg-white hover:border-ink-300"
              }`}
            >
              <input
                type="radio"
                name="method"
                value={m.id}
                checked={method === m.id}
                onChange={() => setMethod(m.id)}
                className="sr-only"
              />
              <m.icon size={20} className={method === m.id ? "text-accent-700" : "text-ink-500"} aria-hidden="true" />
              <span>
                <span className="block text-sm font-medium text-ink-900">{m.label}</span>
                <span className="block text-xs text-ink-500">{m.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <RequiredNote />

      {method === "mpesa" ? (
        <div className="space-y-4">
          <Checkbox checked={sameAsWhatsApp} onChange={setSameAsWhatsApp} plain>
            My M-Pesa number is my WhatsApp number, {phone}
          </Checkbox>
          {!sameAsWhatsApp && (
            <Field label="M-Pesa number" hint="Include your country code.">
              <Input required type="tel" value={values.mpesa_number} onChange={set("mpesa_number")} />
            </Field>
          )}
          <Field
            label="Name registered on M-Pesa"
            hint="Exactly as M-Pesa shows it. We check it before sending, so money never goes to the wrong person."
          >
            <Input required value={values.mpesa_name} onChange={set("mpesa_name")} />
          </Field>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Bank name">
              <Input required value={values.bank_name} onChange={set("bank_name")} placeholder="e.g. Equity Bank" />
            </Field>
            <Field label="Branch" optional>
              <Input value={values.bank_branch} onChange={set("bank_branch")} />
            </Field>
          </div>
          <Field label="Account name" hint="The name the account is held in. It must be yours.">
            <Input required value={values.account_name} onChange={set("account_name")} />
          </Field>
          <Field label="Account number">
            <Input required inputMode="numeric" value={values.account_number} onChange={set("account_number")} />
          </Field>
          <Field label="SWIFT / BIC code" hint="Needed for international transfers: we pay from Kenya, so add it if your bank is elsewhere." optional>
            <Input value={values.swift_code} onChange={set("swift_code")} />
          </Field>
        </div>
      )}

      <Notice tone="error">{error}</Notice>
      <div className="flex flex-wrap gap-3">
        <Button type="submit" loading={busy}>Save payment details</Button>
        {onCancel && (
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        )}
      </div>
    </form>
  );
}
