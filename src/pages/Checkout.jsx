import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

export default function Checkout() {
  const { currentUser } = useAuth();
  const { cart, customerInfo, setCustomerInfo } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState(customerInfo.name || currentUser?.displayName || "");
  const [email, setEmail] = useState(customerInfo.email || currentUser?.email || "");
  const [address, setAddress] = useState(customerInfo.address || "");

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/menu");
    }
  }, [cart, navigate]);

  function handleContinue(e) {
    e.preventDefault();
    if (!name || !email || !address) {
      alert("Please fill in all customer information fields.");
      return;
    }
    setCustomerInfo({ name, email, address });
    navigate("/payment");
  }

  return (
    <div>
      <section className="bg-(--color-char) text-(--color-crust) py-20">
        <div className="max-w-4xl mx-auto px-5">
          <h1 className="font-display text-4xl md:text-5xl">Checkout</h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 py-16">
        <div className="max-w-md mx-auto">
          <h2 className="font-display text-2xl mb-4">Customer Information</h2>
          <form onSubmit={handleContinue} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-mono text-xs uppercase tracking-widest text-(--color-smoke) mb-1">Full Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded border border-(--color-ink)/15 bg-white px-3 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest text-(--color-smoke) mb-1">Email Address</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded border border-(--color-ink)/15 bg-white px-3 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="address" className="block font-mono text-xs uppercase tracking-widest text-(--color-smoke) mb-1">Shipping Address</label>
              <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} required rows={3} className="w-full rounded border border-(--color-ink)/15 bg-white px-3 py-2 text-sm" />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3 rounded-lg bg-(--color-ember) hover:bg-(--color-ember-2) transition-colors font-mono text-sm uppercase tracking-widest text-(--color-crust) text-center"
            >
              Continue to Payment
            </button>
            <Link to="/cart" className="block text-center text-sm text-(--color-smoke) hover:text-(--color-ink) mt-2">
              &larr; Back to Cart
            </Link>
          </form>
        </div>
      </section>
    </div>
  );
}