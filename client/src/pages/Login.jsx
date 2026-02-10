import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; 
import "./Login.css";
import loginImg from "../assets/login.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUserContext } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);

      if (data.user) {
        setUserContext(data.user);
      }

      if (data.redirect) {
        navigate(data.redirect);
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>
          Shop with purpose. <br />
          Every purchase makes an impact.
        </h1>
        <p>Buy 1 for yourself, Give 1 to someone in need.</p>
        <img
          src={loginImg}
          alt="Login Illustration"
          className="login-illustration"
        />
      </div>

      <div className="login-right">
        <div className="login-box">
          <h2 className="brand-title">
            <span className="icon">🔒</span> Buy 1 Give 1
          </h2>
          <h3 className="welcome">Welcome Back</h3>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="forgot">
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login & Shop"}
            </button>
          </form>

          <div className="divider">
            <span>Or Login with</span>
          </div>

          <div className="social-login">
            <button className="google">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                width="20"
                height="20"
                alt="Google"
              />
              Google
            </button>

            <button className="facebook">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
                width="20"
                height="20"
                alt="Facebook"
              />
              Facebook
            </button>
          </div>

          <p className="register-text">
            Don’t have an account? <a href="/register">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
