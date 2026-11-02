import { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

import visa from "../../assets/visa.png";
import paypal from "../../assets/paypal.png";
import gpay from "../../assets/gpay.png";
import applepay from "../../assets/applepay.png";
import mastercard from "../../assets/mastercard.png";

const infoContent = {
  about: {
    title: "About Shop.co",
    content: "Shop.co is a global modern fashion destination offering curated streetwear, everyday casuals, formal tailoring, and gym wear designed with premium materials.",
  },
  features: {
    title: "Platform Features",
    content: "Enjoy dynamic sizing guides, real-time order tracking, responsive wishlist saving, coupon discounts, verified buyer reviews, and 24/7 dedicated support.",
  },
  works: {
    title: "How It Works",
    content: "1. Browse our extensive collections.\n2. Choose your preferred size and color.\n3. Add to cart & checkout with Cash on Delivery or Card.\n4. Track your package straight to your doorstep.",
  },
  career: {
    title: "Careers at Shop.co",
    content: "We're constantly looking for talented fashion designers, full-stack engineers, and merchandisers. Send your portfolio to careers@shop.co.",
  },
  support: {
    title: "Customer Support",
    content: "Need help with sizing, order modifications, or returns? Reach our team at support@shop.co or call +92 (300) 123-4567 Monday to Saturday (9am - 8pm).",
  },
  delivery: {
    title: "Delivery & Shipping Details",
    content: "• Standard Shipping (2-4 business days): $15\n• Free shipping on orders over $250 with code FREESHIP\n• Real-time parcel tracking provided on your Orders page.",
  },
  terms: {
    title: "Terms & Conditions",
    content: "All purchases are protected under our standard customer guarantee. Returns and exchanges are accepted within 30 days of delivery on unworn merchandise.",
  },
  privacy: {
    title: "Privacy Policy",
    content: "Your privacy is paramount. We encrypt payment transactions, adhere to strict data security standards, and never sell your personal information.",
  },
};

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openInfo = (key) => {
    setActiveModal(infoContent[key] || { title: "Information", content: "Details coming soon." });
  };

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
          <span onClick={() => openInfo("about")} style={{ cursor: "pointer" }}>About</span>
          <span onClick={() => openInfo("features")} style={{ cursor: "pointer" }}>Features</span>
          <span onClick={() => openInfo("works")} style={{ cursor: "pointer" }}>Works</span>
          <span onClick={() => openInfo("career")} style={{ cursor: "pointer" }}>Career</span>
        </div>

        {/* Help */}
        <div className="footer-column">
          <h3>HELP</h3>
          <span onClick={() => openInfo("support")} style={{ cursor: "pointer" }}>Customer Support</span>
          <span onClick={() => openInfo("delivery")} style={{ cursor: "pointer" }}>Delivery Details</span>
          <span onClick={() => openInfo("terms")} style={{ cursor: "pointer" }}>Terms &amp; Conditions</span>
          <span onClick={() => openInfo("privacy")} style={{ cursor: "pointer" }}>Privacy Policy</span>
        </div>

        {/* FAQ */}
        <div className="footer-column">
          <h3>FAQ</h3>
          <Link to="/profile">Account</Link>
          <Link to="/orders">Manage Deliveries</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/admin">Admin Portal</Link>
        </div>

        {/* Resources */}
        <div className="footer-column">
          <h3>RESOURCES</h3>
          <Link to="/category">All Clothing</Link>
          <Link to="/category?filter=sale">On Sale Deals</Link>
          <Link to="/category?filter=new">New Arrivals</Link>
          <Link to="/wishlist">Saved Wishlist</Link>
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

      {/* Info Dialog Modal */}
      {activeModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              padding: "24px",
              maxWidth: "480px",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <h2 style={{ fontSize: "18px", margin: 0, fontWeight: "700" }}>{activeModal.title}</h2>
              <button
                onClick={() => setActiveModal(null)}
                style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}
              >
                ✕
              </button>
            </div>
            <p style={{ color: "#475569", fontSize: "14px", lineHeight: "1.7", whiteSpace: "pre-line", margin: "0 0 20px 0" }}>
              {activeModal.content}
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setActiveModal(null)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "8px",
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "none",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;