import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

function getInitialState(key, defaultValue) {
  try {
    const localData = window.localStorage.getItem(key);
    return localData ? JSON.parse(localData) : defaultValue;
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage`, error);
    return defaultValue;
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => getInitialState("pizzaCart", []));
  const [customerInfo, setCustomerInfo] = useState(() => getInitialState("pizzaCustomer", {}));
  const [paymentMethod, setPaymentMethod] = useState(() => getInitialState("pizzaPayment", ""));

  useEffect(() => {
    try {
      window.localStorage.setItem("pizzaCart", JSON.stringify(cart));
      window.localStorage.setItem("pizzaCustomer", JSON.stringify(customerInfo));
      window.localStorage.setItem("pizzaPayment", JSON.stringify(paymentMethod));
    } catch (error) {
      console.error("Error saving cart to localStorage", error);
    }
  }, [cart, customerInfo, paymentMethod]);

  function addToCart(item, size, quantity) {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.size === size
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { ...item, size, quantity, cartItemId: `${item.id}-${size}` }];
      }
    });
  }

  function updateCartItemQuantity(cartItemId, newQuantity) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      ).filter(item => item.quantity > 0)
    );
  }

  function removeFromCart(cartItemId) {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  }

  function clearCart() {
    setCart([]);
    setCustomerInfo({});
    setPaymentMethod("");
  }

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cart,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    customerInfo,
    setCustomerInfo,
    paymentMethod,
    setPaymentMethod,
    clearCart,
    cartTotal,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}