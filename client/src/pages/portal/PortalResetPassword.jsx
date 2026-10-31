import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../lib/portal";
import { AuthShell } from "../../components/portal/PortalLayout";
import { Field, Input, Notice, Spinner } from "../../components/portal/Controls";
import { Button } from "../../components/ui/Button";

/**
 * Landing page for the password-reset email. Supabase reads the token from the
 * link and signs the visitor in, so a session here means the link was valid.
 */
export default function PortalResetPassword() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (loading) return <Spinner />;

  if (!user) {
    return (
      <AuthShell title="Reset your password">
        <Notice tone="error">This reset link has expired or was already used.</Notice>
        <Link to="/user/login" className="mt-4 inline-block text-sm font-medium text-accent-700 hover:underline">
          Request a new one
        </Link>
      </AuthShell>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (updateError) setError(updateError.message);
    else navigate("/user/dashboard", { replace: true });
  };

  return (
    <AuthShell title="Choose a new password">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="New password" hint="At least 8 characters.">
          <Input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </Field>
        <Notice tone="error">{error}</Notice>
        <Button type="submit" loading={busy} className="w-full">
          Save password
        </Button>
      </form>
    </AuthShell>
  );
}
