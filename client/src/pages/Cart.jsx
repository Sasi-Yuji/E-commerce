import React from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const getImageUrl = (image) => {
    if (!image) return "/placeholder.png"; 
    if (image.startsWith("http")) return image; 

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const cleanPath = image.startsWith("/") ? image.substring(1) : image;

    return `${apiUrl}/${cleanPath}`;
  };

  const getTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
  if (cartItems.length === 0) {
    toast.warning("Your cart is empty!");
    return;
  }

  toast.success(" Order placed successfully! Proceeding to checkout...", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  setTimeout(() => {
    window.location.href = "/checkout";
  }, 3000); 
};


  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2 className="cart-title">🛒 Your Vintage Basket</h2>

        {cartItems.length === 0 ? (
          <p className="empty-text">
            Nothing here yet... time to go treasure hunting!
          </p>
        ) : (
          <>
            <ul className="cart-list">
              {cartItems.map((item) => (
                <li className="cart-item" key={item._id}>
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-details">
                    <h5 className="cart-item-name">{item.name}</h5>
                    <p className="cart-item-price">₹{item.price}</p>
                    <div className="cart-item-actions">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item._id, parseInt(e.target.value))
                        }
                        className="qty-input"
                      />
                      <button
                        className="retro-remove-btn"
                        onClick={() => removeFromCart(item._id)}
                      >
                        ❌ Cast Away
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-total">
                    ₹{item.price * item.quantity}
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-summary">
              <h4 className="cart-total">Grand Tally: ₹{getTotal()}</h4>
              <button className="retro-checkout-btn" onClick={handleCheckout}>
                Seal the Deal
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
