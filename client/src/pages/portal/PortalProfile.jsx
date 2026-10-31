import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth, formatDate, profileFormValues, profileUpdate } from "../../lib/portal";
import { COMPANY } from "../../data/company";
import PortalLayout from "../../components/portal/PortalLayout";
import ProfileFields from "../../components/portal/ProfileFields";
import { Field, Input, Notice, Panel } from "../../components/portal/Controls";
import { Button } from "../../components/ui/Button";

export default function PortalProfile() {
  const { user, profile, consents, refresh } = useAuth();
  const [values, setValues] = useState(() => profileFormValues(profile));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    setSaved(false);
    const { error: updateError } = await supabase
      .from("profiles")
      .update(profileUpdate(values))
      .eq("id", user.id);
    setBusy(false);
    if (updateError) setError(updateError.message);
    else {
      setSaved(true);
      refresh();
    }
  };

  const history = [...consents].reverse();

  return (
    <PortalLayout title="Profile">
      <form onSubmit={handleSubmit}>
        <Panel title="Your details">
          <div className="space-y-4">
            <Field label="Email" hint="Used to sign in. Can't be changed here.">
              <Input value={user.email} disabled />
            </Field>
            <ProfileFields values={values} onChange={setValues} />
            <Notice tone="error">{error}</Notice>
            <Notice tone="success">{saved && "Saved."}</Notice>
            <Button type="submit" loading={busy}>Save changes</Button>
          </div>
        </Panel>
      </form>

      <Panel title="Your consent record">
        <p className="mb-4 text-sm text-ink-600 leading-relaxed">
          Everything you have agreed to, with the wording you saw at the time.
          To get a copy of your data, correct it, or delete your account, email{" "}
          <a href={`mailto:${COMPANY.email}`} className="text-accent-700 hover:underline">{COMPANY.email}</a>.
        </p>
        <ul className="divide-y divide-ink-100">
          {history.map((row) => (
            <li key={row.id} className="py-3 first:pt-0 last:pb-0">
              <p className="text-xs text-ink-500">
                {formatDate(row.created_at)} · {row.form} v{row.form_version} ·{" "}
                <span className={row.accepted ? "text-signal-success" : "text-ink-600"}>
                  {row.accepted ? "Agreed" : "Not agreed / withdrawn"}
                </span>
              </p>
              <p className="mt-1 text-sm text-ink-800">{row.wording}</p>
            </li>
          ))}
        </ul>
      </Panel>
    </PortalLayout>
  );
}
