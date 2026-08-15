// Signature "order-slip" card — torn top edge, mono price tag.
// Used across the Menu and Services pages.
export default function TicketCard({ title, description, price, tag, imageUrl, footer }) {
  return (
    <div className="ticket shadow-sm hover:shadow-md transition-shadow p-6 pt-8 flex flex-col gap-3 border border-(--color-ink)/5">
      <div className="flex items-start justify-between gap-3">
        <div>
          {tag && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-(--color-basil)">
              {tag}
            </span>
          )}
          <h3 className="font-display text-2xl leading-snug mt-0.5">{title}</h3>
        </div>
        {price && (
          <span className="font-mono text-sm bg-(--color-ember) text-(--color-crust) px-2.5 py-1 rounded shrink-0">
            {price}
          </span>
        )}
      </div>
      {imageUrl && (
        <div className="overflow-hidden rounded-sm border border-(--color-ink)/10 bg-(--color-char)">
          <img
            src={imageUrl}
            alt={title}
            className="w-full aspect-[16/10]- object-cover transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>
      )}
      {description && <p className="text-sm text-(--color-smoke) leading-relaxed">{description}</p>}
      {footer}
    </div>
  );
}
