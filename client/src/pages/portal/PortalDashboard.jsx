import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { useAuth, hasConsented, formatHours, formatMoney } from "../../lib/portal";
import { useContributorData } from "../../lib/usePortalData";
import { PROJECTS } from "../../data/portal";
import { COMPANY } from "../../data/company";
import PortalLayout from "../../components/portal/PortalLayout";
import { Notice, Panel, Stat, StatusPill } from "../../components/portal/Controls";
import { ButtonLink } from "../../components/ui/Button";

const STATUS_MESSAGES = {
  applied: (profile) =>
    `Thanks for registering. We're reviewing your profile and will message you on WhatsApp at ${profile.phone} when you're approved to start. You can read the project brief below in the meantime.`,
  approved: () =>
    "You're approved. Join a project below, film to the brief, upload to your folder and log each batch under Submissions.",
  paused: () =>
    `Your account is paused, so new submissions can't be logged right now. Questions: ${COMPANY.email}.`,
  rejected: () =>
    `We can't offer you work on current projects. We'll keep your profile on the roster for future ones. Questions: ${COMPANY.email}.`,
};

export default function PortalDashboard() {
  const { profile, consents } = useAuth();
  const { totals, error } = useContributorData(profile.id);
  const firstName = profile.full_name.split(" ")[0];

  return (
    <PortalLayout title={`Hello, ${firstName}`}>
      <Panel title="Your status" action={<StatusPill status={profile.status} />}>
        <p className="text-sm text-ink-700 leading-relaxed">
          {STATUS_MESSAGES[profile.status](profile)}
        </p>
      </Panel>

      <Notice tone="error">{error}</Notice>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Submitted" value={formatHours(totals.minutesSubmitted)} hint="of footage" />
        <Stat label="Accepted" value={formatHours(totals.minutesAccepted)} hint="after review" />
        <Stat label="Earned" value={formatMoney(totals.earned)} />
        <Stat label="Balance due" value={formatMoney(totals.earned - totals.paid)} hint="not yet paid" />
      </div>

      {PROJECTS.filter((p) => p.open).map((project) => {
        const joined = hasConsented(consents, project.slug, project.consent);
        return (
          <Panel
            key={project.slug}
            title={project.title}
            action={joined && <span className="text-xs font-medium text-signal-success">Joined</span>}
          >
            <p className="text-sm text-ink-700 leading-relaxed">{project.summary}</p>
            <p className="mt-3 text-sm text-ink-600">
              <span className="font-medium text-ink-800">Categories: </span>
              {project.categories.join(", ")}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {!joined && (
                <ButtonLink to={`/user/projects/${project.slug}`}>Read the brief and join</ButtonLink>
              )}
              {joined && (
                <>
                  {profile.status === "approved" && (
                    <ButtonLink to="/user/submissions">Log a submission</ButtonLink>
                  )}
                  {profile.drive_folder_url && (
                    <ButtonLink href={profile.drive_folder_url} target="_blank" rel="noreferrer" variant="secondary">
                      Your upload folder <ExternalLink size={14} aria-hidden="true" />
                    </ButtonLink>
                  )}
                  <ButtonLink to={`/user/projects/${project.slug}`} variant="secondary">
                    Brief and specification
                  </ButtonLink>
                </>
              )}
            </div>

            {joined && profile.status === "approved" && !profile.drive_folder_url && (
              <p className="mt-4 text-sm text-ink-500">
                Your upload folder will appear here once we've set it up.
              </p>
            )}
          </Panel>
        );
      })}

      {totals.lastFeedback && (
        <Panel title="Latest feedback" action={<Link to="/user/submissions" className="text-sm text-accent-700 hover:underline">All submissions</Link>}>
          <p className="text-sm text-ink-700 leading-relaxed">{totals.lastFeedback}</p>
        </Panel>
      )}
    </PortalLayout>
  );
}
