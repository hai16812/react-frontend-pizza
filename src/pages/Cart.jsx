import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Cart() {
  const { cart, cartTotal, updateCartItemQuantity, removeFromCart } = useCart();

  return (
    <div>
      <section className="bg-(--color-char) text-(--color-crust) py-20">
        <div className="max-w-4xl mx-auto px-5">
          <h1 className="font-display text-4xl md:text-5xl">Your Cart</h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 py-16">
        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-(--color-smoke) mb-6">Your cart is empty.</p>
            <Link
              to="/menu"
              className="px-6 py-3 rounded bg-(--color-ember) hover:bg-(--color-ember-2) text-(--color-crust) transition-colors font-mono text-sm uppercase tracking-widest"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {cart.map((item) => (
              <div key={item.cartItemId} className="flex gap-6 items-center border-b border-(--color-ink)/10 pb-6">
                <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-1">
                  <h2 className="font-display text-xl">{item.name}</h2>
                  <p className="text-sm text-(--color-smoke)">Size: {item.size}</p>
                  <p className="font-mono text-lg mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateCartItemQuantity(item.cartItemId, Number(e.target.value))}
                    className="w-16 rounded border border-(--color-ink)/15 px-3 py-2 text-sm text-center"
                  />
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-(--color-smoke) hover:text-(--color-ember) transition-colors"
                    aria-label={`Remove ${item.name}`}
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
            <div className="text-right">
              <p className="font-display text-2xl">
                Total: <span className="font-bold">${cartTotal.toFixed(2)}</span>
              </p>
              <Link
                to="/checkout"
                className="mt-6 inline-block w-full md:w-auto px-8 py-4 rounded-lg bg-gradient-to-r from-(--color-ember) to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 font-mono text-sm uppercase tracking-widest shadow-lg hover:shadow-2xl text-(--color-crust) text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}