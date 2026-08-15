import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5">
      <span className="font-mono text-xs uppercase tracking-widest text-(--color-ember)">404</span>
      <h1 className="font-display text-4xl mt-3 mb-4">This slice is gone.</h1>
      <p className="text-(--color-smoke) mb-8 max-w-sm">
        The page you're looking for isn't on the menu. Let's get you back to something tastier.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded bg-(--color-ember) hover:bg-(--color-ember-2) text-(--color-crust) transition-colors font-mono text-sm uppercase tracking-widest"
      >
        Back to home
      </Link>
    </div>
  );
}
