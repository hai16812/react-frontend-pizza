import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Review() {
  const { cart, cartTotal, customerInfo, paymentMethod, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/menu");
    } else if (!customerInfo.name) {
      navigate("/checkout");
    } else if (!paymentMethod) {
      navigate("/payment");
    }
  }, [cart, customerInfo, paymentMethod, navigate]);

  function handlePlaceOrder(e) {
    e.preventDefault();
    const orderDetails = {
      orderId: `PIZZA-${Date.now()}`,
      customer: customerInfo,
      items: cart,
      total: cartTotal,
      paymentMethod,
    };

    console.log("Placing order:", orderDetails);
    clearCart();
    navigate("/order-confirmation", { state: { order: orderDetails } });
  }

  return (
    <div>
      <section className="bg-(--color-char) text-(--color-crust) py-20">
        <div className="max-w-4xl mx-auto px-5">
          <h1 className="font-display text-4xl md:text-5xl">Review Your Order</h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Customer & Payment Details */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl mb-4">Shipping To</h2>
              <div className="text-(--color-smoke) space-y-1">
                <p>{customerInfo.name}</p>
                <p>{customerInfo.email}</p>
                <p>{customerInfo.address}</p>
              </div>
              <Link to="/checkout" className="text-sm text-(--color-ember) hover:underline mt-2 inline-block">Edit</Link>
            </div>
            <div>
              <h2 className="font-display text-2xl mb-4">Payment Method</h2>
              <p className="text-(--color-smoke) capitalize">{paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit Card'}</p>
              <Link to="/payment" className="text-sm text-(--color-ember) hover:underline mt-2 inline-block">Edit</Link>
            </div>
          </div>

          {/* Order Summary & Place Order */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <h2 className="font-display text-2xl mb-6 border-b border-(--color-ink)/10 pb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.cartItemId} className="flex justify-between items-center text-sm">
                  <div>
                    <p className="font-bold">{item.name} <span className="text-(--color-smoke)">x {item.quantity}</span></p>
                    <p className="text-xs text-(--color-smoke)">Size: {item.size}</p>
                  </div>
                  <p className="font-mono">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-(--color-ink)/10 pt-4 space-y-2">
              <div className="flex justify-between font-mono text-lg">
                <span>Total</span>
                <span className="font-bold">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="mt-8 w-full px-8 py-4 rounded-lg bg-gradient-to-r from-(--color-ember) to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 font-mono text-sm uppercase tracking-widest shadow-lg hover:shadow-2xl text-(--color-crust) text-center"
            >
              Place Order
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
