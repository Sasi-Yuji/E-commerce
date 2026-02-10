import React from "react";
import "./AboutUS.css";

function AboutUs() {
  return (
    <div className="about-page">
      <header className="about-header">
        <div className="container">
          <h1 className="logo">ShopSphere</h1>
          <nav className="header-nav">
            <a href="#">Home</a>
            <a href="#">Products</a>
            <a href="#">About Us</a>
            <a href="#">My Orders</a>
          </nav>
        </div>
      </header>

      <section className="about-hero">
        <div className="container">
          <h2>About Us</h2>
          <p>Discover our story, mission, and the values that drive us</p>
        </div>
      </section>

      <div className="container">
        <div className="glass-card hero-card p-4 mb-5">
          <p>
            Welcome to <strong>ShopSphere</strong>! We are passionate about providing
            high-quality vintage and classic products that are still useful today.
            Our mission is to combine innovation with sustainability, creating value
            for our community and environment.
          </p>
          <p>
            Founded in 2023, we've grown from a small idea into a platform that serves
            thousands of happy users. We believe in transparency, customer-first approach,
            and continuous improvement.
          </p>
        </div>
      </div>

      <section className="about-section vintage-section">
        <div className="container">
          <div className="content-wrapper">
            <div className="text-content">
              <h3>Vintage Treasures</h3>
              <p>
                Discover timeless classics that are still functional today. Our
                collection showcases the enduring charm and quality of vintage items
                that have stood the test of time.
              </p>
              <p>
                Each piece in our collection tells a story of craftsmanship and attention
                to detail that is rarely found in modern mass-produced items.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section b1g1-section">
        <div className="container">
          <div className="content-wrapper">
            <div className="text-content">
              <h4>BUY 1 GIVE 1</h4>
              <h3>MAKE A DIFFERENCE</h3>
              <p>
                When you make a purchase, we donate a product to those in need.
                Together, we can create a positive impact and give back to our community.
              </p>
              <p>
                Since starting this program, we've donated over 25,000 items to communities
                in need across the country.
              </p>
              <a href="#" className="cta-button">LEARN MORE</a>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="contact-cta mt-5 text-center">
          <p>Want to collaborate with us or know more?</p>
          <a href="/contact" className="cta-button">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
