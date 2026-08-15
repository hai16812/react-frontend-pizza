import { useEffect, useState } from "react";
import { listenFoodItems } from "../firebase/firestoreApi";
import MenuItemCard from "../components/MenuItemCard";

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const unsub = listenFoodItems((data) => {
      setItems(data);
      setLoading(false);
    });
    return unsub;
  }, []);

  const categories = ["All", ...new Set(items.map((i) => i.category).filter(Boolean))];
  const visible = items.filter((i) => i.available !== false && (category === "All" || i.category === category));

  return (
    <div>
      <section 
        className="relative bg-(--color-char) text-(--color-crust) py-32 md:py-40 overflow-hidden"
        style={{
          backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkKHjf8QbwSmA2X2g4arRpg24BNoLvhs_R86N_jR9h3PV4gmMXjKCQxSQ&s=10')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-(--color-char)/95 via-(--color-char)/85 to-(--color-char)/70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-(--color-char)/40 via-transparent to-(--color-char)/60"></div>
        
        {/* Decorative accent elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-(--color-ember)/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-20 w-72 h-72 bg-(--color-cheese)/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto px-5 z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 bg-(--color-ember) rounded-full"></span>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-cheese)">
              The menu
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.1] max-w-3xl">
            Fired fresh, <em className="italic text-(--color-ember) font-display">listed</em> honestly.
          </h1>
          
          {/* Decorative line */}
          <div className="mt-8 w-20 h-1 bg-gradient-to-r from-(--color-ember) to-(--color-cheese) rounded-full"></div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16">
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded border transition-colors ${
                  category === c
                    ? "bg-(--color-ember) border-(--color-ember) text-(--color-crust)"
                    : "border-(--color-ink)/15 text-(--color-smoke) hover:border-(--color-ember)"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <p className="text-(--color-smoke) text-sm">Loading the menu...</p>
        ) : visible.length === 0 ? (
          <p className="text-(--color-smoke) text-sm">
            No dishes here yet — the admin dashboard is where new pizzas get added to this page.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <MenuItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                category={item.category}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
