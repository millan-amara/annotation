import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import {
  useAuth,
  applicationFor,
  applicationMessage,
  hasConsented,
  formatHours,
  formatMoney,
} from "../../lib/portal";
import { useContributorData } from "../../lib/usePortalData";
import { PROJECTS } from "../../data/portal";
import PortalLayout from "../../components/portal/PortalLayout";
import { Notice, Panel, Stat, StatusPill } from "../../components/portal/Controls";
import { ButtonLink } from "../../components/ui/Button";

function ProjectCard({ project, application, consents, profile }) {
  const status = application?.status;
  const termsCurrent = hasConsented(consents, project.slug, project.consent);
  const brief = `/user/projects/${project.slug}`;

  return (
    <Panel
      title={project.title}
      action={status ? <StatusPill status={status} /> : <span className="text-xs text-ink-500">Not applied</span>}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-600">
        {project.kind} · {project.location}
      </p>
      <p className="mt-2 text-sm text-ink-700 leading-relaxed">{project.summary}</p>
      {status && <p className="mt-3 text-sm text-ink-900">{applicationMessage(application, profile)}</p>}

      {status === "approved" && !termsCurrent && (
        <div className="mt-4">
          <Notice>The project terms have been updated. Please review and agree to them before logging more work.</Notice>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        {(!status || status === "withdrawn") && project.open && (
          <ButtonLink to={brief}>{status ? "Apply again" : "View and apply"}</ButtonLink>
        )}
        {status === "approved" && (
          <>
            {termsCurrent ? (
              <ButtonLink to="/user/submissions">Log a submission</ButtonLink>
            ) : (
              <ButtonLink to={brief}>Review the terms</ButtonLink>
            )}
            {application.drive_folder_url && (
              <ButtonLink href={application.drive_folder_url} target="_blank" rel="noreferrer" variant="secondary">
                Your upload folder <ExternalLink size={14} aria-hidden="true" />
              </ButtonLink>
            )}
          </>
        )}
        {status && status !== "withdrawn" && (
          <ButtonLink to={brief} variant="secondary">Brief and specification</ButtonLink>
        )}
      </div>

      {status === "approved" && !application.drive_folder_url && (
        <p className="mt-4 text-sm text-ink-500">Your upload folder will appear here once we've set it up.</p>
      )}
    </Panel>
  );
}

export default function PortalDashboard() {
  const { profile, consents, payout, applications } = useAuth();
  const { totals, error } = useContributorData(profile.id);
  const firstName = profile.full_name.split(" ")[0];
  const approvedAny = applications.some((a) => a.status === "approved");
  const shown = PROJECTS.filter((p) => p.open || applicationFor(applications, p.slug));
  const hasActivity = approvedAny || totals.minutesSubmitted > 0;

  return (
    <PortalLayout title={`Hello, ${firstName}`}>
      <Notice tone="error">{error}</Notice>

      {approvedAny && !payout && (
        <Notice>
          Add your payment details so we can pay you for accepted work.{" "}
          <Link to="/user/payments" className="font-medium text-accent-700 hover:underline">
            Add payment details
          </Link>
        </Notice>
      )}

      {hasActivity && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Submitted" value={formatHours(totals.minutesSubmitted)} />
          <Stat label="Accepted" value={formatHours(totals.minutesAccepted)} hint="after review" />
          <Stat label="Earned" value={formatMoney(totals.earned)} />
          <Stat label="Balance due" value={formatMoney(totals.earned - totals.paid)} hint="not yet paid" />
        </div>
      )}

      <section className="space-y-4">
        <h2 className="font-display text-lg font-semibold text-ink-950">Projects</h2>
        {shown.length === 0 ? (
          <Panel>
            <p className="text-sm text-ink-700">
              No projects are open right now. We'll let you know on WhatsApp when one opens.
            </p>
          </Panel>
        ) : (
          shown.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              application={applicationFor(applications, project.slug)}
              consents={consents}
              profile={profile}
            />
          ))
        )}
      </section>

      {totals.lastFeedback && (
        <Panel title="Latest feedback" action={<Link to="/user/submissions" className="text-sm text-accent-700 hover:underline">All submissions</Link>}>
          <p className="text-sm text-ink-700 leading-relaxed">{totals.lastFeedback}</p>
        </Panel>
      )}
    </PortalLayout>
  );
}
