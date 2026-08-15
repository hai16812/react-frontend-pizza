import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Account() {
  const { currentUser, refreshProfile } = useAuth();
  const [name, setName] = useState(currentUser.displayName || "");
  const [status, setStatus] = useState({ type: "", message: "" }); // idle | success | error

  async function handleUpdateName(e) {
    e.preventDefault();
    setStatus({ type: "loading", message: "Saving..." });
    if (!name.trim()) {
      setStatus({ type: "error", message: "Name cannot be empty." });
      return;
    }
    try {
      await currentUser.updateProfile({ displayName: name });
      await refreshProfile(); // Refresh profile data in AuthContext
      setStatus({ type: "success", message: "Profile updated successfully!" });
    } catch (err) {
      setStatus({ type: "error", message: "Failed to update profile. Please try again." });
      console.error(err);
    }
  }

  return (
    <div>
      <section className="bg-(--color-char) text-(--color-crust) py-20">
        <div className="max-w-4xl mx-auto px-5">
          <span className="font-mono text-xs uppercase tracking-widest text-(--color-cheese)">Your Account</span>
          <h1 className="font-display text-4xl md:text-5xl mt-3">
            Welcome, {currentUser.displayName || "friend"}.
          </h1>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-5 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-24 h-24 bg-(--color-crust-2) rounded-full flex items-center justify-center ring-4 ring-(--color-cheese)/50">
              <span className="font-display text-4xl text-(--color-smoke)">
                {currentUser.displayName?.charAt(0).toUpperCase() || "🍕"}
              </span>
            </div>
            <div>
              <h2 className="text-3xl font-display text-(--color-ink)">{name || "Your Name"}</h2>
              <p className="text-(--color-smoke) text-sm">{currentUser.email}</p>
            </div>
          </div>

          <h3 className="font-display text-xl mb-6 border-b border-(--color-ink)/10 pb-2 text-(--color-ink)">
            Edit Profile
          </h3>

          <form onSubmit={handleUpdateName} className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-mono text-xs uppercase tracking-widest text-(--color-smoke) mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-(--color-ember) focus:ring focus:ring-(--color-ember)/50 px-4 py-2 text-base"
              />
            </div>
            <button
              type="submit"
              disabled={status.type === "loading"}
              className="w-full px-5 py-3 rounded-md bg-(--color-ember) hover:bg-(--color-ember-2) disabled:opacity-60 transition-colors font-mono text-sm uppercase tracking-widest text-(--color-crust) shadow-md hover:shadow-lg"
            >
              {status.type === "loading" ? "Saving..." : "Save Profile"}
            </button>
          </form>

          {status.message && (
            <p className={`text-sm text-center mt-6 ${status.type === 'error' ? 'text-(--color-ember)' : 'text-(--color-basil)'}`} role="alert">
              {status.message}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}