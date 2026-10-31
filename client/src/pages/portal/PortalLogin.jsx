import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { COMPANY } from "../../data/company";
import { useAuth } from "../../lib/portal";
import { AuthShell } from "../../components/portal/PortalLayout";
import { Field, Input, Notice, Spinner } from "../../components/portal/Controls";
import { Button } from "../../components/ui/Button";

const TITLES = {
  signin: "Sign in",
  signup: "Create an account",
  forgot: "Reset your password",
};

export default function PortalLogin({ initialMode = "signin" }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  if (loading) return <Spinner />;
  if (user) return <Navigate to={location.state?.from || "/user/dashboard"} replace />;

  const switchTo = (next) => {
    setMode(next);
    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    const origin = window.location.origin;

    let result;
    if (mode === "signin") {
      result = await supabase.auth.signInWithPassword({ email, password });
      if (!result.error) navigate(location.state?.from || "/user/dashboard", { replace: true });
    } else if (mode === "signup") {
      result = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${origin}/user/onboarding` },
      });
      // With email confirmation on, there is no session until the link is clicked.
      if (!result.error && !result.data.session) {
        setMessage(`We've sent a confirmation link to ${email}. Open it to finish creating your account.`);
      }
    } else {
      result = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/user/reset-password`,
      });
      if (!result.error) {
        setMessage(`If ${email} has an account, a reset link is on its way.`);
      }
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
            <Input
              type="password"
              required
              minLength={mode === "signup" ? 8 : undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
            />
          </Field>
        )}

        <Notice tone="error">{error}</Notice>
        <Notice tone="success">{message}</Notice>

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
