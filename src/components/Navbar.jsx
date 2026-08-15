import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser, profile, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  async function handleLogout() {
    const confirmed = window.confirm("Are you sure you want to leave your account?");
    if (!confirmed) return;

    await logout();
    setOpen(false);
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-50 bg-(--color-char) text-(--color-crust) border-b border-(--color-crust)/10">
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <span
            className="w-2.5 h-2.5 rounded-full bg-(--color-ember) group-hover:scale-125 transition-transform"
            aria-hidden="true"
          />
          <span className="font-display italic text-xl tracking-tight">
 PIZZA      <span className="text-(--color-cheese)"></span> SHOP
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 font-mono text-xs uppercase tracking-widest">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `pb-1 border-b-2 transition-colors ${
                  isActive
                    ? "border-(--color-ember) text-(--color-crust)"
                    : "border-transparent text-(--color-crust)/60 hover:text-(--color-crust)"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-(--color-crust)/60 group-hover:text-(--color-crust) transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-(--color-ember) text-(--color-crust) text-xs font-bold flex items-center justify-center">{cartCount}</span>
            )}
          </Link>

        <div className="hidden md:flex items-center gap-4">
          {currentUser ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="font-mono text-xs uppercase tracking-widest text-(--color-cheese) hover:text-(--color-crust) transition-colors"
                >
                  Dashboard
                </Link>
              )}
              <Link
                to="/account"
                className="font-mono text-xs text-(--color-crust)/50 hover:text-(--color-crust) transition-colors"
              >
                {profile?.name || currentUser.email}
              </Link>
              <button
                onClick={handleLogout}
                className="font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded border border-(--color-crust)/25 hover:border-(--color-ember) hover:text-(--color-ember) transition-colors"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="font-mono text-xs uppercase tracking-widest text-(--color-crust)/70 hover:text-(--color-crust) transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded bg-(--color-ember) hover:bg-(--color-ember-2) transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
        </div>

        <button
          className="md:hidden p-2 -mr-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`h-0.5 bg-(--color-crust) transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 bg-(--color-crust) transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 bg-(--color-crust) transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-(--color-crust)/10 px-5 py-4 flex flex-col gap-4 font-mono text-sm uppercase tracking-widest">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-(--color-crust)/80">
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/cart" onClick={() => setOpen(false)} className="text-(--color-crust)/80">
            Cart ({cartCount})
          </NavLink>
          <div className="h-px bg-(--color-crust)/10 my-1" />
          {currentUser ? (
            <>
              {isAdmin && (
                <Link to="/admin" onClick={() => setOpen(false)} className="text-(--color-cheese)">
                  Dashboard
                </Link>
              )}
              <Link to="/account" onClick={() => setOpen(false)} className="text-(--color-crust)/80">
                My Account ({profile?.name || currentUser.email})
              </Link>
              <button onClick={handleLogout} className="text-left text-(--color-ember)">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="text-(--color-crust)/80">
                Log in
              </Link>
              <Link to="/register" onClick={() => setOpen(false)} className="text-(--color-ember)">
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
