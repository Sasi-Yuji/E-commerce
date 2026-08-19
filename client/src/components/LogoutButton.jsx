import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";  

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");

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
