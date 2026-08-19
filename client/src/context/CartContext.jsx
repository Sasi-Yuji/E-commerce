import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const savedUser = JSON.parse(localStorage.getItem("user") || "null");

  const initialCart = (() => {
    if (savedUser?._id) {
      const savedCart = localStorage.getItem(`cart_${savedUser._id}`);
      return savedCart ? JSON.parse(savedCart) : [];
    } else {
      const guestCart = localStorage.getItem("guest_cart");
      return guestCart ? JSON.parse(guestCart) : [];
    }
  })();

  const [user, setUser] = useState(savedUser);
  const [cartItems, setCartItems] = useState(initialCart);

  const getStorageKey = (u = user) =>
    u?._id ? `cart_${u._id}` : "guest_cart";

  useEffect(() => {
    localStorage.setItem(getStorageKey(), JSON.stringify(cartItems));
  }, [cartItems, user]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p._id === product._id);
      if (existing) {
        return prev.map((p) =>
          p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((p) => p._id !== id));
  };

  const updateQuantity = (id, qty) => {
    setCartItems((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, quantity: Math.max(1, qty) } : p
      )
    );
  };

  const getTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(getStorageKey());
  };

  const setUserContext = (userObj) => {
    if (userObj && userObj._id) {
      localStorage.setItem("user", JSON.stringify(userObj));

      const guestCart = localStorage.getItem("guest_cart");
      if (guestCart) {
        localStorage.setItem(`cart_${userObj._id}`, guestCart);
        localStorage.removeItem("guest_cart");
      }

      const savedCart = localStorage.getItem(`cart_${userObj._id}`);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    } else {
      localStorage.removeItem("user");
      const guestCart = localStorage.getItem("guest_cart");
      setCartItems(guestCart ? JSON.parse(guestCart) : []);
    }

    setUser(userObj);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotal,
        clearCart,
        user,
        setUserContext,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
