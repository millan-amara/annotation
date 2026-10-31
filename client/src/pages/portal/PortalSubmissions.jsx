import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Trash2 } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useAuth, applicationFor, hasConsented, formatDate, formatHours, formatMoney } from "../../lib/portal";
import { useContributorData } from "../../lib/usePortalData";
import { PROJECTS, findProject } from "../../data/portal";
import PortalLayout from "../../components/portal/PortalLayout";
import { Field, Input, Notice, Panel, Select, Spinner, StatusPill, Textarea } from "../../components/portal/Controls";
import { Button } from "../../components/ui/Button";

const EMPTY = { project: "", category: "", clip_count: "", minutes_submitted: "", files_url: "", notes: "" };

function SubmissionForm({ projects, onSaved }) {
  const [values, setValues] = useState({ ...EMPTY, project: projects[0].slug });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const project = findProject(values.project);
  const set = (key) => (e) => setValues({ ...values, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error: insertError } = await supabase.from("submissions").insert({
      project: values.project,
      category: values.category,
      clip_count: Number(values.clip_count),
      minutes_submitted: Number(values.minutes_submitted),
      files_url: values.files_url.trim(),
      notes: values.notes.trim() || null,
    });
    setBusy(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setValues({ ...EMPTY, project: values.project });
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {projects.length > 1 && (
        <Field label="Project">
          <Select value={values.project} onChange={(e) => setValues({ ...EMPTY, project: e.target.value })}>
            {projects.map((p) => (
              <option key={p.slug} value={p.slug}>{p.title}</option>
            ))}
          </Select>
        </Field>
      )}

      <Field label="Category">
        <Select required value={values.category} onChange={set("category")}>
          <option value="">Choose a category</option>
          {project.categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Number of clips">
          <Input type="number" required min="1" step="1" inputMode="numeric" value={values.clip_count} onChange={set("clip_count")} />
        </Field>
        <Field label="Total minutes" hint="All clips added together.">
          <Input type="number" required min="1" step="0.5" inputMode="decimal" value={values.minutes_submitted} onChange={set("minutes_submitted")} />
        </Field>
      </div>

      <Field label="Link to the files" hint="The Drive folder or files for this batch, shared with us.">
        <Input type="url" required placeholder="https://drive.google.com/..." value={values.files_url} onChange={set("files_url")} />
      </Field>

      <Field label="Description" hint="What you filmed and where, e.g. 'Matatus at Kencom stage, morning traffic'.">
        <Textarea value={values.notes} onChange={set("notes")} />
      </Field>

      <Notice tone="error">{error}</Notice>
      <Button type="submit" loading={busy} className="w-full sm:w-auto">
        Log submission
      </Button>
    </form>
  );
}

function SubmissionItem({ submission, onDelete }) {
  const s = submission;
  const reviewed = s.status !== "pending";
  return (
    <li className="py-4 first:pt-0 last:pb-0">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-ink-900">{s.category}</p>
          <p className="text-xs text-ink-500">
            {formatDate(s.created_at)} · {s.clip_count} clips · {formatHours(s.minutes_submitted)} submitted
          </p>
        </div>
        <StatusPill status={s.status} />
      </div>

      {s.notes && <p className="mt-2 text-sm text-ink-700">{s.notes}</p>}

      {reviewed && (
        <p className="mt-2 text-sm text-ink-800">
          Accepted {formatHours(s.minutes_accepted)}
          {s.amount !== null && ` · ${formatMoney(s.amount, s.currency)}`}
        </p>
      )}
      {s.feedback && (
        <p className="mt-2 rounded-md bg-ink-50 px-3 py-2 text-sm text-ink-700">{s.feedback}</p>
      )}

      <div className="mt-2 flex gap-4 text-sm">
        <a href={s.files_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-accent-700 hover:underline">
          Files <ExternalLink size={13} aria-hidden="true" />
        </a>
        {!reviewed && (
          <button onClick={() => onDelete(s)} className="inline-flex items-center gap-1 text-ink-500 hover:text-signal-error">
            <Trash2 size={13} aria-hidden="true" /> Remove
          </button>
        )}
      </div>
    </li>
  );
}

export default function PortalSubmissions() {
  const { profile, consents, applications } = useAuth();
  const { submissions, loaded, error, reload } = useContributorData(profile.id);
  const [deleteError, setDeleteError] = useState("");
  // Projects this contributor is approved on, with the current terms agreed.
  const active = PROJECTS.filter(
    (p) =>
      p.open &&
      applicationFor(applications, p.slug)?.status === "approved" &&
      hasConsented(consents, p.slug, p.consent)
  );

  const handleDelete = async (submission) => {
    if (!window.confirm("Remove this submission? It hasn't been reviewed yet.")) return;
    const { error: removeError } = await supabase.from("submissions").delete().eq("id", submission.id);
    setDeleteError(removeError?.message || "");
    reload();
  };

  return (
    <PortalLayout title="Submissions">
      <Panel title="Log a new batch">
        {active.length > 0 ? (
          <SubmissionForm projects={active} onSaved={reload} />
        ) : (
          <p className="text-sm text-ink-700">
            You can log work once you've been accepted on a project. See open projects on
            your <Link to="/user/dashboard" className="text-accent-700 hover:underline">home page</Link>.
          </p>
        )}
      </Panel>

      <Panel title="Your submissions">
        <Notice tone="error">{error || deleteError}</Notice>
        {!loaded ? (
          <Spinner />
        ) : submissions.length === 0 ? (
          <p className="text-sm text-ink-500">Nothing logged yet.</p>
        ) : (
          <ul className="divide-y divide-ink-100">
            {submissions.map((s) => (
              <SubmissionItem key={s.id} submission={s} onDelete={handleDelete} />
            ))}
          </ul>
        )}
      </Panel>
    </PortalLayout>
  );
}
