import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import "./Navbar.css";
import LogoutButton from "../components/LogoutButton";


function Navbar() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🛍️ ShopSphere</Link>
      </div>

      <ul className="navbar-menu">
        <li>
          <NavLink to="/" className="nav-link">Home</NavLink>
        </li>
        <li>
          <NavLink to="/products" className="nav-link">Products</NavLink>
        </li>
        <li>
          <NavLink to="/about" className="nav-link">About Us</NavLink>
        </li>
        <li>
          <NavLink to="/orders" className="nav-link">My Orders</NavLink>
        </li>
      </ul>

      <div className="navbar-icons">
        {showSearch ? (
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            autoFocus
            onBlur={() => setShowSearch(false)}
          />
        ) : (
          <FaSearch
            className="icon"
            title="Search"
            onClick={() => setShowSearch(true)}
          />
        )}

        <Link to="/login">
          <FaUser className="icon" title="Login" />
        </Link>
        <Link to="/cart">
          <FaShoppingCart className="icon" title="Cart" />
        </Link>
        <LogoutButton />
      </div>
    </nav>
  );
}

export default Navbar;
