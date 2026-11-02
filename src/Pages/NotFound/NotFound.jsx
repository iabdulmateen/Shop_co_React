import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "100px 20px 120px" }}>
      <h1 style={{ fontSize: "72px", fontWeight: "900", margin: "0 0 10px 0", letterSpacing: "-2px" }}>404</h1>
      <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "12px" }}>Page Not Found</h2>
      <p style={{ color: "#64748b", maxWidth: "460px", margin: "0 auto 28px", fontSize: "15px" }}>
        The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
        <Link
          to="/"
          style={{
            padding: "12px 24px",
            borderRadius: "25px",
            backgroundColor: "#000",
            color: "#fff",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "14px",
          }}
        >
          Return to Home
        </Link>
        <Link
          to="/category"
          style={{
            padding: "12px 24px",
            borderRadius: "25px",
            backgroundColor: "#f1f5f9",
            color: "#0f172a",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "14px",
            border: "1px solid #cbd5e1",
          }}
        >
          Browse Shop
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
