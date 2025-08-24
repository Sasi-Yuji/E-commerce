import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import registerImg from "../assets/register.png";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Auto-clear form fields when page/component loads
  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      // Save token (optional)
      localStorage.setItem("token", data.token);

      // Clear form after successful registration
      setName("");
      setEmail("");
      setPassword("");

      // Redirect to login
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      {/* Left Side Image */}
      <div className="register-image">
        <img src={registerImg} alt="Register Illustration" />
      </div>

      {/* Right Side Form */}
      <div className="register-form-wrapper">
        <div className="register-form">
          <h1 className="brand">
            <span className="brand-icon">🛍️</span> Buy 1 Give 1
          </h1>
          <h2 className="form-title">Register</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="form-btn" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
