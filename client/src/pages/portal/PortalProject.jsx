import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { supabase } from "../../lib/supabase";
import {
  useAuth,
  useConsentAnswers,
  applicationFor,
  applicationMessage,
  cleanAnswers,
  consentRows,
  hasConsented,
  initialAnswers,
  isActiveApplication,
  missingAnswer,
  formatDate,
} from "../../lib/portal";
import { findProject } from "../../data/portal";
import PortalLayout from "../../components/portal/PortalLayout";
import ConsentForm from "../../components/portal/ConsentForm";
import ProjectQuestions from "../../components/portal/ProjectQuestions";
import { Notice, Panel, StatusPill } from "../../components/portal/Controls";
import { Button, ButtonLink } from "../../components/ui/Button";

export default function PortalProject() {
  const { slug } = useParams();
  const project = findProject(slug);
  if (!project) return <Navigate to="/user/dashboard" replace />;
  return <ProjectPage project={project} />;
}

function Brief({ project }) {
  return (
    <>
      <Panel title="The brief">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-600">
          {project.kind} · {project.location}
        </p>
        <p className="mt-2 text-sm text-ink-700 leading-relaxed">{project.summary}</p>
        <p className="mt-3 text-sm text-ink-700">
          <span className="font-medium text-ink-900">Categories: </span>
          {project.categories.join(", ")}
        </p>
        <p className="mt-3 text-sm text-ink-700">
          <span className="font-medium text-ink-900">Payment: </span>
          {project.payment}
        </p>
      </Panel>

      <Panel title="Specification: all work is checked against this">
        <dl className="divide-y divide-ink-100">
          {project.spec.map(([term, detail]) => (
            <div key={term} className="py-2.5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-ink-900">{term}</dt>
              <dd className="mt-0.5 text-sm text-ink-700 sm:col-span-2 sm:mt-0">{detail}</dd>
            </div>
          ))}
        </dl>
      </Panel>
    </>
  );
}

/** Questions and terms in one form; applying records both. */
function ApplyForm({ project, previous, onApplied }) {
  const { user } = useAuth();
  const [answers, setAnswers] = useState(() => initialAnswers(project, previous?.answers));
  const consent = useConsentAnswers(project.consent);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missing = missingAnswer(project, answers);
    if (missing) {
      setError(missing);
      return;
    }
    setBusy(true);
    setError("");
    const stored = cleanAnswers(project, answers);
    const applied = previous
      ? await supabase
          .from("applications")
          .update({ status: "applied", answers: stored })
          .eq("id", previous.id)
      : await supabase.from("applications").insert({ project: project.slug, answers: stored });
    const recorded = applied.error
      ? applied
      : await supabase
          .from("consents")
          .insert(consentRows(user.id, project.slug, project.consent, consent.answers));
    setBusy(false);
    if (recorded.error) setError(recorded.error.message);
    else onApplied();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Panel title="About you and this project">
        <ProjectQuestions questions={project.questions} answers={answers} onChange={setAnswers} />
      </Panel>
      <Panel title="Project terms">
        <ConsentForm definition={project.consent} answers={consent.answers} onChange={consent.set} />
      </Panel>
      <Notice tone="error">{error}</Notice>
      <Button type="submit" size="lg" loading={busy} disabled={!consent.canSubmit} className="w-full sm:w-auto">
        Apply
      </Button>
    </form>
  );
}

/** Shown to an approved contributor when the project terms have a new version. */
function UpdatedTerms({ project, onAgreed }) {
  const { user } = useAuth();
  const consent = useConsentAnswers(project.consent);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    const { error: insertError } = await supabase
      .from("consents")
      .insert(consentRows(user.id, project.slug, project.consent, consent.answers));
    setBusy(false);
    if (insertError) setError(insertError.message);
    else onAgreed();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Panel title="The project terms have been updated">
        <ConsentForm definition={project.consent} answers={consent.answers} onChange={consent.set} />
        <div className="mt-5 space-y-4">
          <Notice tone="error">{error}</Notice>
          <Button type="submit" loading={busy} disabled={!consent.canSubmit}>Agree to the updated terms</Button>
        </div>
      </Panel>
    </form>
  );
}

function ApplicationPanel({ project, application, onChanged }) {
  const { user, profile } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const withdrawable = ["applied", "approved", "paused"].includes(application.status);

  const handleWithdraw = async () => {
    if (!window.confirm("Withdraw from this project? Work not yet delivered will be left out of what we send.")) return;
    setBusy(true);
    const withdrawn = await supabase
      .from("applications")
      .update({ status: "withdrawn" })
      .eq("id", application.id);
    // Record the withdrawal against every consent item as well.
    const recorded = withdrawn.error
      ? withdrawn
      : await supabase.from("consents").insert(consentRows(user.id, project.slug, project.consent, {}));
    setBusy(false);
    if (recorded.error) setError(recorded.error.message);
    else onChanged();
  };

  return (
    <Panel title="Your application" action={<StatusPill status={application.status} />}>
      <p className="text-sm text-ink-800 leading-relaxed">{applicationMessage(application, profile)}</p>
      <p className="mt-2 text-xs text-ink-500">Applied {formatDate(application.created_at)}</p>

      <dl className="mt-4 space-y-2 text-sm">
        {project.questions.map((q) => {
          const value = application.answers?.[q.key];
          const shown = Array.isArray(value) ? value.join(", ") : value;
          return (
            <div key={q.key}>
              <dt className="text-ink-500">{q.label}</dt>
              <dd className="text-ink-900">{shown || shown === 0 ? shown : "Not answered"}</dd>
            </div>
          );
        })}
      </dl>

      {application.status === "approved" && application.drive_folder_url && (
        <div className="mt-5">
          <ButtonLink href={application.drive_folder_url} target="_blank" rel="noreferrer" variant="secondary">
            Your upload folder <ExternalLink size={14} aria-hidden="true" />
          </ButtonLink>
        </div>
      )}

      <div className="mt-4"><Notice tone="error">{error}</Notice></div>
      {withdrawable && (
        <Button variant="secondary" onClick={handleWithdraw} loading={busy} className="mt-4">
          Withdraw from project
        </Button>
      )}
    </Panel>
  );
}

function ProjectPage({ project }) {
  const { applications, consents, refresh } = useAuth();
  const application = applicationFor(applications, project.slug);
  const termsCurrent = hasConsented(consents, project.slug, project.consent);
  const canApply = project.open && (!application || application.status === "withdrawn");

  return (
    <PortalLayout title={project.title}>
      <Brief project={project} />

      {application && application.status !== "withdrawn" && (
        <ApplicationPanel project={project} application={application} onChanged={refresh} />
      )}

      {isActiveApplication(application) && application.status === "approved" && !termsCurrent && (
        <UpdatedTerms project={project} onAgreed={refresh} />
      )}

      {canApply && <ApplyForm project={project} previous={application} onApplied={refresh} />}

      {!project.open && !application && (
        <Notice>This project isn't taking applications at the moment.</Notice>
      )}
    </PortalLayout>
  );
}
