import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useToast } from "../../Context/ToastContext.jsx";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        await register(name, email, password);
        showToast("Account created successfully! Welcome to Shop.co", "success");
      } else {
        await login(email, password);
        showToast("Welcome back to Shop.co!", "success");
      }
      navigate("/");
    } catch {
      showToast("Authentication failed. Please verify credentials.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role) => {
    setLoading(true);
    if (role === "admin") {
      await login("admin@shop.co", "admin123");
      showToast("Logged in as Admin Manager!", "success");
    } else {
      await login("customer@shop.co", "123456");
      showToast("Logged in as Demo Customer!", "success");
    }
    setLoading(false);
    navigate("/");
  };

  return (
    <div style={{ maxWidth: "480px", margin: "40px auto 80px", padding: "0 20px" }}>
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e2e8f0",
        }}
      >
        {/* Toggle Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            backgroundColor: "#f1f5f9",
            borderRadius: "12px",
            padding: "4px",
            marginBottom: "24px",
          }}
        >
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            style={{
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: !isRegister ? "#000" : "transparent",
              color: !isRegister ? "#fff" : "#64748b",
              fontWeight: "600",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            style={{
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: isRegister ? "#000" : "transparent",
              color: isRegister ? "#fff" : "#64748b",
              fontWeight: "600",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Create Account
          </button>
        </div>

        <h1 style={{ fontSize: "24px", fontWeight: "800", margin: "0 0 8px 0" }}>
          {isRegister ? "Join Shop.co" : "Welcome Back"}
        </h1>
        <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 20px 0" }}>
          {isRegister
            ? "Create an account to track shipments and save favorite styles."
            : "Sign in to access your profile, orders, and saved wishlist."}
        </p>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Abdul Mateen"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #cbd5e1" }}
              />
            </div>
          )}

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
              Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="e.g. you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #cbd5e1" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
              Password *
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #cbd5e1" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "25px",
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              fontSize: "15px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              marginBottom: "16px",
            }}
          >
            {loading ? "Processing..." : isRegister ? "Create Account" : "Sign In"}
          </button>
        </form>

        {/* Quick Demo Access */}
        <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "18px", marginTop: "10px" }}>
          <div style={{ textAlign: "center", fontSize: "12px", color: "#64748b", marginBottom: "12px" }}>
            OR TRY ONE-CLICK DEMO ACCESS
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <button
              type="button"
              onClick={() => handleDemoLogin("customer")}
              style={{
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#f8fafc",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Demo Customer
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              style={{
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #fca5a5",
                backgroundColor: "#fef2f2",
                color: "#b91c1c",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Demo Admin
            </button>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to="/" style={{ color: "#64748b", fontSize: "13px", textDecoration: "none" }}>
            ← Return to Store
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
