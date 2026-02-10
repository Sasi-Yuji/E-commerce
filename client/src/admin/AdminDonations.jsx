import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const token = localStorage.getItem("token");

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/donations", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch donations");

      const data = await res.json();
      setDonations(Array.isArray(data) ? data : data.donations || []);
    } catch (err) {
      console.error(" Fetch donations error:", err);
      toast.error("Failed to load donations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`http://localhost:5000/api/donations/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      toast.success("Donation status updated");

      setDonations((prev) =>
        prev.map((d) => (d._id === id ? { ...d, status } : d))
      );
    } catch (err) {
      console.error(" Update donation status error:", err);
      toast.error("Could not update status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">❤️ Donations (Admin)</h2>
        <button className="btn btn-outline-secondary btn-sm" onClick={fetchDonations}>
          Refresh
        </button>
      </div>

      {loading ? (
        <p>Loading donations...</p>
      ) : donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Donor</th>
                <th>Item Type</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Condition</th>
                <th>Donation Type</th>
                <th>Order Info</th>
                <th>Status</th>
                <th>Placed</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d._id}>
                  <td>
                    {d.user?.name || "Anonymous"}
                    <br />
                    <small className="text-muted">{d.user?.email}</small>
                  </td>
                  <td>{d.itemType || "-"}</td>
                  <td style={{ maxWidth: 280 }}>{d.description || "-"}</td>
                  <td>{d.quantity ?? "-"}</td>
                  <td>{d.condition || "-"}</td>
                  <td>{d.donationType || "-"}</td>

                  <td>
                    {d.order ? (
                      <div>
                        <strong>${d.order.totalAmount}</strong> <br />
                        <small className="text-muted">{d.order.status}</small>
                        {d.order.products?.length > 0 && (
                          <ul className="mb-0 small text-muted">
                            {d.order.products.map((p) => (
                              <li key={p._id}>
                                {p.product?.name} × {p.quantity}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={d.status || "pending"}
                      disabled={updatingId === d._id}
                      onChange={(e) => handleStatusChange(d._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="in-transit">In Transit</option>
                      <option value="received">Received</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>

                  <td>{new Date(d.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDonations;
