import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useOrders } from "../../Context/OrdersContext.jsx";
import { useToast } from "../../Context/ToastContext.jsx";

const Profile = () => {
  const { user, updateProfile, logout, isAdmin } = useAuth();
  const { orders } = useOrders();
  const { showToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "Abdul Mateen",
    email: user?.email || "user@shop.co",
    phone: user?.phone || "+92 300 1234567",
    address: user?.address || "Main Boulevard, Phase 5",
    city: user?.city || "Karachi",
    postalCode: user?.postalCode || "75000",
    country: user?.country || "Pakistan",
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    showToast("Profile updated successfully!", "success");
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px 24px 60px" }}>
      <div style={{ display: "flex", gap: "8px", fontSize: "14px", color: "#64748b", marginBottom: "20px" }}>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
        <span>/</span>
        <strong style={{ color: "#000" }}>Account Profile</strong>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px", alignItems: "start" }}>
        {/* User Card */}
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: isAdmin ? "#ef4444" : "#000",
              color: "#fff",
              fontSize: "28px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
            }}
          >
            {formData.name.charAt(0).toUpperCase()}
          </div>

          <h2 style={{ fontSize: "20px", fontWeight: "700", margin: "0 0 4px 0" }}>
            {formData.name}
          </h2>
          <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 10px 0" }}>
            {formData.email}
          </p>

          <span
            style={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: "12px",
              backgroundColor: isAdmin ? "#fee2e2" : "#e0e7ff",
              color: isAdmin ? "#b91c1c" : "#4338ca",
              fontSize: "12px",
              fontWeight: "700",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            {user?.role || "Customer"}
          </span>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              padding: "14px 0",
              borderTop: "1px solid #f1f5f9",
              borderBottom: "1px solid #f1f5f9",
              marginBottom: "16px",
            }}
          >
            <div>
              <div style={{ fontSize: "20px", fontWeight: "800" }}>{orders.length}</div>
              <div style={{ fontSize: "12px", color: "#64748b" }}>Orders</div>
            </div>
            <div>
              <div style={{ fontSize: "20px", fontWeight: "800", color: "#10b981" }}>Active</div>
              <div style={{ fontSize: "12px", color: "#64748b" }}>Status</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Link
              to="/orders"
              style={{
                display: "block",
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: "#f8fafc",
                color: "#0f172a",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              📦 View My Orders
            </Link>


            {isAdmin && (
              <Link
                to="/admin"
                style={{
                  display: "block",
                  padding: "10px",
                  borderRadius: "8px",
                  backgroundColor: "#fef2f2",
                  color: "#b91c1c",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                ⚙ Admin Management Suite
              </Link>
            )}

            <button
              onClick={logout}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: "#fff",
                border: "1px solid #fee2e2",
                color: "#ef4444",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                marginTop: "8px",
              }}
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Shipping & Account Details */}
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "700", margin: 0 }}>
              Personal &amp; Default Shipping Details
            </h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#fff",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                ✎ Edit Details
              </button>
            )}
          </div>

          <form onSubmit={handleSave}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    backgroundColor: isEditing ? "#fff" : "#f8fafc",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  disabled={!isEditing}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    backgroundColor: isEditing ? "#fff" : "#f8fafc",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>
                  Contact Phone
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    backgroundColor: isEditing ? "#fff" : "#f8fafc",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>
                  City
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    backgroundColor: isEditing ? "#fff" : "#f8fafc",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>
                Delivery Address
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  backgroundColor: isEditing ? "#fff" : "#f8fafc",
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>
                  Postal Code
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    backgroundColor: isEditing ? "#fff" : "#f8fafc",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>
                  Country
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    backgroundColor: isEditing ? "#fff" : "#f8fafc",
                  }}
                />
              </div>
            </div>

            {isEditing && (
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "10px 22px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#000",
                    color: "#fff",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
