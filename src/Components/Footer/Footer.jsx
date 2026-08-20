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
            <a href="#" aria-label="Twitter">X</a>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="GitHub">GH</a>
          </div>
        </div>

        {/* Company */}
        <div className="footer-column">
          <h3>COMPANY</h3>
          <a href="#">About</a>
          <a href="#">Features</a>
          <a href="#">Works</a>
          <a href="#">Career</a>
        </div>

        {/* Help */}
        <div className="footer-column">
          <h3>HELP</h3>
          <a href="#">Customer Support</a>
          <a href="#">Delivery Details</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>

        {/* FAQ */}
        <div className="footer-column">
          <h3>FAQ</h3>
          <a href="#">Account</a>
          <a href="#">Manage Deliveries</a>
          <a href="#">Orders</a>
          <a href="#">Payments</a>
        </div>

        {/* Resources */}
        <div className="footer-column">
          <h3>RESOURCES</h3>
          <a href="#">Free eBooks</a>
          <a href="#">Development Tutorial</a>
          <a href="#">How-to Blog</a>
          <a href="#">YouTube Playlist</a>
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