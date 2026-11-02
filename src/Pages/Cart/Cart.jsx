import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../Context/Cart.jsx";
import { useAuth } from "../../Context/AuthContext.jsx";
import "./Cart.css";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
    placeOrder,
    applyPromo,
    promoCode,
    discountPercent,
  } = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(null);
  const [formError, setFormError] = useState("");
  const [promoInput, setPromoInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "+92 300 1234567",
    address: user?.address || "",
    city: user?.city || "Karachi",
    postalCode: user?.postalCode || "75000",
    country: user?.country || "Pakistan",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });



  // Compute discount: if promo applied, use discountPercent; otherwise standard 20%
  const effectiveDiscountPercent = discountPercent > 0 ? discountPercent : 20;
  const discount = Math.round(cartTotal * (effectiveDiscountPercent / 100));
  const deliveryFee = cart.length > 0 ? 15 : 0;
  const total = Math.max(0, cartTotal - discount + deliveryFee);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromo(promoInput);
    }
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!formData.name || !formData.address || !formData.phone) {
      setFormError("Please fill in Name, Phone, and Address");
      return;
    }

    if (paymentMethod === "Credit Card" && !formData.cardNumber) {
      setFormError("Please enter your card number");
      return;
    }

    setLoading(true);
    try {
      const order = await placeOrder(
        {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        { name: formData.name, phone: formData.phone },
        paymentMethod,
        total
      );

      setOrderPlaced(order);
      setShowCheckoutModal(false);
    } catch (err) {
      setFormError(err.response?.data?.error || err.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <strong>Cart</strong>
      </div>

      <h1 className="cart-title">YOUR CART</h1>

      {orderPlaced && (
        <div
          style={{
            backgroundColor: "#e6fffa",
            border: "1px solid #38b2ac",
            padding: "24px",
            borderRadius: "16px",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#234e52", margin: "0 0 10px 0" }}>🎉 Order Placed Successfully!</h2>
          <p style={{ margin: "5px 0", fontSize: "16px" }}>
            Order ID: <strong>{orderPlaced._id}</strong>
          </p>
          <p style={{ color: "#4a5568", margin: "8px 0" }}>
            Thank you, <strong>{formData.name}</strong>! Your order is being processed and will be delivered via{" "}
            <strong>{orderPlaced.paymentMethod}</strong>.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "14px", marginTop: "16px" }}>
            <button
              onClick={() => navigate("/orders")}
              style={{
                padding: "10px 20px",
                backgroundColor: "#0d9488",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Track in My Orders →
            </button>
            <Link
              to="/category"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "10px 20px",
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: "8px",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/category" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item, index) => {
              const itemId = item._id || item.id;
              const itemImage = item.image || item.imageUrl;

              return (
                <div className="cart-item" key={index}>
                  <img src={itemImage} alt={item.name} className="cart-item-image" />

                  <div className="cart-item-details">
                    <div className="cart-item-top">
                      <div>
                        <h3>{item.name}</h3>
                        {item.size && <p className="cart-item-meta">Size: {item.size}</p>}
                        {item.color && (
                          <p className="cart-item-meta">
                            Color:{" "}
                            <span className="color-dot" style={{ backgroundColor: item.color }}></span>
                          </p>
                        )}
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(itemId, item.color, item.size)}
                        title="Remove item"
                      >
                        🗑
                      </button>
                    </div>

                    <div className="cart-item-bottom">
                      <span className="cart-item-price">${item.price}</span>

                      <div className="qty-box">
                        <button onClick={() => decreaseQuantity(itemId, item.color, item.size)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQuantity(itemId, item.color, item.size)}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal}</span>
            </div>

            <div className="summary-row discount-row">
              <span>
                Discount (-{effectiveDiscountPercent}%)
                {promoCode && <small style={{ marginLeft: "4px", color: "#16a34a" }}>[{promoCode}]</small>}
              </span>
              <span>-${discount}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>${deliveryFee}</span>
            </div>

            <div className="summary-row total-row">
              <span>Total</span>
              <span>${total}</span>
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} style={{ display: "flex", gap: "8px", margin: "16px 0 10px" }}>
              <input
                type="text"
                placeholder="Promo code (e.g. SHOP20)"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: "20px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#f1f5f9",
                  fontSize: "13px",
                  textTransform: "uppercase",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "10px 18px",
                  borderRadius: "20px",
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "none",
                  fontWeight: "600",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Apply
              </button>
            </form>

            <button
              type="button"
              className="checkout-btn"
              onClick={() => setShowCheckoutModal(true)}
            >
              Go to Checkout →
            </button>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              padding: "24px",
              maxWidth: "520px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <h2 style={{ margin: 0, fontSize: "20px" }}>Delivery &amp; Payment Details</h2>
              <button
                onClick={() => setShowCheckoutModal(false)}
                style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}
              >
                ✕
              </button>
            </div>

            {formError && (
              <div
                style={{
                  backgroundColor: "#fff5f5",
                  color: "#c53030",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  marginBottom: "14px",
                  border: "1px solid #feb2b2",
                }}
              >
                {formError}
              </div>
            )}

            <form onSubmit={handleCheckoutSubmit}>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "4px" }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Abdul Mateen"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                />
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "4px" }}>
                  Phone Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +92 300 1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                />
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "4px" }}>
                  Delivery Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="House #, Street, Area"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "4px" }}>
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "4px" }}>
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
                  Select Payment Method
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("Cash on Delivery")}
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: paymentMethod === "Cash on Delivery" ? "2px solid #000" : "1px solid #cbd5e1",
                      backgroundColor: paymentMethod === "Cash on Delivery" ? "#f8fafc" : "#fff",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    💵 Cash on Delivery
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("Credit Card")}
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: paymentMethod === "Credit Card" ? "2px solid #000" : "1px solid #cbd5e1",
                      backgroundColor: paymentMethod === "Credit Card" ? "#f8fafc" : "#fff",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    💳 Card / Online
                  </button>
                </div>
              </div>

              {/* Card Inputs if Online selected */}
              {paymentMethod === "Credit Card" && (
                <div style={{ padding: "12px", backgroundColor: "#f8fafc", borderRadius: "8px", marginBottom: "14px" }}>
                  <div style={{ marginBottom: "8px" }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px" }}>
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px" }}>
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        placeholder="12/28"
                        value={formData.cardExpiry}
                        onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                        style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px" }}>
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        value={formData.cardCvc}
                        onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                        style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div
                style={{
                  padding: "12px",
                  backgroundColor: "#f7fafc",
                  borderRadius: "8px",
                  marginBottom: "16px",
                  fontSize: "14px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Total Payable:</span>
                <strong style={{ fontSize: "16px" }}>${total}</strong>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setShowCheckoutModal(false)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e0",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: "10px 22px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#000",
                    color: "#fff",
                    fontWeight: "600",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Placing Order..." : `Pay $${total} & Place Order`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;