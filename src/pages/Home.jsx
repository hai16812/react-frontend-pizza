import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFoodItems } from "../firebase/firestoreApi";
import MenuItemCard from "../components/MenuItemCard";

const familyFallback = [
  { id: "fam1", name: "Large Family Feast", description: "Perfect for gatherings, feeds 6-8 people", price: "$45", category: "Family", imageUrl: "https://via.placeholder.com/400x300?text=Family+Feast" },
  { id: "fam2", name: "Triple Combo Pack", description: "Three different flavors, one amazing deal", price: "$48", category: "Family", imageUrl: "https://via.placeholder.com/400x300?text=Triple+Combo" },
  { id: "fam3", name: "Party Bundle Special", description: "Feed your party with our special selection", price: "$52", category: "Family", imageUrl: "https://via.placeholder.com/400x300?text=Party+Bundle" },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [familyPizzas, setFamilyPizzas] = useState([]);

  useEffect(() => {
    getFoodItems().then((items) => {
      // Featured items (Today's Picks): first 3 items that are NOT in "Family" category
      const featured = items.filter(item => item.category !== "Family").slice(0, 3);
      setFeatured(featured);
      
      // Family scroll loop: only items with "Family" category (completely separate)
      const family = items.filter(item => item.category === "Family");
      setFamilyPizzas(family.length > 0 ? family.slice(0, 3) : familyFallback);
    });
  }, []);

  return (
    <div>
      {/* Hero with Pizza Image */}
      <section className="relative bg-(--color-char) text-(--color-crust) overflow-hidden">
        {/* Decorative animated background elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-(--color-ember)/20 to-(--color-cheese)/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-tr from-(--color-cheese)/15 to-(--color-ember)/5 rounded-full blur-3xl" style={{animationDelay: '1s'}}></div>
        
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-(--color-ember)/50 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto px-5 py-20 md:py-32 relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left content */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 w-fit mb-6">
              <span className="w-2 h-2 bg-(--color-ember) rounded-full"></span>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-cheese)">
                Wood-fired since day one
              </span>
            </div>
            
            {/* Main heading */}
            <h1 className="font-display text-6xl md:text-7xl leading-[1.1] mt-2 mb-6">
              Pizza pulled <em className="italic text-(--color-ember) font-display">straight</em><br/> from the flame.
            </h1>
            
            {/* Description */}
            <p className="text-(--color-crust)/80 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              No shortcuts, no frozen dough. Every pie is stretched, topped and fired to order — ready in the time it takes you to find a seat.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/menu"
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-(--color-ember) to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 font-mono text-sm uppercase tracking-widest shadow-lg hover:shadow-2xl"
              >
                View the menu
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 rounded-lg border-2 border-(--color-crust)/40 hover:border-(--color-crust) hover:bg-(--color-crust)/10 transition-all duration-300 font-mono text-sm uppercase tracking-widest"
              >
                Find us
              </Link>
            </div>
          </div>

          {/* Right - Pizza Image */}
          <div className="relative flex justify-center items-center h-full min-h-[400px] md:min-h-[500px]">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-(--color-ember)/20 via-transparent to-(--color-cheese)/10 rounded-full blur-3xl"></div>
            
            {/* Image container with premium styling */}
            <div className="relative group">
              {/* Outer glow layer */}
              <div className="absolute -inset-6 bg-gradient-to-br from-(--color-ember)/30 to-(--color-cheese)/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Image wrapper */}
              <div className="relative transition-all duration-500 transform group-hover:scale-110">
                <img 
                  src="/image_hero_pizzza.png"
                  alt="Delicious Pizza"
                  className="w-full h-auto object-contain group-hover:brightness-110 transition-all duration-500"
                  style={{
                    backgroundColor: 'transparent',
                    filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2))',
                    maxWidth: '480px',
                    width: '100%',
                    height: 'auto',
                    padding: '0px',
                    objectFit: 'contain'
                  }}
                />
              </div>
              
              {/* Decorative corners */}
              <div className="absolute -top-4 -right-4 w-20 h-20 border-2 border-(--color-cheese)/40 rounded-full group-hover:border-(--color-cheese)/80 transition-colors duration-500"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-(--color-ember)/30 rounded-full group-hover:border-(--color-ember)/70 transition-colors duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section>
        <div className="max-w-6xl mx-auto px-5 py-12 md:py-16 grid grid-cols-3 gap-8 text-center">
          <div className="group relative">
            <div className="absolute inset-0 bg-(--color-ember)/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <p className="font-display text-4xl md:text-5xl text-(--color-ember)">480°C</p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-(--color-smoke) mt-2">Oven floor</p>
            </div>
          </div>
          <div className="group relative">
            <div className="absolute inset-0 bg-(--color-cheese)/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <p className="font-display text-4xl md:text-5xl text-(--color-cheese)">90s</p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-(--color-smoke) mt-2">Bake time</p>
            </div>
          </div>
          <div className="group relative">
            <div className="absolute inset-0 bg-(--color-basil)/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <p className="font-display text-4xl md:text-5xl text-(--color-basil)">24h</p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-(--color-smoke) mt-2">Dough proof</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured items */}
      <section className=" bg-gradient-to-b from-(--color-char)/20 to-transparent py-20 md:py-10">
        {/* Decorative accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-(--color-ember) to-transparent"></div>
        
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-(--color-basil)">
                ✓ Off the peel
              </span>
              <h2 className="font-display text-4xl md:text-5xl mt-3">Today's picks</h2>
            </div>
            <Link to="/menu" className="font-mono text-xs uppercase tracking-widest text-(--color-ember) hover:text-(--color-cheese) transition-colors mt-4 md:mt-0">
              View all items →
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((item) => (
                <div key={item.id} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-br from-(--color-ember)/20 to-(--color-cheese)/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <MenuItemCard
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    category={item.category}
                    imageUrl={item.imageUrl}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-(--color-smoke) text-lg">
                The menu is being set up — check back soon, or visit the{" "}
                <Link to="/menu" className="text-(--color-ember) hover:text-(--color-cheese) underline font-semibold">
                  full menu
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </section>
      {/* CTA band */}
      <section className="bg-(--color-basil) text-(--color-crust)">
        <div className="max-w-6xl mx-auto px-5 py-16 text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-4">Craving one already?</h2>
          <p className="text-(--color-crust)/80 mb-8 max-w-md mx-auto">
            Create an account to save your favorite order and track it from oven to door.
          </p>
          <Link
            to="/register"
            className="inline-block px-6 py-3 rounded bg-(--color-crust) text-(--color-ink) font-mono text-sm uppercase tracking-widest hover:bg-(--color-crust-2) transition-colors"
          >
            Create an account
          </Link>
        </div>
      </section>
    </div>
  );
}
