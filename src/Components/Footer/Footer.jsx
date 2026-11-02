import { Link } from "react-router-dom";
import "./Footer.css";

import visa from "../../assets/visa.png";
import paypal from "../../assets/paypal.png";
import gpay from "../../assets/gpay.png";
import applepay from "../../assets/applepay.png";
import mastercard from "../../assets/mastercard.png";

const Footer = () => {
  return (
    <footer className="footer">
      {/* ================= MAIN FOOTER ================= */}
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <h2>SHOP.CO</h2>

          <p>
            We have clothes that suits your style and which you're proud to
            wear. From women to men.
          </p>

          <div className="social-icons">
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="Twitter">X</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">GH</a>
          </div>
        </div>

        {/* Company */}
        <div className="footer-column">
          <h3>COMPANY</h3>
          <Link to="/about">About</Link>
          <Link to="/features">Features</Link>
          <Link to="/works">Works</Link>
          <Link to="/career">Career</Link>
        </div>

        {/* Help */}
        <div className="footer-column">
          <h3>HELP</h3>
          <Link to="/customer-support">Customer Support</Link>
          <Link to="/delivery-details">Delivery Details</Link>
          <Link to="/terms">Terms &amp; Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>

        {/* FAQ */}
        <div className="footer-column">
          <h3>FAQ</h3>
          <Link to="/account">Account</Link>
          <Link to="/manage-deliveries">Manage Deliveries</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/payments">Payments</Link>
        </div>

        {/* Resources */}
        <div className="footer-column">
          <h3>RESOURCES</h3>
          <Link to="/free-ebooks">Free eBooks</Link>
          <Link to="/development-tutorial">Development Tutorial</Link>
          <Link to="/how-to-blog">How-to Blog</Link>
          <Link to="/youtube-playlist">YouTube Playlist</Link>
        </div>
      </div>

      {/* ================= FOOTER BOTTOM ================= */}
      <div className="footer-bottom">
        <p>Shop.co © 2000-2026, All Rights Reserved</p>

        <div className="payment-methods">
          <div className="payment-card">
            <img src={visa} alt="Visa" />
          </div>
          <div className="payment-card">
            <img src={paypal} alt="PayPal" />
          </div>
          <div className="payment-card">
            <img src={gpay} alt="Google Pay" />
          </div>
          <div className="payment-card">
            <img src={applepay} alt="Apple Pay" />
          </div>
          <div className="payment-card">
            <img src={mastercard} alt="Mastercard" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;