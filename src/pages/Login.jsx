import { useState } from "react";//គឺជា Hook របស់ React។វាប្រើសម្រាប់ រក្សាទុក data/state ដែលអាចផ្លាស់ប្តូរ នៅក្នុង React component។
import { Link, useLocation, useNavigate } from "react-router-dom";
//Link ប្រើសម្រាប់ ចុចទៅ Page ផ្សេង ដោយមិន Reload website ទាំងមូល។
//useLocation() ប្រើសម្រាប់ ដឹងថា User កំពុងនៅ URL/Page មួយណា។
//useNavigate() ប្រើសម្រាប់ បញ្ជូន User ទៅ Page ផ្សេងតាម JavaScript។
//react-router-dom ជួយឱ្យ React អាចប្តូរ Page តាម URL ដូចជា /, /menu, /cart, /checkout។
import { useAuth } from "../contexts/AuthContext";
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
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
          <span className="font-mono text-xs uppercase tracking-widest text-(--color-basil)">Welcome back</span>
          <h1 className="font-display text-3xl mt-2">Log in</h1>
        </div>
        <form onSubmit={handleSubmit} className="ticket p-6 pt-8 border border-(--color-ink)/5 space-y-4">
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
              autoComplete="current-password"
              required
              value={form.password}
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
            {submitting ? "Logging in..." : "Log in"}
          </button>

          <div className="flex justify-between text-xs font-mono">
            <Link to="/forgot-password" className="text-(--color-smoke) hover:text-(--color-ember)">
              Forgot password?
            </Link>
            <Link to="/register" className="text-(--color-smoke) hover:text-(--color-ember)">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export function friendlyAuthError(code) {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "That email and password combination doesn't match our records.";
    case "auth/email-already-in-use":
      return "An account with that email already exists.";
    case "auth/weak-password":
      return "Choose a password with at least 6 characters.";
    case "auth/invalid-email":
      return "That email address doesn't look right.";
    case "auth/too-many-requests":
      return "Too many attempts — please wait a moment and try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}
