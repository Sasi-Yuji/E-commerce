import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";
import { FaHeart, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer py-1 mt-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side */}
          <div className="col-md-5 text-center text-md-start mb-3 mb-md-0">
            <h5 className="fw-bold footer-title">🛍️ShopSphere</h5>
            <p className="small mb-1">
              Buy 1. Give 1. Together, we make a difference{" "}
              <FaHeart className="footer-heart" />
            </p>
          </div>

          {/* Right Side */}
          <div className="col-md-6 text-center text-md-end">
            <a href="#" className="footer-link mx-2">
              About Us
            </a>
            <a href="#" className="footer-link mx-2">
              Contact
            </a>
            <a href="#" className="footer-link mx-2">
              Privacy
            </a>
            <div className="social-icons mt-2 mt-md-0">
              <a href="#" className="social-link mx-1">
                <FaFacebook />
              </a>
              <a href="#" className="social-link mx-1">
                <FaTwitter />
              </a>
              <a href="#" className="social-link mx-1">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Center Copyright */}
        <div className="footer-bottom text-center mt-3">
          <p className="small mb-0 text-light">
            © {new Date().getFullYear()} ShopSphere. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
