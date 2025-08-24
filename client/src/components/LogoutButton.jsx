import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";  // ✅ reuse same CSS for icons

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user and cart data
    localStorage.removeItem("user");
    localStorage.removeItem("cart");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <FaSignOutAlt
      className="icon"
      title="Logout"
      onClick={handleLogout}
      style={{ cursor: "pointer" }}
    />
  );
}

export default LogoutButton;
