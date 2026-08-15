import { NavLink, Outlet, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const links = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/food-items", label: "Food items" },
  { to: "/admin/services", label: "Services" },
  { to: "/admin/users", label: "Users" },
];

export default function AdminLayout() {
  const { profile, currentUser } = useAuth();

  return (
    <div className="min-h-[80vh] bg-(--color-crust)">
      <div className="bg-(--color-char) text-(--color-crust)">
        <div className="max-w-6xl mx-auto px-5 py-6 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-(--color-cheese)">
              Kitchen back office
            </span>
            <h1 className="font-display text-3xl mt-1">Admin dashboard</h1>
          </div>
          <div className="text-right hidden sm:block">
            <p className="font-mono text-xs text-(--color-crust)/60">Signed in as</p>
            <p className="font-mono text-sm">{profile?.name || currentUser?.email}</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-10 grid md:grid-cols-[200px_1fr] gap-8">
        <nav className="flex md:flex-col gap-2 md:gap-1 overflow-x-auto">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `whitespace-nowrap px-4 py-2.5 rounded font-mono text-xs uppercase tracking-widest transition-colors ${
                  isActive
                    ? "bg-(--color-ember) text-(--color-crust)"
                    : "text-(--color-smoke) hover:bg-(--color-crust-2)"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/"
            className="whitespace-nowrap px-4 py-2.5 rounded font-mono text-xs uppercase tracking-widest text-(--color-smoke) hover:bg-(--color-crust-2) mt-2 md:mt-4"
          >
            ← Back to site
          </Link>
        </nav>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
