import { Link } from "react-router-dom";

// Signature pizza-menu card: full-bleed image, gradient overlay,
// floating price tag, and a "Buy" button that hands off to Contact
// (this project has no cart/checkout backend, so ordering routes
// through the contact form with the dish pre-filled).
export default function MenuItemCard({ id, name, description, price, category, imageUrl }) {
  return (
    <div className="group rounded-xl overflow-hidden bg-white border border-(--color-ink)/8 shadow-sm hover:shadow-lg transition-shadow flex flex-col">
      <div className="relative h-52 bg-(--color-crust-2) overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-5xl text-(--color-ink)/10" aria-hidden="true">
              🍕
            </span>
          </div>
        )}

        {/* gradient for legibility + drama */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-(--color-char)/70 via-transparent to-transparent"
          aria-hidden="true"
        />

        {category && (
          <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest bg-(--color-char)/80 text-(--color-crust) px-2.5 py-1 rounded-full backdrop-blur-sm">
            {category}
          </span>
        )}

        {price !== undefined && price !== "" && (
          <span className="absolute bottom-3 right-3 font-mono text-sm font-medium bg-(--color-ember) text-(--color-crust) px-3 py-1.5 rounded-full shadow-md">
            ${Number(price).toFixed(2)}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-2xl leading-snug">{name}</h3>
        {description && (
          <p className="text-sm text-(--color-smoke) leading-relaxed mt-2 flex-1">{description}</p>
        )}

        <Link
          to={`/menu/${id}`}
          className="mt-4 block text-center w-full py-2.5 rounded-lg bg-(--color-ember) hover:bg-(--color-ember-2) active:scale-[0.98] transition-all font-mono text-xs uppercase tracking-widest text-(--color-crust)"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
