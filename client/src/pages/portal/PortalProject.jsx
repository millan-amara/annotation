import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import {
  useAuth,
  useConsentAnswers,
  consentRows,
  hasConsented,
  latestConsents,
  formatDate,
} from "../../lib/portal";
import { findProject } from "../../data/portal";
import PortalLayout from "../../components/portal/PortalLayout";
import ConsentForm from "../../components/portal/ConsentForm";
import { Notice, Panel } from "../../components/portal/Controls";
import { Button } from "../../components/ui/Button";

export default function PortalProject() {
  const { slug } = useParams();
  const project = findProject(slug);
  if (!project) return <Navigate to="/user/dashboard" replace />;
  return <ProjectPage project={project} />;
}

function ProjectPage({ project }) {
  const { user, consents, refresh } = useAuth();
  const consent = useConsentAnswers(project.consent);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const joined = hasConsented(consents, project.slug, project.consent);
  const joinedAt = latestConsents(consents, project.slug).participate?.created_at;

  const record = async (answers) => {
    setBusy(true);
    setError("");
    const { error: insertError } = await supabase
      .from("consents")
      .insert(consentRows(user.id, project.slug, project.consent, answers));
    if (insertError) setError(insertError.message);
    await refresh();
    setBusy(false);
  };

  const handleJoin = (e) => {
    e.preventDefault();
    record(consent.answers);
  };

  const handleWithdraw = () => {
    if (window.confirm("Withdraw from this project? Footage not yet delivered will be left out of what we send.")) {
      record({});
    }
  };

  return (
    <PortalLayout title={project.title}>
      <Panel title="The brief">
        <p className="text-sm text-ink-700 leading-relaxed">{project.summary}</p>
        <p className="mt-3 text-sm text-ink-700">
          <span className="font-medium text-ink-900">Categories: </span>
          {project.categories.join(", ")}
        </p>
        <p className="mt-3 text-sm text-ink-700">
          <span className="font-medium text-ink-900">Payment: </span>
          {project.payment}
        </p>
      </Panel>

      <Panel title="Specification: every clip is checked against this">
        <dl className="divide-y divide-ink-100">
          {project.spec.map(([term, detail]) => (
            <div key={term} className="py-2.5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-ink-900">{term}</dt>
              <dd className="mt-0.5 text-sm text-ink-700 sm:col-span-2 sm:mt-0">{detail}</dd>
            </div>
          ))}
        </dl>
      </Panel>

      {joined ? (
        <Panel title="You've joined this project">
          <p className="text-sm text-ink-700">
            You agreed to the project terms (version {project.consent.version})
            {joinedAt && ` on ${formatDate(joinedAt)}`}.
          </p>
          <Notice tone="error">{error}</Notice>
          <Button variant="secondary" onClick={handleWithdraw} loading={busy} className="mt-4">
            Withdraw from project
          </Button>
        </Panel>
      ) : (
        <form onSubmit={handleJoin}>
          <Panel title="Project terms">
            <ConsentForm
              definition={project.consent}
              answers={consent.answers}
              onChange={consent.set}
            />
            <div className="mt-5 space-y-4">
              <Notice tone="error">{error}</Notice>
              <Button type="submit" loading={busy} disabled={!consent.canSubmit} className="w-full sm:w-auto">
                Join project
              </Button>
            </div>
          </Panel>
        </form>
      )}
    </PortalLayout>
  );
}
