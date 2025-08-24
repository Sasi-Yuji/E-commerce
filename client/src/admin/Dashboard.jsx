import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch("http://localhost:5000/api/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch stats");

        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setStats({
          totalUsers: 0,
          totalProducts: 0,
          totalOrders: 0,
          totalRevenue: 0,
          totalDonations: 0,
        });
      }
    };

    fetchStats();
  }, [navigate]);

  return (
    <div className="admin-dashboard d-flex">
      {/* Sidebar */}
      <aside className="sidebar bg-dark text-white p-3">
        <h2 className="h4 mb-4 text-center">Admin Panel</h2>
        <nav className="nav flex-column">
          <Link to="/admin/dashboard" className="nav-link text-white">
            📊 Dashboard
          </Link>
          <Link to="/admin/products" className="nav-link text-white">
            🛒 Products
          </Link>
          <Link to="/admin/orders" className="nav-link text-white">
            📦 Orders
          </Link>
          <Link to="/admin/users" className="nav-link text-white">
            👥 Users
          </Link>
          <Link to="/admin/donations" className="nav-link text-white">
            ❤️ Donations
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content flex-grow-1">
        <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">
          <h1 className="h3 mb-0">Dashboard</h1>
          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </header>

        {/* Stats Cards */}
        <main className="p-4">
          <div className="row g-4">
            <div className="col-md-2">
              <div className="card shadow-sm stat-card">
                <div className="card-body text-center">
                  <h5 className="card-title">Users</h5>
                  <p className="display-6 fw-bold">
                    {stats ? stats.totalUsers : "Loading..."}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="card shadow-sm stat-card">
                <div className="card-body text-center">
                  <h5 className="card-title">Products</h5>
                  <p className="display-6 fw-bold">
                    {stats ? stats.totalProducts : "Loading..."}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="card shadow-sm stat-card">
                <div className="card-body text-center">
                  <h5 className="card-title">Orders</h5>
                  <p className="display-6 fw-bold">
                    {stats ? stats.totalOrders : "Loading..."}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="card shadow-sm stat-card">
                <div className="card-body text-center">
                  <h5 className="card-title">Donations</h5>
                  <p className="display-6 fw-bold">
                    {stats ? stats.totalDonations : "Loading..."}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm stat-card bg-success text-white">
                <div className="card-body text-center">
                  <h5 className="card-title">Revenue</h5>
                  <p className="display-6 fw-bold">
                    {stats
                      ? `₹${stats.totalRevenue.toLocaleString()}`
                      : "Loading..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
