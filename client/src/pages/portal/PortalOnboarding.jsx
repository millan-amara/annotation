import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import {
  useAuth,
  useConsentAnswers,
  consentRows,
  profileFormValues,
  profileUpdate,
} from "../../lib/portal";
import { ROSTER_CONSENT } from "../../data/portal";
import PortalLayout from "../../components/portal/PortalLayout";
import ProfileFields from "../../components/portal/ProfileFields";
import ConsentForm from "../../components/portal/ConsentForm";
import { Notice, Panel } from "../../components/portal/Controls";
import { Button } from "../../components/ui/Button";

export default function PortalOnboarding() {
  const { user, profile, refresh } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState(() => profileFormValues(profile));
  const consent = useConsentAnswers(ROSTER_CONSENT);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.categories.length === 0) {
      setError("Choose at least one category you can film.");
      return;
    }
    setBusy(true);
    setError("");

    const saved = await supabase
      .from("profiles")
      .update(profileUpdate(values))
      .eq("id", user.id);
    const recorded = saved.error
      ? saved
      : await supabase
          .from("consents")
          .insert(consentRows(user.id, "roster", ROSTER_CONSENT, consent.answers));

    if (recorded.error) {
      setError(recorded.error.message);
      setBusy(false);
      return;
    }
    await refresh();
    navigate("/user/dashboard", { replace: true });
  };

  return (
    <PortalLayout title="Complete your profile">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Panel title="Your details">
          <ProfileFields values={values} onChange={setValues} />
        </Panel>

        <Panel title="How we use your information">
          <ConsentForm
            definition={ROSTER_CONSENT}
            answers={consent.answers}
            onChange={consent.set}
          />
        </Panel>

        <Notice tone="error">{error}</Notice>

        <Button type="submit" size="lg" loading={busy} disabled={!consent.canSubmit} className="w-full sm:w-auto">
          Join the roster
        </Button>
      </form>
    </PortalLayout>
  );
}
