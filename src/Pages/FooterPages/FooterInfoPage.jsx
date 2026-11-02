import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../../Context/ToastContext.jsx";

import versace from "../../assets/versace.png";
import zara from "../../assets/zara.png";
import gucci from "../../assets/gucci.png";
import prada from "../../assets/prada.png";
import calvinKlein from "../../assets/calvin-klein.png";

export const FooterInfoPage = ({ pageKey }) => {
  const { showToast } = useToast();

  // Interactive form states for pages that need them
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [careerForm, setCareerForm] = useState({ name: "", email: "", role: "Frontend Engineer", resume: "" });
  const [deliveryTrackingId, setDeliveryTrackingId] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    showToast("Message sent successfully! Our team will reply within 24 hours.", "success");
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  const handleCareerSubmit = (e) => {
    e.preventDefault();
    showToast("Application submitted! Thank you for your interest in Shop.co.", "success");
    setCareerForm({ name: "", email: "", role: "Frontend Engineer", resume: "" });
  };

  const handleTrackDelivery = (e) => {
    e.preventDefault();
    if (!deliveryTrackingId.trim()) return;
    setTrackingResult({
      id: deliveryTrackingId.trim().toUpperCase(),
      status: "In Transit with Courier",
      eta: "Expected in 2 business days",
      location: "Central Logistics Hub",
    });
  };

  const pagesData = {
    about: {
      category: "Company",
      title: "About SHOP.CO",
      subtitle: "Crafting modern apparel designed for individuality, comfort, and effortless confidence.",
      content: (
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>Our Story</h2>
          <p style={{ color: "#475569", lineHeight: "1.8", marginBottom: "20px" }}>
            Founded in 2000, SHOP.CO was born from a simple belief: clothing should make you feel proud, authentic, and impeccably styled every single day. Over the past two decades, we have evolved from a boutique atelier into an internationally recognized fashion destination serving over 30,000 happy customers worldwide.
          </p>
          <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>Design Philosophy</h2>
          <p style={{ color: "#475569", lineHeight: "1.8", marginBottom: "24px" }}>
            We bridge the gap between luxury runway aesthetics and accessible everyday streetwear. Every fabric is rigorously tested for wash durability, breathability, and fit retention so you get pieces that look fresh season after season.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "20px" }}>
            <div style={{ backgroundColor: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontSize: "26px", fontWeight: "900", margin: "0 0 6px" }}>200+</h3>
              <p style={{ color: "#64748b", margin: 0, fontSize: "14px" }}>International Brand Partnerships</p>
            </div>
            <div style={{ backgroundColor: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontSize: "26px", fontWeight: "900", margin: "0 0 6px" }}>2,000+</h3>
              <p style={{ color: "#64748b", margin: 0, fontSize: "14px" }}>Meticulously Crafted Products</p>
            </div>
            <div style={{ backgroundColor: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontSize: "26px", fontWeight: "900", margin: "0 0 6px" }}>30,000+</h3>
              <p style={{ color: "#64748b", margin: 0, fontSize: "14px" }}>Satisfied Global Customers</p>
            </div>
          </div>
        </div>
      ),
    },

    features: {
      category: "Company",
      title: "Platform Features",
      subtitle: "Discover the craftsmanship, speed, and reliability built into every shopping experience.",
      content: (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {[
              { icon: "✨", title: "Premium Cotton Fabrics", desc: "Long-staple combed cotton providing unmatched hand-feel, softness, and color retention." },
              { icon: "✂️", title: "Tailored Modern Fits", desc: "Engineered sizing patterns tested across body types for true-to-size confidence." },
              { icon: "🔄", title: "Hassle-Free 30-Day Returns", desc: "No-questions-asked refunds or exchanges on all unworn items with original tags." },
              { icon: "⚡", title: "Expedited Dispatch", desc: "Orders packed and dispatched from regional fulfillment warehouses within 24 hours." },
              { icon: "🔒", title: "Encrypted Transactions", desc: "End-to-end 256-bit SSL encryption across card processing, cash-on-delivery, and digital wallets." },
              { icon: "💬", title: "24/7 Priority Support", desc: "Live chat assistance, instant order lookup, and personalized sizing consultation." },
            ].map((f, i) => (
              <div key={i} style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", padding: "24px", borderRadius: "14px" }}>
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>{f.icon}</div>
                <h3 style={{ fontSize: "17px", fontWeight: "700", margin: "0 0 8px" }}>{f.title}</h3>
                <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    works: {
      category: "Company",
      title: "How It Works",
      subtitle: "From runway moodboards to your wardrobe: four streamlined steps.",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {[
            { step: "01", title: "Curate & Style Selection", desc: "Browse curated collections across Casual, Formal, Party, and Gym styles tailored for every season." },
            { step: "02", title: "Size & Detail Selection", desc: "Pick your exact colorway and fit using our interactive size guides and customer reviews." },
            { step: "03", title: "One-Click Checkout", desc: "Seamlessly checkout with flexible payment choices including Cash on Delivery or credit cards." },
            { step: "04", title: "Doorstep Delivery & Tracking", desc: "Track shipment milestones live on your order receipt with direct notifications." },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: "20px", alignItems: "flex-start", backgroundColor: "#f8fafc", padding: "20px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "28px", fontWeight: "900", color: "#000", minWidth: "48px" }}>{s.step}</div>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", margin: "0 0 6px" }}>{s.title}</h3>
                <p style={{ color: "#64748b", margin: 0, fontSize: "14px", lineHeight: "1.6" }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },

    career: {
      category: "Company",
      title: "Join Our Team",
      subtitle: "Build the future of digital fashion and global e-commerce with us.",
      content: (
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>Open Positions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
            {[
              { role: "Senior Frontend Engineer (React/TypeScript)", dept: "Engineering", loc: "Remote / Hybrid" },
              { role: "Lead Apparel Designer (Streetwear)", dept: "Design Studio", loc: "Karachi / London" },
              { role: "E-Commerce Growth Manager", dept: "Marketing", loc: "Remote" },
              { role: "Quality Assurance Specialist", dept: "Operations", loc: "On-site" },
            ].map((job, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <h4 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "700" }}>{job.role}</h4>
                  <span style={{ fontSize: "13px", color: "#64748b" }}>{job.dept} • {job.loc}</span>
                </div>
                <button
                  onClick={() => setCareerForm({ ...careerForm, role: job.role })}
                  style={{ padding: "8px 16px", borderRadius: "20px", backgroundColor: "#000", color: "#fff", border: "none", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: "#f8fafc", padding: "24px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: "18px", fontWeight: "700" }}>Submit Your Application</h3>
            <form onSubmit={handleCareerSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>Full Name *</label>
                  <input
                    type="text" required placeholder="Your name" value={careerForm.name}
                    onChange={(e) => setCareerForm({ ...careerForm, name: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>Email *</label>
                  <input
                    type="email" required placeholder="you@example.com" value={careerForm.email}
                    onChange={(e) => setCareerForm({ ...careerForm, email: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                  />
                </div>
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>Target Role</label>
                <input
                  type="text" value={careerForm.role}
                  onChange={(e) => setCareerForm({ ...careerForm, role: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>Portfolio / LinkedIn URL</label>
                <input
                  type="url" placeholder="https://linkedin.com/in/..." value={careerForm.resume}
                  onChange={(e) => setCareerForm({ ...careerForm, resume: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                />
              </div>
              <button type="submit" style={{ padding: "12px 24px", borderRadius: "25px", backgroundColor: "#000", color: "#fff", border: "none", fontWeight: "600", cursor: "pointer" }}>
                Submit Candidate Profile
              </button>
            </form>
          </div>
        </div>
      ),
    },

    "customer-support": {
      category: "Help",
      title: "Customer Support Center",
      subtitle: "We're here to assist you with orders, sizing advice, delivery, and returns.",
      content: (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", alignItems: "start" }}>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "14px" }}>Get in Touch</h2>
            <p style={{ color: "#475569", lineHeight: "1.7", marginBottom: "20px" }}>
              Have questions regarding an ongoing order, delivery timelines, or size exchanges? Send our team a message or connect through our hotline.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "20px" }}>📞</span>
                <div>
                  <div style={{ fontWeight: "700" }}>Helpline</div>
                  <div style={{ color: "#64748b", fontSize: "14px" }}>+92 (300) 123-4567 (Mon-Sat, 9AM-8PM PKT)</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "20px" }}>✉️</span>
                <div>
                  <div style={{ fontWeight: "700" }}>Email Support</div>
                  <div style={{ color: "#64748b", fontSize: "14px" }}>support@shop.co (Avg reply: under 2 hours)</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "20px" }}>📍</span>
                <div>
                  <div style={{ fontWeight: "700" }}>Flagship Headquarters</div>
                  <div style={{ color: "#64748b", fontSize: "14px" }}>Main Boulevard, Phase 5, DHA, Karachi</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: "#f8fafc", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: "18px", fontWeight: "700" }}>Send Us a Message</h3>
            <form onSubmit={handleContactSubmit}>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>Name *</label>
                <input
                  type="text" required placeholder="Your full name" value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>Email *</label>
                <input
                  type="email" required placeholder="your.email@example.com" value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>Subject</label>
                <input
                  type="text" placeholder="e.g. Order #123 Inquiry" value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>Message *</label>
                <textarea
                  required rows={4} placeholder="Describe your request..." value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                />
              </div>
              <button type="submit" style={{ width: "100%", padding: "12px", borderRadius: "25px", backgroundColor: "#000", color: "#fff", border: "none", fontWeight: "600", cursor: "pointer" }}>
                Send Support Request
              </button>
            </form>
          </div>
        </div>
      ),
    },

    "delivery-details": {
      category: "Help",
      title: "Delivery & Shipping Details",
      subtitle: "Fast, reliable shipping policies and dispatch timelines worldwide.",
      content: (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "30px" }}>
            <div style={{ backgroundColor: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "20px", fontWeight: "700", marginBottom: "6px" }}>Standard Delivery</div>
              <div style={{ color: "#000", fontSize: "24px", fontWeight: "800", marginBottom: "6px" }}>$15 flat rate</div>
              <p style={{ color: "#64748b", margin: 0, fontSize: "14px" }}>Arrives in 2 - 4 business days with tracking.</p>
            </div>
            <div style={{ backgroundColor: "#f0fdf4", padding: "20px", borderRadius: "12px", border: "1px solid #bbf7d0" }}>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#166534", marginBottom: "6px" }}>Free Shipping Offer</div>
              <div style={{ color: "#166534", fontSize: "24px", fontWeight: "800", marginBottom: "6px" }}>Free over $250</div>
              <p style={{ color: "#166534", margin: 0, fontSize: "14px" }}>Use code FREESHIP at checkout.</p>
            </div>
            <div style={{ backgroundColor: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "20px", fontWeight: "700", marginBottom: "6px" }}>Cash on Delivery</div>
              <div style={{ color: "#000", fontSize: "24px", fontWeight: "800", marginBottom: "6px" }}>Zero Surcharge</div>
              <p style={{ color: "#64748b", margin: 0, fontSize: "14px" }}>Pay cash directly upon parcel inspection.</p>
            </div>
          </div>

          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "12px" }}>Shipping Process &amp; Couriers</h2>
          <p style={{ color: "#475569", lineHeight: "1.8", marginBottom: "16px" }}>
            Every parcel is sealed in tamper-evident recyclable packaging. We partner with DHL Express, FedEx, and leading local courier networks. Once dispatched, you will receive an automated tracking code viewable directly on your Orders page.
          </p>
          <Link to="/manage-deliveries" style={{ display: "inline-block", padding: "10px 20px", borderRadius: "20px", backgroundColor: "#000", color: "#fff", textDecoration: "none", fontWeight: "600", fontSize: "14px" }}>
            Go to Manage Deliveries →
          </Link>
        </div>
      ),
    },

    terms: {
      category: "Help",
      title: "Terms & Conditions",
      subtitle: "Legal agreement and purchasing policies governing the use of SHOP.CO.",
      content: (
        <div style={{ color: "#475569", lineHeight: "1.8" }}>
          <h3 style={{ color: "#0f172a", fontSize: "18px", fontWeight: "700" }}>1. Introduction &amp; Scope</h3>
          <p>By accessing SHOP.CO and placing orders, you agree to comply with our commercial terms and acceptable use standards. These terms apply to all transactions, catalog views, and customer services.</p>
          <h3 style={{ color: "#0f172a", fontSize: "18px", fontWeight: "700" }}>2. Pricing &amp; Orders</h3>
          <p>All prices displayed in US Dollars ($) are inclusive of applicable retail taxes unless otherwise stated. While we make every effort to display accurate inventory and pricing, we reserve the right to correct typographical discrepancies prior to order fulfillment.</p>
          <h3 style={{ color: "#0f172a", fontSize: "18px", fontWeight: "700" }}>3. Returns &amp; Exchanges</h3>
          <p>Merchandise can be returned within 30 days of receipt provided items are unwashed, unworn, and accompanied by original security tags. Refunds will be credited to the original payment method or issued as store credit.</p>
          <h3 style={{ color: "#0f172a", fontSize: "18px", fontWeight: "700" }}>4. Intellectual Property</h3>
          <p>All brand logos, garment graphics, photography, and site typography are the proprietary intellectual property of SHOP.CO and protected under international copyright conventions.</p>
        </div>
      ),
    },

    privacy: {
      category: "Help",
      title: "Privacy Policy",
      subtitle: "How we collect, protect, and handle your personal and financial information.",
      content: (
        <div style={{ color: "#475569", lineHeight: "1.8" }}>
          <h3 style={{ color: "#0f172a", fontSize: "18px", fontWeight: "700" }}>Data Protection Guarantee</h3>
          <p>Your privacy is central to our values. We never sell, rent, or lease your personal information, contact records, or browsing activity to third-party data brokers.</p>
          <h3 style={{ color: "#0f172a", fontSize: "18px", fontWeight: "700" }}>Information We Collect</h3>
          <ul style={{ margin: "10px 0 16px 20px" }}>
            <li>Name, delivery address, and phone number for parcel fulfillment.</li>
            <li>Encrypted payment tokens necessary for processing orders securely.</li>
            <li>Browser cookie preferences to remember your shopping cart items.</li>
          </ul>
          <h3 style={{ color: "#0f172a", fontSize: "18px", fontWeight: "700" }}>256-Bit SSL Security</h3>
          <p>All checkout sessions are encrypted via industry-standard Transport Layer Security (TLS/SSL). Your sensitive credit card numbers are handled via PCI-DSS certified tokenization protocols.</p>
        </div>
      ),
    },

    account: {
      category: "FAQ",
      title: "Customer Account",
      subtitle: "Manage your profile, shipping addresses, past receipts, and authentication.",
      content: (
        <div>
          <p style={{ color: "#475569", lineHeight: "1.7", marginBottom: "20px" }}>
            Your SHOP.CO account allows you to securely manage your saved delivery addresses, review past transactions, track ongoing shipments, and configure security preferences.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/login" style={{ padding: "12px 24px", borderRadius: "25px", backgroundColor: "#000", color: "#fff", textDecoration: "none", fontWeight: "600", fontSize: "14px" }}>
              Sign In or Register
            </Link>
            <Link to="/orders" style={{ padding: "12px 24px", borderRadius: "25px", backgroundColor: "#f1f5f9", color: "#0f172a", border: "1px solid #cbd5e1", textDecoration: "none", fontWeight: "600", fontSize: "14px" }}>
              View My Orders
            </Link>
          </div>
        </div>
      ),
    },

    "manage-deliveries": {
      category: "FAQ",
      title: "Manage Deliveries & Tracking",
      subtitle: "Track parcel whereabouts, reschedule delivery dates, or change destination addresses.",
      content: (
        <div>
          <div style={{ backgroundColor: "#f8fafc", padding: "24px", borderRadius: "14px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
            <h3 style={{ margin: "0 0 12px", fontSize: "18px", fontWeight: "700" }}>Quick Parcel Tracker</h3>
            <form onSubmit={handleTrackDelivery} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <input
                type="text" required placeholder="Enter Order ID (e.g. ORD-948210A)"
                value={deliveryTrackingId}
                onChange={(e) => setDeliveryTrackingId(e.target.value)}
                style={{ flex: 1, minWidth: "220px", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
              <button type="submit" style={{ padding: "12px 24px", borderRadius: "8px", backgroundColor: "#000", color: "#fff", border: "none", fontWeight: "600", cursor: "pointer" }}>
                Track Parcel
              </button>
            </form>

            {trackingResult && (
              <div style={{ marginTop: "16px", padding: "14px", backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontWeight: "700", marginBottom: "4px" }}>Order #{trackingResult.id}</div>
                <div style={{ color: "#10b981", fontWeight: "600", fontSize: "14px" }}>● {trackingResult.status}</div>
                <div style={{ color: "#64748b", fontSize: "13px", marginTop: "4px" }}>{trackingResult.eta} • Hub: {trackingResult.location}</div>
              </div>
            )}
          </div>

          <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "10px" }}>Need to Change Delivery Address?</h3>
          <p style={{ color: "#475569", lineHeight: "1.7", marginBottom: "16px" }}>
            If your order is currently in "Processing" status, contact our dispatch hotline at +92 (300) 123-4567 or email support@shop.co with your Order ID to update the destination address before courier dispatch.
          </p>
        </div>
      ),
    },

    payments: {
      category: "FAQ",
      title: "Payments & Financial Security",
      subtitle: "Flexible, secure payment channels supported across all customer devices.",
      content: (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "28px" }}>
            {[
              { name: "Cash on Delivery (COD)", desc: "Pay in cash when your parcel is delivered right at your door." },
              { name: "Visa & Mastercard", desc: "Global credit and debit cards with 3D-Secure 2.0 fraud defense." },
              { name: "PayPal", desc: "Fast, protected one-click checkout using your PayPal digital balance." },
              { name: "Apple Pay & Google Pay", desc: "Biometric touch/face authentication on iOS and Android devices." },
            ].map((p, idx) => (
              <div key={idx} style={{ padding: "20px", backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <h4 style={{ margin: "0 0 6px", fontSize: "16px", fontWeight: "700" }}>{p.name}</h4>
                <p style={{ color: "#64748b", margin: 0, fontSize: "13px", lineHeight: "1.6" }}>{p.desc}</p>
              </div>
            ))}
          </div>
          <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "10px" }}>Zero Hidden Surcharges</h3>
          <p style={{ color: "#475569", lineHeight: "1.8" }}>
            What you see at checkout is the exact total you pay. We charge no currency conversion markups or card processing fees. All receipts are sent directly to your registered email address.
          </p>
        </div>
      ),
    },

    "free-ebooks": {
      category: "Resources",
      title: "Free Fashion & Style eBooks",
      subtitle: "Download expert styling guides, capsule wardrobe blueprints, and seasonal trend forecasts.",
      content: (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
          {[
            { title: "The 2026 Streetwear Lookbook", pages: "48 Pages", desc: "Mastering oversized silhouettes, layered textures, and statement graphic tees." },
            { title: "Capsule Wardrobe Masterclass", pages: "36 Pages", desc: "How to build 30 versatile outfits using just 10 foundational garments." },
            { title: "The Ultimate Denim Guide", pages: "28 Pages", desc: "Raw denim vs stretch, wash preservation, and finding your ideal rise & taper." },
            { title: "Color Theory for Daily Fits", pages: "32 Pages", desc: "Pairing earth tones, contrast pops, and monochrome palettes with confidence." },
          ].map((ebook, idx) => (
            <div key={idx} style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "12px", color: "#2563eb", fontWeight: "700", marginBottom: "6px" }}>PDF GUIDE • {ebook.pages}</div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", margin: "0 0 8px" }}>{ebook.title}</h3>
                <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.6", margin: "0 0 16px" }}>{ebook.desc}</p>
              </div>
              <button
                onClick={() => showToast(`"${ebook.title}" download started!`, "success")}
                style={{ padding: "10px", borderRadius: "20px", backgroundColor: "#000", color: "#fff", border: "none", fontWeight: "600", fontSize: "13px", cursor: "pointer" }}
              >
                Download Free eBook ↓
              </button>
            </div>
          ))}
        </div>
      ),
    },

    "development-tutorial": {
      category: "Resources",
      title: "E-Commerce Development Architecture",
      subtitle: "Technical documentation, component hierarchy, and full-stack API integration guide.",
      content: (
        <div style={{ color: "#475569", lineHeight: "1.8" }}>
          <h3 style={{ color: "#0f172a", fontSize: "18px", fontWeight: "700" }}>Technology Stack</h3>
          <p>SHOP.CO is engineered with a modern, high-performance web architecture:</p>
          <ul style={{ margin: "10px 0 20px 20px" }}>
            <li><strong>Frontend:</strong> React 19 SPA running on Vite 6 with responsive CSS architecture.</li>
            <li><strong>Routing:</strong> React Router v7 with dynamic search query synchronization and deep linking.</li>
            <li><strong>State Layer:</strong> Context API providers for Cart persistence, Authentication, and Orders.</li>
            <li><strong>Backend API Contract:</strong> RESTful endpoints supporting <code>/api/orders</code> and <code>/api/products</code>.</li>
          </ul>
          <h3 style={{ color: "#0f172a", fontSize: "18px", fontWeight: "700" }}>Connecting Your Custom Backend / Admin Dashboard</h3>
          <p>
            You can point this frontend to any Node.js / Express or microservice backend by setting the <code>VITE_API_URL</code> environment variable in <code>.env.example</code> or configuring your external admin dashboard in the Admin Portal.
          </p>
        </div>
      ),
    },

    "how-to-blog": {
      category: "Resources",
      title: "The SHOP.CO Fashion & Styling Blog",
      subtitle: "Style guides, fabric care recommendations, and trend breakdowns from our design team.",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {[
            {
              date: "October 28, 2026",
              title: "How to Style Oversized Graphic T-Shirts for Any Occasion",
              excerpt: "From tailored blazers to casual denim shorts, learn the golden rules of proportions when rocking oversized streetwear.",
              readTime: "4 min read",
            },
            {
              date: "October 21, 2026",
              title: "Raw Denim Care 101: How to Wash Jeans Without Fading Color",
              excerpt: "Avoid shrinking and color loss with our cold-soak guide and air-drying secrets tested by denim artisans.",
              readTime: "6 min read",
            },
            {
              date: "October 14, 2026",
              title: "5 Casual Wardrobe Essentials Every Man Needs in 2026",
              excerpt: "Minimalist tees, neutral hoodies, and versatile chinos that form the foundation of effortless everyday outfits.",
              readTime: "5 min read",
            },
          ].map((post, idx) => (
            <div key={idx} style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "24px" }}>
              <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "600", marginBottom: "6px" }}>{post.date} • {post.readTime}</div>
              <h3 style={{ fontSize: "20px", fontWeight: "700", margin: "0 0 8px" }}>{post.title}</h3>
              <p style={{ color: "#475569", lineHeight: "1.7", margin: "0 0 12px" }}>{post.excerpt}</p>
              <span style={{ color: "#000", fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>Read Full Article →</span>
            </div>
          ))}
        </div>
      ),
    },

    "youtube-playlist": {
      category: "Resources",
      title: "YouTube Lookbooks & Runway Playlist",
      subtitle: "Watch behind-the-scenes seasonal campaign shoots, fit breakdowns, and styling sessions.",
      content: (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {[
            { title: "Summer / Autumn 2026 Runway Lookbook", duration: "12:45", views: "142K views", host: "SHOP.CO Creative Studio" },
            { title: "Styling 1 White Tee into 7 Different Outfits", duration: "08:19", views: "98K views", host: "Lead Stylist Maya Chen" },
            { title: "Behind the Seams: How Our Cotton Garments are Made", duration: "15:30", views: "65K views", host: "Eco Textile Lab" },
          ].map((video, idx) => (
            <div key={idx} style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", overflow: "hidden" }}>
              <div style={{ height: "160px", backgroundColor: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "40px", cursor: "pointer" }}>
                ▶
              </div>
              <div style={{ padding: "16px" }}>
                <h4 style={{ margin: "0 0 6px", fontSize: "16px", fontWeight: "700" }}>{video.title}</h4>
                <div style={{ fontSize: "13px", color: "#64748b" }}>{video.host} • {video.views}</div>
              </div>
            </div>
          ))}
        </div>
      ),
    },

    brands: {
      category: "Shop",
      title: "Our Partner Brands",
      subtitle: "Explore globally recognized fashion houses and premium lifestyle labels.",
      content: (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "32px" }}>
            {[
              { name: "VERSACE", img: versace, desc: "Bold luxury statement tailoring & iconic Italian aesthetics." },
              { name: "ZARA", img: zara, desc: "Contemporary European fast-fashion with high-street silhouettes." },
              { name: "GUCCI", img: gucci, desc: "High-fashion craftsmanship, eclectic palettes, and heritage prints." },
              { name: "PRADA", img: prada, desc: "Minimalist luxury, technical fabrics, and elevated silhouettes." },
              { name: "CALVIN KLEIN", img: calvinKlein, desc: "Classic American minimalism, clean denim, and iconic cotton basics." },
            ].map((b, idx) => (
              <div key={idx} style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "24px", textAlign: "center" }}>
                <div style={{ height: "45px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                  <img src={b.img} alt={b.name} style={{ maxHeight: "36px", maxWidth: "120px", objectFit: "contain" }} />
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: "800", margin: "0 0 6px" }}>{b.name}</h3>
                <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 14px", lineHeight: "1.5" }}>{b.desc}</p>
                <Link to="/category" style={{ fontSize: "13px", fontWeight: "700", color: "#000", textDecoration: "none" }}>
                  Explore Collection →
                </Link>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  };

  const current = pagesData[pageKey] || pagesData.about;

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px 24px 80px" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", gap: "8px", fontSize: "14px", color: "#64748b", marginBottom: "24px" }}>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
        <span>/</span>
        <span>{current.category}</span>
        <span>/</span>
        <strong style={{ color: "#000" }}>{current.title}</strong>
      </div>

      {/* Header Banner */}
      <div style={{ marginBottom: "36px", borderBottom: "1px solid #e2e8f0", paddingBottom: "24px" }}>
        <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "#2563eb", letterSpacing: "1px" }}>
          {current.category}
        </span>
        <h1 style={{ fontSize: "36px", fontWeight: "900", margin: "6px 0 10px", color: "#0f172a" }}>
          {current.title}
        </h1>
        <p style={{ color: "#64748b", fontSize: "16px", margin: 0, maxWidth: "700px", lineHeight: "1.6" }}>
          {current.subtitle}
        </p>
      </div>

      {/* Main Content */}
      <div style={{ minHeight: "400px" }}>
        {current.content}
      </div>
    </div>
  );
};
