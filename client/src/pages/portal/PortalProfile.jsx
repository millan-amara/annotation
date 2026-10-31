import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth, formatDate, profileFormValues, profileUpdate } from "../../lib/portal";
import { COMPANY } from "../../data/company";
import { findProject } from "../../data/portal";
import PortalLayout from "../../components/portal/PortalLayout";
import ProfileFields from "../../components/portal/ProfileFields";
import { Notice, Panel } from "../../components/portal/Controls";
import { Button } from "../../components/ui/Button";

/** Sign-in email, join date, and a way to change the password while signed in. */
function AccountCard({ email, memberSince }) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState({ tone: "success", text: "" });

  const sendReset = async () => {
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/user/reset-password`,
    });
    setBusy(false);
    setStatus(
      error
        ? { tone: "error", text: error.message }
        : { tone: "success", text: `We've sent a link to ${email}.` }
    );
  };

  return (
    <Panel title="Account">
      <dl className="space-y-3 text-sm">
        <div>
          <dt className="text-xs text-ink-500">Email</dt>
          <dd className="break-all text-ink-900">{email}</dd>
        </div>
        <div>
          <dt className="text-xs text-ink-500">Member since</dt>
          <dd className="text-ink-900">{formatDate(memberSince)}</dd>
        </div>
      </dl>
      <div className="mt-4 space-y-3">
        <Button variant="secondary" onClick={sendReset} loading={busy} className="w-full">
          Change password
        </Button>
        <Notice tone={status.tone}>{status.text}</Notice>
      </div>
    </Panel>
  );
}

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

  const aside = (
    <>
      <AccountCard email={user.email} memberSince={profile.created_at} />
      <Panel title="Your data">
        <p className="text-sm text-ink-700 leading-relaxed">
          To get a copy of your data, correct it, or delete your account, email{" "}
          <a href={`mailto:${COMPANY.email}`} className="text-accent-700 hover:underline">{COMPANY.email}</a>.
        </p>
      </Panel>
    </>
  );

  return (
    <PortalLayout title="Profile" aside={aside}>
      <form onSubmit={handleSubmit}>
        <Panel title="Your details">
          <div className="space-y-4">
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
        </p>
        <ul className="divide-y divide-ink-100">
          {history.map((row) => (
            <li key={row.id} className="py-3 first:pt-0 last:pb-0">
              <p className="text-xs text-ink-500">
                {formatDate(row.created_at)} ·{" "}
                {row.form === "roster" ? "Account" : findProject(row.form)?.title || row.form} v{row.form_version} ·{" "}
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
