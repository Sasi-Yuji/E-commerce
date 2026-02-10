import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import DonationModal from "../components/DonationModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Checkout.css";

function Checkout() {
  const { cartItems, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [showDonationModal, setShowDonationModal] = useState(false);

  const subtotal = getTotal();
  const shipping = subtotal > 3000 ? 0 : 150;
  const taxes = Math.round(subtotal * 0.1);
  const total = subtotal + shipping + taxes;

  const handlePurchase = async (donationData = null) => {
    if (cartItems.length === 0) {
      toast.error("No items in cart!");
      return;
    }

    const orderPayload = {
      products: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
      totalAmount: total,
      donation: donationData,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to place an order.");
        return;
      }

      const resOrder = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      if (!resOrder.ok) throw new Error("Failed to place order");

      toast.success("Order placed successfully!");
      clearCart();
      navigate("/orders");
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="cart-section">
          <h3 className="checkout-title">🛒 Checkout</h3>
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item._id} className="cart-item">
                  <div className="cart-item-info">
                    <img
                      src={`http://localhost:5000${item.image}`}
                      alt={item.name}
                      className="cart-item-img"
                    />
                    <div>
                      <p className="item-name">{item.name}</p>
                      <p className="item-qty">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="item-price">
                    ₹{item.price * item.quantity}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="summary-section">
          <h4 className="summary-title">Order Summary</h4>
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>
            <div className="summary-row">
              <span>Taxes (10%):</span>
              <span>₹{taxes}</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Total:</span>
              <span className="total-amount">₹{total}</span>
            </div>
            <button
              onClick={() => setShowDonationModal(true)}
              className="btn-payment"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>


      <DonationModal
        show={showDonationModal}
        onClose={() => setShowDonationModal(false)}
        onProceed={(donate, donationData) => {
          if (donate && donationData) {
            handlePurchase(donationData);
          } else {
            handlePurchase(null);
          }
        }}
      />
    </div>
  );
}

export default Checkout;
