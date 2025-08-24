import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/orders/myorders", {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="loading-text">Loading your orders...</p>;

  return (
    <div className="orders-unique container py-5">
      <h2 className="orders-title">My Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No orders placed yet.</p>
      ) : (
        <div className="timeline">
          {orders.map((order) => (
            <div key={order._id} className="timeline-item">
              <div className="timeline-icon">
                {order.status === "Confirmed" ? (
                  <FaCheckCircle className="text-success" />
                ) : (
                  <FaClock className="text-warning" />
                )}
              </div>

              <div className="timeline-content glass-card">
                <div
                  className="order-header"
                  onClick={() =>
                    setExpandedOrder(expandedOrder === order._id ? null : order._id)
                  }
                >
                  <div>
                    <h5>Order #{order._id.slice(-6)}</h5>
                    <p>{new Date(order.createdAt).toLocaleString()}</p>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <h5 className="order-price">₹{order.totalAmount}</h5>
                </div>

                {expandedOrder === order._id && (
                  <div className="order-products">
                    {order.products.map((p) => {
                      // Build correct image URL
                      let imgSrc = "https://via.placeholder.com/60";
                      if (p.product?.image) {
                        if (p.product.image.startsWith("http")) {
                          imgSrc = p.product.image;
                        } else {
                          // Remove any leading slash and ensure single /uploads/
                          const filename = p.product.image.replace(/^\/+uploads\//, "");
                          imgSrc = `http://localhost:5000/uploads/${filename}`;
                        }
                      }

                      return (
                        <div key={p._id} className="product-item">
                          <img
                            src={imgSrc}
                            alt={p.product?.name || "Product"}
                            width="60"
                            height="60"
                            style={{ objectFit: "cover", borderRadius: "8px" }}
                            onError={(e) => (e.target.src = "https://via.placeholder.com/60")}
                          />
                          <div>
                            <p>{p.product?.name || "Product"}</p>
                            <small>Qty: {p.quantity}</small>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
