import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFoodItem } from "../firebase/firestoreApi";
import { useCart } from "../contexts/CartContext";

export default function FoodItem() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [size, setSize] = useState("Medium");
  const [quantity, setQuantity] = useState(1);

  function handleAddToCart() {
    addToCart(item, size, quantity);
  }

  useEffect(() => {
    getFoodItem(id)
      .then((data) => {
        if (data) {
          setItem(data);
        } else {
          setError("Pizza not found!");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch pizza details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-center py-10">Loading pizza...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-(--color-ember)">{error}</p>;
  }

  if (!item) {
    return <p className="text-center py-10">No pizza data available.</p>;
  }

  return (
    <div>
      <section className="bg-(--color-char) text-(--color-crust) py-20">
        <div className="max-w-4xl mx-auto px-5">
          <span className="font-mono text-xs uppercase tracking-widest text-(--color-cheese)">
            {item.category || "Pizza"}
          </span>
          <h1 className="font-display text-4xl md:text-5xl mt-3">{item.name}</h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 py-16 grid md:grid-cols-2 gap-12 items-start">
        <div>
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full rounded-lg shadow-lg border-4 border-white"
          />
          <p className="text-sm text-(--color-smoke) mt-4">{item.description}</p>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="font-display text-2xl mb-2">Choose Size</h2>
            <div className="flex gap-2">
              {["Small", "Medium", "Large"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`font-mono text-sm uppercase tracking-widest px-4 py-2 rounded border transition-colors ${
                    size === s
                      ? "bg-(--color-ember) border-(--color-ember) text-(--color-crust)"
                      : "border-(--color-ink)/15 text-(--color-smoke) hover:border-(--color-ember)"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl mb-2">Quantity</h2>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-24 rounded border border-(--color-ink)/15 px-3 py-2 text-sm text-center"
            />
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full px-5 py-3 rounded-md bg-(--color-ember) hover:bg-(--color-ember-2) disabled:opacity-60 transition-colors font-mono text-sm uppercase tracking-widest text-(--color-crust) shadow-md hover:shadow-lg"
          >
            Add to Cart
          </button>
        </div>
      </section>
    </div>
  );
}