import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { friendlyAuthError } from "./Login";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords don't match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Choose a password with at least 6 characters.");
      return;
    }

    setSubmitting(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(friendlyAuthError(err.code));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-(--color-basil)">Join us</span>
          <h1 className="font-display text-3xl mt-2">Create an account</h1>
        </div>

        <form onSubmit={handleSubmit} className="ticket p-6 pt-8 border border-(--color-ink)/5 space-y-4">
          <div>
            <label htmlFor="name" className="block font-mono text-xs uppercase tracking-widest text-(--color-smoke) mb-1">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full rounded border border-(--color-ink)/15 bg-white px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest text-(--color-smoke) mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded border border-(--color-ink)/15 bg-white px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-mono text-xs uppercase tracking-widest text-(--color-smoke) mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full rounded border border-(--color-ink)/15 bg-white px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="confirm" className="block font-mono text-xs uppercase tracking-widest text-(--color-smoke) mb-1">
              Confirm password
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              required
              value={form.confirm}
              onChange={handleChange}
              className="w-full rounded border border-(--color-ink)/15 bg-white px-3 py-2 text-sm"
            />
          </div>

          {error && (
            <p className="text-sm text-(--color-ember)" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-5 py-3 rounded bg-(--color-ember) hover:bg-(--color-ember-2) disabled:opacity-60 transition-colors font-mono text-sm uppercase tracking-widest text-(--color-crust)"
          >
            {submitting ? "Creating account..." : "Create account"}
          </button>

          <p className="text-center text-xs font-mono text-(--color-smoke)">
            Already have an account?{" "}
            <Link to="/login" className="text-(--color-ember) hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
