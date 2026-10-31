import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/Cart.jsx";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, cartTotal, placeOrder } = useCart();

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Karachi",
    postalCode: "75000",
    country: "Pakistan",
  });

  const discount = Math.round(cartTotal * 0.2);
  const deliveryFee = cart.length > 0 ? 15 : 0;
  const total = cartTotal - discount + deliveryFee;

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.address || !formData.phone) {
      alert("Please fill Name, Phone, and Address");
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
        { name: formData.name, phone: formData.phone }
      );

      setOrderPlaced(order);
      setShowCheckoutModal(false);
    } catch (err) {
      alert(err.response?.data?.error || err.message || "Failed to place order");
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
        <div style={{
          backgroundColor: "#e6fffa",
          border: "1px solid #38b2ac",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "25px",
          textAlign: "center"
        }}>
          <h2 style={{ color: "#234e52", margin: "0 0 10px 0" }}>🎉 Order Placed Successfully!</h2>
          <p style={{ margin: "5px 0" }}>Order ID: <strong>{orderPlaced._id}</strong></p>
          <p style={{ color: "#4a5568", margin: "5px 0" }}>Thank you, {formData.name}! Your order will be delivered soon via Cash on Delivery.</p>
          <Link to="/" style={{ display: "inline-block", marginTop: "12px", color: "#319795", fontWeight: "bold" }}>
            Continue Shopping →
          </Link>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
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
              <span>Discount (-20%)</span>
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

      {showCheckoutModal && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1000, padding: "16px"
        }}>
          <div style={{
            backgroundColor: "#fff", borderRadius: "16px", padding: "24px",
            maxWidth: "480px", width: "100%", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)"
          }}>
            <h2 style={{ margin: "0 0 16px 0", fontSize: "22px" }}>Shipping & Delivery Details</h2>
            
            <form onSubmit={handleCheckoutSubmit}>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "4px" }}>Full Name *</label>
                <input
                  type="text" required placeholder="e.g. Abdul Mateen" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "4px" }}>Phone Number *</label>
                <input
                  type="text" required placeholder="e.g. +92 300 1234567" value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "4px" }}>Delivery Address *</label>
                <input
                  type="text" required placeholder="House #, Street, Area" value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "4px" }}>City</label>
                  <input
                    type="text" value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "4px" }}>Postal Code</label>
                  <input
                    type="text" value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div style={{ padding: "12px", backgroundColor: "#f7fafc", borderRadius: "8px", marginBottom: "16px", fontSize: "14px" }}>
                Payment Method: <strong>Cash on Delivery (COD)</strong><br/>
                Total Payable: <strong>${total}</strong>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <button
                  type="button" onClick={() => setShowCheckoutModal(false)}
                  style={{ padding: "10px 18px", borderRadius: "8px", border: "1px solid #cbd5e0", backgroundColor: "#fff", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit" disabled={loading}
                  style={{
                    padding: "10px 22px", borderRadius: "8px", border: "none",
                    backgroundColor: "#000", color: "#fff", fontWeight: "600",
                    cursor: loading ? "not-allowed" : "pointer"
                  }}
                >
                  {loading ? "Placing Order..." : "Confirm & Place Order"}
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