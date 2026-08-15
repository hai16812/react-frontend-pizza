import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  useEffect(() => {
    if (!order) {
      navigate("/");
    }
  }, [order, navigate]);

  if (!order) {
    return null; // or a loading indicator
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-16 text-center">
      <h1 className="font-display text-4xl md:text-5xl text-(--color-basil) mb-4">Thank You!</h1>
      <p className="text-lg text-(--color-smoke) mb-2">Your order has been placed successfully.</p>
      <p className="font-mono text-sm text-(--color-smoke) mb-8">
        Order ID: <strong>{order.orderId}</strong>
      </p>
      <p className="text-(--color-smoke) mb-8">
        We've received your order and will start preparing it right away. A confirmation has been sent to <strong>{order.customer.email}</strong>.
      </p>
      <Link
        to="/menu"
        className="inline-block px-8 py-3 rounded bg-(--color-ember) hover:bg-(--color-ember-2) text-(--color-crust) transition-colors font-mono text-sm uppercase tracking-widest"
      >
        Continue Shopping
      </Link>
    </div>
  );
}