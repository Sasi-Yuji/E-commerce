// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Donation from "./pages/DonationPage.jsx";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import AboutUs from "./pages/AboutUs.jsx"; // ✅ only one import

// ✅ Admin Pages
import Dashboard from "./admin/Dashboard.jsx";
import AdminProducts from "./admin/AdminProducts.jsx";
import AdminOrders from "./admin/AdminOrders.jsx";
import AdminDonations from "./admin/AdminDonations.jsx";
import ManageUsers from "./admin/ManageUsers.jsx";

// Cart Context
import { CartProvider } from "./context/CartContext";

// Notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Wrapper
function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div>
      {!isAdminRoute && <Navbar />}

      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/donate" element={<Donation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutUs />} /> {/* About Us Page */}

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/donations" element={<AdminDonations />} />
          <Route path="/admin/users" element={<ManageUsers />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

export default App;
