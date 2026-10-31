import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { COMPANY } from "../../data/company";
import { useAuth } from "../../lib/portal";
import { AuthShell } from "../../components/portal/PortalLayout";
import { Field, Input, Notice, PasswordInput, Spinner } from "../../components/portal/Controls";
import { MailCheck } from "lucide-react";
import { Button } from "../../components/ui/Button";

const TITLES = {
  signin: "Sign in",
  signup: "Create an account",
  forgot: "Reset your password",
};

// Where each kind of email link lands.
const signupRedirect = () => `${window.location.origin}/user/onboarding`;
const resetRedirect = () => `${window.location.origin}/user/reset-password`;

/**
 * Shown in place of the form once an email has gone out, so the form can't be
 * submitted twice and the next step is the only thing on screen.
 */
function EmailSent({ kind, email, onBack }) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState({ tone: "success", text: "" });

  const resend = async () => {
    setBusy(true);
    const { error } =
      kind === "signup"
        ? await supabase.auth.resend({
            type: "signup",
            email,
            options: { emailRedirectTo: signupRedirect() },
          })
        : await supabase.auth.resetPasswordForEmail(email, { redirectTo: resetRedirect() });
    setBusy(false);
    setStatus(
      error
        ? { tone: "error", text: error.message }
        : { tone: "success", text: "Sent again." }
    );
  };

  return (
    <AuthShell title="Check your email">
      <div className="space-y-4">
        <MailCheck size={32} className="text-accent-600" aria-hidden="true" />
        <p className="text-sm text-ink-700 leading-relaxed">
          {kind === "signup" ? (
            <>We've sent a confirmation link to <strong className="text-ink-950">{email}</strong>. Open it to finish creating your account.</>
          ) : (
            <>If <strong className="text-ink-950">{email}</strong> has an account, we've sent it a link to choose a new password.</>
          )}
        </p>
        <p className="text-sm text-ink-500 leading-relaxed">
          It can take a few minutes to arrive. If you can't find it, check your spam
          or promotions folder.
        </p>
        <Notice tone={status.tone}>{status.text}</Notice>
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Button variant="secondary" onClick={resend} loading={busy}>
            Resend email
          </Button>
          <Button variant="secondary" onClick={onBack}>
            {kind === "signup" ? "Use a different email" : "Back to sign in"}
          </Button>
        </div>
      </div>
    </AuthShell>
  );
}

export default function PortalLogin({ initialMode = "signin" }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(null); // "signup" | "reset" once an email is out

  if (loading) return <Spinner />;
  if (user) return <Navigate to={location.state?.from || "/user/dashboard"} replace />;

  if (sent) {
    return (
      <EmailSent
        kind={sent}
        email={email}
        onBack={() => {
          setSent(null);
          setMode(sent === "signup" ? "signup" : "signin");
        }}
      />
    );
  }

  const switchTo = (next) => {
    setMode(next);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");

    let result;
    if (mode === "signin") {
      result = await supabase.auth.signInWithPassword({ email, password });
      if (!result.error) navigate(location.state?.from || "/user/dashboard", { replace: true });
    } else if (mode === "signup") {
      result = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: signupRedirect() },
      });
      // With email confirmation on, there is no session until the link is clicked.
      if (!result.error && !result.data.session) setSent("signup");
    } else {
      result = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: resetRedirect(),
      });
      if (!result.error) setSent("reset");
    }

    if (result.error) setError(result.error.message);
    setBusy(false);
  };

  return (
    <AuthShell title={TITLES[mode]}>
      {mode === "signup" && (
        <p className="mb-5 text-sm text-ink-600 leading-relaxed">
          Join {COMPANY.name} as a contributor to take part in our data projects.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Email">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </Field>

        {mode !== "forgot" && (
          <Field label="Password" hint={mode === "signup" ? "At least 8 characters." : undefined}>
            <PasswordInput
              required
              minLength={mode === "signup" ? 8 : undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
            />
          </Field>
        )}

        <Notice tone="error">{error}</Notice>

        <Button type="submit" loading={busy} className="w-full">
          {mode === "signin" && "Sign in"}
          {mode === "signup" && "Create account"}
          {mode === "forgot" && "Send reset link"}
        </Button>
      </form>

      <div className="mt-6 space-y-2 text-sm text-ink-600">
        {mode === "signin" && (
          <>
            <p>
              New here?{" "}
              <button onClick={() => switchTo("signup")} className="font-medium text-accent-700 hover:underline">
                Create an account
              </button>
            </p>
            <p>
              <button onClick={() => switchTo("forgot")} className="text-ink-500 hover:underline">
                Forgot your password?
              </button>
            </p>
          </>
        )}
        {mode !== "signin" && (
          <p>
            Already have an account?{" "}
            <button onClick={() => switchTo("signin")} className="font-medium text-accent-700 hover:underline">
              Sign in
            </button>
          </p>
        )}
      </div>
    </AuthShell>
  );
}
