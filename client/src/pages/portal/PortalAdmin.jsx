import { useCallback, useEffect, useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { describePayout, formatDate, formatHours, formatMoney } from "../../lib/portal";
import { summarise } from "../../lib/usePortalData";
import { PROJECTS, findProject } from "../../data/portal";
import PortalLayout from "../../components/portal/PortalLayout";
import { Field, Input, Notice, Panel, Select, Spinner, StatusPill, Textarea } from "../../components/portal/Controls";
import { Button } from "../../components/ui/Button";

const TABS = [
  { id: "applications", label: "Applications" },
  { id: "review", label: "Review" },
  { id: "payments", label: "Payments" },
  { id: "contributors", label: "Contributors" },
];

const APPLICATION_STATUSES = ["applied", "approved", "paused", "rejected", "withdrawn"];
const REVIEW_STATUSES = ["pending", "accepted", "partial", "rejected"];

const filterClass = "rounded-md border border-ink-300 px-2 py-1 text-sm";

function whatsappLink(phone) {
  return `https://wa.me/${(phone || "").replace(/\D/g, "")}`;
}

function projectTitle(slug) {
  return findProject(slug)?.title || slug;
}

function useAdminData() {
  const [data, setData] = useState({
    profiles: [],
    applications: [],
    submissions: [],
    payments: [],
    payouts: {},
    loaded: false,
    error: "",
  });

  const reload = useCallback(async () => {
    const results = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("applications").select("*").order("created_at", { ascending: false }),
      supabase.from("submissions").select("*").order("created_at", { ascending: false }),
      supabase.from("payments").select("*").order("paid_on", { ascending: false }),
      supabase.from("payout_details").select("*"),
    ]);
    const [pr, ap, su, pa, po] = results;
    setData({
      profiles: pr.data ?? [],
      applications: ap.data ?? [],
      submissions: su.data ?? [],
      payments: pa.data ?? [],
      payouts: Object.fromEntries((po.data ?? []).map((row) => [row.user_id, row])),
      loaded: true,
      error: results.find((r) => r.error)?.error.message || "",
    });
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { ...data, reload };
}

/** Contact, location and payout details for one contributor. */
function ContactLines({ profile, payout }) {
  return (
    <div className="mt-2 grid gap-x-6 gap-y-1 text-sm text-ink-700 sm:grid-cols-2">
      <p>
        WhatsApp:{" "}
        <a href={whatsappLink(profile.phone)} target="_blank" rel="noreferrer" className="text-accent-700 hover:underline">
          {profile.phone}
        </a>
      </p>
      <p>{[profile.city, profile.country].filter(Boolean).join(", ")}</p>
      <p className="sm:col-span-2">
        {payout ? describePayout(payout) : <span className="text-ink-500">No payment details yet</span>}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------------ */

function ApplicationRow({ application, profile, payout, onSaved }) {
  const [status, setStatus] = useState(application.status);
  const [folder, setFolder] = useState(application.drive_folder_url || "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const dirty = status !== application.status || folder !== (application.drive_folder_url || "");
  const project = findProject(application.project);

  const save = async () => {
    setBusy(true);
    const { error: updateError } = await supabase
      .from("applications")
      .update({ status, drive_folder_url: folder.trim() || null })
      .eq("id", application.id);
    setBusy(false);
    setError(updateError?.message || "");
    if (!updateError) onSaved();
  };

  return (
    <li className="py-4 first:pt-0 last:pb-0">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-ink-900">{profile?.full_name || profile?.email}</p>
          <p className="text-xs text-ink-500">
            {projectTitle(application.project)} · applied {formatDate(application.created_at)}
          </p>
        </div>
        <StatusPill status={application.status} />
      </div>

      {profile && <ContactLines profile={profile} payout={payout} />}

      {project && (
        <dl className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
          {project.questions.map((q) => {
            const value = application.answers?.[q.key];
            return (
              <div key={q.key}>
                <dt className="text-xs text-ink-500">{q.label}</dt>
                <dd className="text-ink-800">{(Array.isArray(value) ? value.join(", ") : value) ?? "Not answered"}</dd>
              </div>
            );
          })}
        </dl>
      )}

      <div className="mt-3 grid gap-3 sm:grid-cols-[10rem_1fr_auto] sm:items-end">
        <Field label="Status">
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            {APPLICATION_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </Select>
        </Field>
        <Field label="Drive upload folder">
          <Input type="url" value={folder} onChange={(e) => setFolder(e.target.value)} placeholder="https://drive.google.com/..." />
        </Field>
        <Button onClick={save} loading={busy} disabled={!dirty}>Save</Button>
      </div>
      <div className="mt-2"><Notice tone="error">{error}</Notice></div>
    </li>
  );
}

function ApplicationsTab({ applications, byId, payouts, reload }) {
  const [project, setProject] = useState("all");
  const [status, setStatus] = useState("applied");
  const shown = applications.filter(
    (a) => (project === "all" || a.project === project) && (status === "all" || a.status === status)
  );

  return (
    <Panel
      title={`Applications (${shown.length})`}
      action={
        <div className="flex flex-wrap gap-2">
          <select value={project} onChange={(e) => setProject(e.target.value)} className={filterClass} aria-label="Project">
            <option value="all">All projects</option>
            {PROJECTS.map((p) => <option key={p.slug} value={p.slug}>{p.title}</option>)}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={filterClass} aria-label="Status">
            {["all", ...APPLICATION_STATUSES].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      }
    >
      {shown.length === 0 ? (
        <p className="text-sm text-ink-500">None.</p>
      ) : (
        <ul className="divide-y divide-ink-100">
          {shown.map((a) => (
            <ApplicationRow
              key={`${a.id}-${a.updated_at}`}
              application={a}
              profile={byId[a.user_id]}
              payout={payouts[a.user_id]}
              onSaved={reload}
            />
          ))}
        </ul>
      )}
    </Panel>
  );
}

/* ------------------------------------------------------------------------ */

function ContributorsTab({ profiles, applications, payouts }) {
  return (
    <Panel title={`Contributors (${profiles.length})`}>
      <ul className="divide-y divide-ink-100">
        {profiles.map((p) => {
          const theirs = applications.filter((a) => a.user_id === p.id);
          return (
            <li key={p.id} className="py-4 first:pt-0 last:pb-0">
              <p className="text-sm font-medium text-ink-900">
                {p.full_name || "(profile not completed)"}
                {p.is_admin && <span className="ml-2 text-xs text-accent-700">admin</span>}
              </p>
              <p className="text-xs text-ink-500">{p.email} · joined {formatDate(p.created_at)}</p>
              {p.full_name && <ContactLines profile={p} payout={payouts[p.id]} />}
              <p className="mt-2 text-sm text-ink-600">
                {theirs.length === 0
                  ? "No applications yet."
                  : theirs.map((a) => `${projectTitle(a.project)}: ${a.status}`).join(" · ")}
              </p>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

/* ------------------------------------------------------------------------ */

function ReviewRow({ submission, contributor, onSaved }) {
  const s = submission;
  const [values, setValues] = useState({
    status: s.status === "pending" ? "accepted" : s.status,
    minutes_accepted: s.minutes_accepted ?? s.minutes_submitted,
    amount: s.amount ?? "",
    feedback: s.feedback ?? "",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const set = (key) => (e) => setValues({ ...values, [key]: e.target.value });

  const save = async () => {
    setBusy(true);
    const { error: updateError } = await supabase
      .from("submissions")
      .update({
        status: values.status,
        minutes_accepted: values.status === "rejected" ? 0 : Number(values.minutes_accepted),
        amount: values.amount === "" ? null : Number(values.amount),
        feedback: values.feedback.trim() || null,
      })
      .eq("id", s.id);
    setBusy(false);
    setError(updateError?.message || "");
    if (!updateError) onSaved();
  };

  return (
    <li className="py-4 first:pt-0 last:pb-0">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-ink-900">
            {contributor?.full_name || contributor?.email} · {s.category}
          </p>
          <p className="text-xs text-ink-500">
            {formatDate(s.created_at)} · {s.project} · {s.clip_count} clips · {formatHours(s.minutes_submitted)}
          </p>
        </div>
        <StatusPill status={s.status} />
      </div>
      {s.notes && <p className="mt-2 text-sm text-ink-700">{s.notes}</p>}
      <a href={s.files_url} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-sm text-accent-700 hover:underline">
        Open files <ExternalLink size={13} aria-hidden="true" />
      </a>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Field label="Result">
          <Select value={values.status} onChange={set("status")}>
            {REVIEW_STATUSES.map((st) => <option key={st} value={st}>{st}</option>)}
          </Select>
        </Field>
        <Field label="Minutes accepted">
          <Input type="number" min="0" step="0.5" value={values.minutes_accepted} onChange={set("minutes_accepted")} disabled={values.status === "rejected"} />
        </Field>
        <Field label="Amount (KES)">
          <Input type="number" min="0" step="1" value={values.amount} onChange={set("amount")} />
        </Field>
      </div>
      <div className="mt-3">
        <Field label="Feedback to contributor">
          <Textarea value={values.feedback} onChange={set("feedback")} placeholder="e.g. Clips 3 and 7 had shaky start shots; the rest passed." />
        </Field>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <Button onClick={save} loading={busy}>Save review</Button>
        <Notice tone="error">{error}</Notice>
      </div>
    </li>
  );
}

function ReviewTab({ submissions, byId, reload }) {
  const [filter, setFilter] = useState("pending");
  const shown = filter === "all" ? submissions : submissions.filter((s) => s.status === filter);

  return (
    <Panel
      title={`Submissions (${shown.length})`}
      action={
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-md border border-ink-300 px-2 py-1 text-sm">
          {["all", ...REVIEW_STATUSES].map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      }
    >
      {shown.length === 0 ? (
        <p className="text-sm text-ink-500">Nothing here.</p>
      ) : (
        <ul className="divide-y divide-ink-100">
          {shown.map((s) => (
            <ReviewRow key={`${s.id}-${s.reviewed_at}`} submission={s} contributor={byId[s.user_id]} onSaved={reload} />
          ))}
        </ul>
      )}
    </Panel>
  );
}

/* ------------------------------------------------------------------------ */

const EMPTY_PAYMENT = { user_id: "", amount: "", reference: "", paid_on: "", note: "" };

function PaymentsTab({ profiles, submissions, payments, payouts, byId, reload }) {
  const [form, setForm] = useState(EMPTY_PAYMENT);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const balances = useMemo(
    () =>
      profiles
        .map((p) => {
          const totals = summarise(
            submissions.filter((s) => s.user_id === p.id),
            payments.filter((x) => x.user_id === p.id)
          );
          return { profile: p, ...totals, due: totals.earned - totals.paid };
        })
        .filter((b) => b.earned > 0 || b.paid > 0)
        .sort((a, b) => b.due - a.due),
    [profiles, submissions, payments]
  );

  const payee = payouts[form.user_id];

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    const { error: insertError } = await supabase.from("payments").insert({
      user_id: form.user_id,
      method: payee?.method === "bank" ? "Bank transfer" : "M-Pesa",
      amount: Number(form.amount),
      reference: form.reference.trim().toUpperCase() || null,
      paid_on: form.paid_on || undefined,
      note: form.note.trim() || null,
    });
    setBusy(false);
    setError(insertError?.message || "");
    if (!insertError) {
      setForm(EMPTY_PAYMENT);
      reload();
    }
  };

  return (
    <>
      <Panel title="Balances">
        {balances.length === 0 ? (
          <p className="text-sm text-ink-500">No reviewed earnings yet.</p>
        ) : (
          <ul className="divide-y divide-ink-100">
            {balances.map((b) => (
              <li key={b.profile.id} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-ink-900">{b.profile.full_name}</p>
                  <p className="text-xs text-ink-500">
                    Earned {formatMoney(b.earned)} · paid {formatMoney(b.paid)} ·{" "}
                    {payouts[b.profile.id] ? describePayout(payouts[b.profile.id]) : "no payment details yet"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display font-semibold tabular-nums text-ink-950">{formatMoney(b.due)}</span>
                  {b.due > 0 && (
                    <Button variant="secondary" onClick={() => setForm({ ...EMPTY_PAYMENT, user_id: b.profile.id, amount: String(b.due) })}>
                      Pay
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Record a payment">
        <form onSubmit={save} className="space-y-4">
          <Field label="Contributor">
            <Select required value={form.user_id} onChange={set("user_id")}>
              <option value="">Choose</option>
              {profiles.filter((p) => p.full_name).map((p) => (
                <option key={p.id} value={p.id}>{p.full_name}</option>
              ))}
            </Select>
          </Field>
          {form.user_id && (
            <Notice tone={payee ? "info" : "error"}>
              {payee
                ? `Pay to: ${describePayout(payee)}`
                : "This contributor hasn't added payment details yet."}
            </Notice>
          )}
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Amount (KES)">
              <Input type="number" required min="1" step="1" value={form.amount} onChange={set("amount")} />
            </Field>
            <Field label={payee?.method === "bank" ? "Bank reference" : "M-Pesa code"}>
              <Input value={form.reference} onChange={set("reference")} placeholder={payee?.method === "bank" ? "" : "e.g. SJK3XXXXXX"} />
            </Field>
            <Field label="Date paid" hint="Leave blank for today.">
              <Input type="date" value={form.paid_on} onChange={set("paid_on")} />
            </Field>
          </div>
          <Field label="Note to contributor">
            <Input value={form.note} onChange={set("note")} placeholder="e.g. Batches logged 1–7 Nov" />
          </Field>
          <Notice tone="error">{error}</Notice>
          <Button type="submit" loading={busy}>Record payment</Button>
        </form>
      </Panel>

      <Panel title="Recent payments">
        {payments.length === 0 ? (
          <p className="text-sm text-ink-500">None yet.</p>
        ) : (
          <ul className="divide-y divide-ink-100">
            {payments.slice(0, 50).map((p) => (
              <li key={p.id} className="flex justify-between gap-3 py-2.5 text-sm first:pt-0 last:pb-0">
                <span className="text-ink-800">
                  {formatDate(p.paid_on)} · {byId[p.user_id]?.full_name}
                  {p.reference && <span className="text-ink-500"> · {p.reference}</span>}
                </span>
                <span className="font-medium tabular-nums">{formatMoney(p.amount, p.currency)}</span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </>
  );
}

/* ------------------------------------------------------------------------ */

export default function PortalAdmin() {
  const data = useAdminData();
  const [tab, setTab] = useState("applications");
  const byId = useMemo(
    () => Object.fromEntries(data.profiles.map((p) => [p.id, p])),
    [data.profiles]
  );
  const counts = {
    applications: data.applications.filter((a) => a.status === "applied").length,
    review: data.submissions.filter((s) => s.status === "pending").length,
  };

  return (
    <PortalLayout title="Admin" wide>
      <div className="flex gap-1 border-b border-ink-200">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium ${
              tab === t.id ? "border-accent-600 text-ink-950" : "border-transparent text-ink-500 hover:text-ink-800"
            }`}
          >
            {t.label}
            {counts[t.id] > 0 && (
              <span className="ml-1.5 rounded bg-accent-50 px-1.5 text-xs text-accent-700">{counts[t.id]}</span>
            )}
          </button>
        ))}
      </div>

      <Notice tone="error">{data.error}</Notice>

      {!data.loaded ? (
        <Spinner />
      ) : (
        <>
          {tab === "applications" && <ApplicationsTab {...data} byId={byId} />}
          {tab === "review" && <ReviewTab submissions={data.submissions} byId={byId} reload={data.reload} />}
          {tab === "payments" && <PaymentsTab {...data} byId={byId} />}
          {tab === "contributors" && <ContributorsTab {...data} />}
        </>
      )}
    </PortalLayout>
  );
}
