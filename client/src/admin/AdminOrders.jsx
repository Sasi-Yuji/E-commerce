import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/orders", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();

        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(" Fetch orders error:", err);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📦 Orders Management</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Order ID</th>
                <th className="border px-4 py-2">Items</th>
                <th className="border px-4 py-2">Total</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="text-center">
                  <td className="border px-4 py-2">{order._id}</td>
                  <td className="border px-4 py-2">
                    {order.products?.map((p, idx) => (
                      <div key={idx}>
                        {p.product?.name || "Unknown"} x {p.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="border px-4 py-2">₹{order.totalAmount}</td>
                  <td className="border px-4 py-2">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2 text-green-600 font-semibold">
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
