import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { friendlyAuthError } from "./Login";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await resetPassword(email);
      setStatus("sent");
    } catch (err) {
      setError(friendlyAuthError(err.code));
      setStatus("error");
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-(--color-basil)">Locked out?</span>
          <h1 className="font-display text-3xl mt-2">Reset your password</h1>
        </div>

        <form onSubmit={handleSubmit} className="ticket p-6 pt-8 border border-(--color-ink)/5 space-y-4">
          <p className="text-sm text-(--color-smoke)">
            Enter the email on your account and we'll send a link to reset your password.
          </p>
          <div>
            <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest text-(--color-smoke) mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-(--color-ink)/15 bg-white px-3 py-2 text-sm"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-(--color-ember)" role="alert">
              {error}
            </p>
          )}
          {status === "sent" && (
            <p className="text-sm text-(--color-basil)" role="status">
              Check your inbox for a reset link.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full px-5 py-3 rounded bg-(--color-ember) hover:bg-(--color-ember-2) disabled:opacity-60 transition-colors font-mono text-sm uppercase tracking-widest text-(--color-crust)"
          >
            {status === "sending" ? "Sending..." : "Send reset link"}
          </button>

          <p className="text-center text-xs font-mono text-(--color-smoke)">
            <Link to="/login" className="text-(--color-ember) hover:underline">
              Back to log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
