import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Payment() {
  const { cart, customerInfo, paymentMethod, setPaymentMethod } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/menu");
    } else if (!customerInfo.name) {
      navigate("/checkout");
    }
  }, [cart, customerInfo, navigate]);

  function handleContinue(e) {
    e.preventDefault();
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    navigate("/review");
  }

  return (
    <div>
      <section className="bg-(--color-char) text-(--color-crust) py-20">
        <div className="max-w-4xl mx-auto px-5">
          <h1 className="font-display text-4xl md:text-5xl">Payment</h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 py-16">
        <div className="max-w-md mx-auto">
          <h2 className="font-display text-2xl mb-4">Payment Method</h2>
          <form onSubmit={handleContinue} className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 border border-(--color-ink)/15 rounded has-[:checked]:bg-(--color-cheese)/20 has-[:checked]:border-(--color-cheese)">
                <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} className="accent-(--color-ember)" />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-(--color-ink)/15 rounded has-[:checked]:bg-(--color-cheese)/20 has-[:checked]:border-(--color-cheese)">
                <input type="radio" name="payment" value="credit" checked={paymentMethod === 'credit'} onChange={(e) => setPaymentMethod(e.target.value)} className="accent-(--color-ember)" />
                <span>Credit Card (Simulated)</span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3 rounded-lg bg-(--color-ember) hover:bg-(--color-ember-2) transition-colors font-mono text-sm uppercase tracking-widest text-(--color-crust) text-center"
            >
              Continue to Review
            </button>
            <Link to="/checkout" className="block text-center text-sm text-(--color-smoke) hover:text-(--color-ink) mt-2">
              &larr; Back to Information
            </Link>
          </form>
        </div>
      </section>
    </div>
  );
}
