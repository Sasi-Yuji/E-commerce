import "./Home.css";
import heroImg from "../assets/hero1.png";
import {
  FaLock,
  FaUndo,
  FaHandHoldingHeart,
  FaTruck,
  FaShoppingBag,
  FaGift,
  FaSmile,
} from "react-icons/fa";

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Buy 1 <br /> Give 1
          </h1>
          <p>
            Give to those in need — your item could <br />
            positively impact someone's life.
          </p>
          <div className="hero-features">
            <span>✔ Top Brands</span>
            <span>✔ High Quality</span>
            <span>✔ Free Delivery</span>
          </div>
          <button className="hero-btn">SHOP NOW</button>
        </div>

        {/* ⭐ Central Circular Badge */}
        <div className="hero-badge-circle">
          <FaHandHoldingHeart size={32} color="#fff" />
          <div>
            You Shop, <br /> We Give!
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="Hero" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature">
          <FaLock className="feature-icon" />
          <h4>Secure Payment</h4>
          <p>100% safe</p>
        </div>
        <div className="feature">
          <FaUndo className="feature-icon" />
          <h4>30 Days Return</h4>
          <p>Easy refunds</p>
        </div>
        <div className="feature">
          <FaHandHoldingHeart className="feature-icon" />
          <h4>Donation</h4>
          <p>Charity support</p>
        </div>
        <div className="feature">
          <FaTruck className="feature-icon" />
          <h4>Free Delivery</h4>
          <p>Over $80</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <p className="subtitle">A simple process to make giving effortless</p>
        <div className="steps">
          <div className="step-card">
            <div className="step-icon">
              <FaShoppingBag />
            </div>
            <h3>Shop</h3>
            <p>Choose your favorite items from our wide collection.</p>
          </div>
          <div className="step-card">
            <div className="step-icon">
              <FaGift />
            </div>
            <h3>We Donate</h3>
            <p>
              For every purchase, you can also donate an item to someone in
              need.
            </p>
          </div>
          <div className="step-card">
            <div className="step-icon">
              <FaSmile />
            </div>
            <h3>Make Impact</h3>
            <p>Your purchase spreads joy and changes lives.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
