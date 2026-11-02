import { useState } from "react";
import { Link } from "react-router-dom";
import { useOrders } from "../../Context/OrdersContext.jsx";
import { initialProducts } from "../../data/products.js";
import { useToast } from "../../Context/ToastContext.jsx";
import cloth1 from "../../assets/cloth1.png";

const statusBadgeStyles = {
  Pending: { bg: "#fef9c3", text: "#854d0e" },
  Processing: { bg: "#e0f2fe", text: "#0369a1" },
  Shipped: { bg: "#f3e8ff", text: "#6b21a8" },
  Delivered: { bg: "#dcfce7", text: "#15803d" },
  Cancelled: { bg: "#fee2e2", text: "#b91c1c" },
};

const AdminDashboard = () => {
  const { orders, updateOrderStatus } = useOrders();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState("overview");
  const [productsList, setProductsList] = useState(initialProducts);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // External Admin Dashboard Integration State
  const [externalAdminUrl, setExternalAdminUrl] = useState(() => {
    return localStorage.getItem("external_admin_url") || "http://localhost:5174";
  });
  const [showEmbeddedFrame, setShowEmbeddedFrame] = useState(false);

  // Add Product Form State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    oldPrice: "",
    category: "T-shirts",
    style: "casual",
    rating: 5.0,
  });

  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalPrice) || 0), 0);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    showToast(`Order #${orderId} marked as ${newStatus}`, "success");
  };

  const handleSaveExternalUrl = (e) => {
    e.preventDefault();
    localStorage.setItem("external_admin_url", externalAdminUrl);
    showToast("External Admin Dashboard URL saved!", "success");
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      showToast("Please provide product name and price", "error");
      return;
    }

    const priceNum = Number(newProduct.price);
    const oldPriceNum = newProduct.oldPrice ? Number(newProduct.oldPrice) : null;
    const discount = oldPriceNum && oldPriceNum > priceNum
      ? Math.round(((oldPriceNum - priceNum) / oldPriceNum) * 100)
      : null;

    const created = {
      id: Date.now(),
      name: newProduct.name,
      price: priceNum,
      oldPrice: oldPriceNum,
      discount: discount,
      category: newProduct.category,
      style: newProduct.style,
      rating: 5.0,
      image: cloth1,
      isNew: true,
      description: "Newly added catalog product.",
    };

    setProductsList([created, ...productsList]);
    setIsAddProductOpen(false);
    setNewProduct({ name: "", price: "", oldPrice: "", category: "T-shirts", style: "casual", rating: 5.0 });
    showToast(`Added "${created.name}" to store catalog!`, "success");
  };

  const handleDeleteProduct = (productId) => {
    setProductsList((prev) => prev.filter((p) => p.id !== productId));
    showToast("Product removed from catalog", "info");
  };

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "20px 24px 60px" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", gap: "8px", fontSize: "14px", color: "#64748b", marginBottom: "16px" }}>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
        <span>/</span>
        <strong style={{ color: "#000" }}>Admin Control Center</strong>
      </div>

      {/* Header Banner */}
      <div
        style={{
          backgroundColor: "#0f172a",
          color: "#fff",
          borderRadius: "16px",
          padding: "24px 28px",
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <span style={{ fontSize: "20px" }}>🛡</span>
            <h1 style={{ fontSize: "24px", fontWeight: "800", margin: 0 }}>SHOP.CO ADMIN PORTAL</h1>
            <span
              style={{
                fontSize: "11px",
                padding: "2px 8px",
                borderRadius: "10px",
                backgroundColor: "#10b981",
                color: "#fff",
                fontWeight: "700",
              }}
            >
              LIVE
            </span>
          </div>
          <p style={{ color: "#94a3b8", margin: 0, fontSize: "14px" }}>
            Manage store orders, product catalog, customer fulfillment, and connect your external admin dashboard.
          </p>
        </div>

        {/* Quick Launch External Admin Button */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setActiveTab("connector")}
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              fontWeight: "600",
              fontSize: "13px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <i className="fa-solid fa-link"></i> External Dashboard Connector
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          borderBottom: "2px solid #e2e8f0",
          marginBottom: "24px",
          overflowX: "auto",
        }}
      >
        {[
          { key: "overview", label: "📊 Store Overview" },
          { key: "orders", label: `📦 Orders & Fulfillment (${orders.length})` },
          { key: "products", label: `👕 Products Catalog (${productsList.length})` },
          { key: "connector", label: "🔗 External Dashboard Connector" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: "12px 20px",
              border: "none",
              background: "none",
              fontSize: "14px",
              fontWeight: "600",
              color: activeTab === tab.key ? "#000" : "#64748b",
              borderBottom: activeTab === tab.key ? "3px solid #000" : "3px solid transparent",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "20px" }}>
              <div style={{ color: "#64748b", fontSize: "13px", fontWeight: "600", marginBottom: "8px" }}>
                TOTAL REVENUE
              </div>
              <div style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a" }}>
                ${totalRevenue.toLocaleString()}
              </div>
              <div style={{ fontSize: "12px", color: "#10b981", marginTop: "6px" }}>
                ↑ Based on completed customer orders
              </div>
            </div>

            <div style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "20px" }}>
              <div style={{ color: "#64748b", fontSize: "13px", fontWeight: "600", marginBottom: "8px" }}>
                TOTAL ORDERS
              </div>
              <div style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a" }}>
                {orders.length}
              </div>
              <div style={{ fontSize: "12px", color: "#3b82f6", marginTop: "6px" }}>
                {orders.filter((o) => o.status === "Pending" || o.status === "Processing").length} active orders pending
              </div>
            </div>

            <div style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "20px" }}>
              <div style={{ color: "#64748b", fontSize: "13px", fontWeight: "600", marginBottom: "8px" }}>
                CATALOG PRODUCTS
              </div>
              <div style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a" }}>
                {productsList.length}
              </div>
              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "6px" }}>
                Across 4 styles (Casual, Formal, Party, Gym)
              </div>
            </div>

            <div style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "20px" }}>
              <div style={{ color: "#64748b", fontSize: "13px", fontWeight: "600", marginBottom: "8px" }}>
                EXTERNAL CONNECTOR
              </div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#10b981" }}>
                ● Active
              </div>
              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "6px", overflow: "hidden", textOverflow: "ellipsis" }}>
                Target: {externalAdminUrl}
              </div>
            </div>
          </div>

          {/* Recent Orders Preview */}
          <div style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "700", margin: 0 }}>Recent Incoming Orders</h2>
              <button
                onClick={() => setActiveTab("orders")}
                style={{ background: "none", border: "none", color: "#2563eb", fontWeight: "600", cursor: "pointer", fontSize: "13px" }}
              >
                View All Orders →
              </button>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #f1f5f9", textAlign: "left", color: "#64748b" }}>
                    <th style={{ padding: "10px 8px" }}>Order ID</th>
                    <th style={{ padding: "10px 8px" }}>Customer</th>
                    <th style={{ padding: "10px 8px" }}>City</th>
                    <th style={{ padding: "10px 8px" }}>Items</th>
                    <th style={{ padding: "10px 8px" }}>Total</th>
                    <th style={{ padding: "10px 8px" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((order) => {
                    const badge = statusBadgeStyles[order.status] || statusBadgeStyles.Processing;
                    return (
                      <tr key={order._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "12px 8px", fontWeight: "600" }}>#{order._id}</td>
                        <td style={{ padding: "12px 8px" }}>{order.customerInfo?.name || "Customer"}</td>
                        <td style={{ padding: "12px 8px", color: "#64748b" }}>{order.shippingAddress?.city || "Karachi"}</td>
                        <td style={{ padding: "12px 8px" }}>{order.orderItems?.length || 1} items</td>
                        <td style={{ padding: "12px 8px", fontWeight: "700" }}>${order.totalPrice}</td>
                        <td style={{ padding: "12px 8px" }}>
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: "12px",
                              fontSize: "12px",
                              fontWeight: "700",
                              backgroundColor: badge.bg,
                              color: badge.text,
                            }}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === "orders" && (
        <div style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "700", margin: "0 0 4px 0" }}>Manage Customer Orders</h2>
              <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>
                Update dispatch fulfillment status directly.
              </p>
            </div>
            <div style={{ fontSize: "13px", color: "#64748b" }}>
              Total Orders: <strong>{orders.length}</strong>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f1f5f9", textAlign: "left", color: "#64748b" }}>
                  <th style={{ padding: "12px 8px" }}>Order ID</th>
                  <th style={{ padding: "12px 8px" }}>Customer &amp; Contact</th>
                  <th style={{ padding: "12px 8px" }}>Items Details</th>
                  <th style={{ padding: "12px 8px" }}>Payment</th>
                  <th style={{ padding: "12px 8px" }}>Total</th>
                  <th style={{ padding: "12px 8px" }}>Fulfillment Status</th>
                  <th style={{ padding: "12px 8px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "14px 8px", fontWeight: "700" }}>#{order._id}</td>
                    <td style={{ padding: "14px 8px" }}>
                      <div style={{ fontWeight: "600" }}>{order.customerInfo?.name || "Customer"}</div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>{order.customerInfo?.phone || "N/A"}</div>
                    </td>
                    <td style={{ padding: "14px 8px" }}>
                      {order.orderItems?.map((i, idx) => (
                        <div key={idx} style={{ fontSize: "13px" }}>
                          {i.qty}x {i.name}
                        </div>
                      ))}
                    </td>
                    <td style={{ padding: "14px 8px", fontSize: "13px" }}>{order.paymentMethod}</td>
                    <td style={{ padding: "14px 8px", fontWeight: "700" }}>${order.totalPrice}</td>
                    <td style={{ padding: "14px 8px" }}>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        style={{
                          padding: "6px 10px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "13px",
                          fontWeight: "600",
                          backgroundColor: statusBadgeStyles[order.status]?.bg || "#f8fafc",
                          color: statusBadgeStyles[order.status]?.text || "#0f172a",
                          cursor: "pointer",
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td style={{ padding: "14px 8px" }}>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "6px",
                          border: "1px solid #cbd5e1",
                          background: "#fff",
                          fontSize: "12px",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PRODUCTS CATALOG */}
      {activeTab === "products" && (
        <div style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "700", margin: "0 0 4px 0" }}>Manage Store Catalog</h2>
              <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>
                Add new styles, adjust pricing, and toggle item availability.
              </p>
            </div>
            <button
              onClick={() => setIsAddProductOpen(true)}
              style={{
                padding: "10px 18px",
                borderRadius: "8px",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                fontWeight: "600",
                fontSize: "13px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              + Add New Product
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f1f5f9", textAlign: "left", color: "#64748b" }}>
                  <th style={{ padding: "12px 8px" }}>Product</th>
                  <th style={{ padding: "12px 8px" }}>Category</th>
                  <th style={{ padding: "12px 8px" }}>Style</th>
                  <th style={{ padding: "12px 8px" }}>Price</th>
                  <th style={{ padding: "12px 8px" }}>Rating</th>
                  <th style={{ padding: "12px 8px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {productsList.map((product) => (
                  <tr key={product.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "12px 8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: "42px", height: "42px", objectFit: "contain", backgroundColor: "#f8fafc", borderRadius: "6px" }}
                        />
                        <div>
                          <div style={{ fontWeight: "600" }}>{product.name}</div>
                          {product.discount && (
                            <span style={{ fontSize: "11px", color: "#ef4444" }}>-{product.discount}% Discount</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "12px 8px", color: "#475569" }}>{product.category}</td>
                    <td style={{ padding: "12px 8px", textTransform: "capitalize", color: "#475569" }}>{product.style || "casual"}</td>
                    <td style={{ padding: "12px 8px", fontWeight: "700" }}>${product.price}</td>
                    <td style={{ padding: "12px 8px" }}>★ {product.rating || 4.5}</td>
                    <td style={{ padding: "12px 8px" }}>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "6px",
                          border: "1px solid #fee2e2",
                          backgroundColor: "#fef2f2",
                          color: "#ef4444",
                          fontSize: "12px",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: EXTERNAL DASHBOARD CONNECTOR */}
      {activeTab === "connector" && (
        <div style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <span style={{ fontSize: "28px" }}>🔌</span>
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "800", margin: 0 }}>
                Connect Your External Admin Dashboard
              </h2>
              <p style={{ color: "#64748b", fontSize: "14px", margin: "4px 0 0 0" }}>
                Wire your custom admin panel with this e-commerce store in real time.
              </p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#10b981" }}></div>
            <div style={{ fontSize: "14px", color: "#166534" }}>
              <strong>Bridge Status:</strong> Ready to receive and synchronize orders with your separate dashboard.
            </div>
          </div>

          <form onSubmit={handleSaveExternalUrl} style={{ marginBottom: "28px" }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "700", marginBottom: "6px" }}>
              Your External Admin Dashboard URL
            </label>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <input
                type="text"
                required
                value={externalAdminUrl}
                onChange={(e) => setExternalAdminUrl(e.target.value)}
                placeholder="e.g. http://localhost:5174 or https://my-admin.vercel.app"
                style={{
                  flex: 1,
                  minWidth: "280px",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "14px",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "12px 20px",
                  borderRadius: "8px",
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "none",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Save URL
              </button>
              <a
                href={externalAdminUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  backgroundColor: "#2563eb",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Launch Dashboard <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
              <button
                type="button"
                onClick={() => setShowEmbeddedFrame(!showEmbeddedFrame)}
                style={{
                  padding: "12px 18px",
                  borderRadius: "8px",
                  backgroundColor: "#f1f5f9",
                  color: "#334155",
                  border: "1px solid #cbd5e1",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {showEmbeddedFrame ? "Hide Embedded View" : "Embed Preview"}
              </button>
            </div>
            <p style={{ fontSize: "12px", color: "#64748b", marginTop: "6px" }}>
              Save the local port or hosted URL where your separate admin dashboard is running.
            </p>
          </form>

          {/* Embedded Frame Preview */}
          {showEmbeddedFrame && (
            <div style={{ marginBottom: "28px", border: "1px solid #cbd5e1", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ padding: "8px 14px", backgroundColor: "#f8fafc", borderBottom: "1px solid #cbd5e1", fontSize: "12px", fontWeight: "600", color: "#64748b" }}>
                Embedded View: {externalAdminUrl}
              </div>
              <iframe
                src={externalAdminUrl}
                title="External Admin Dashboard"
                style={{ width: "100%", height: "500px", border: "none" }}
              />
            </div>
          )}

          {/* API Webhook Documentation for the user's dashboard */}
          <div style={{ backgroundColor: "#f8fafc", borderRadius: "12px", padding: "20px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "700", marginTop: 0, marginBottom: "12px" }}>
              API Endpoints for Your External Dashboard
            </h3>
            <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px 0" }}>
              Your external dashboard can interact with this store using the endpoints below:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }}>
                <span style={{ backgroundColor: "#dbeafe", color: "#1e40af", padding: "2px 6px", borderRadius: "4px", fontWeight: "700", marginRight: "8px" }}>
                  GET
                </span>
                <code>/api/orders</code> - Fetch all customer orders and fulfillment states
              </div>

              <div style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }}>
                <span style={{ backgroundColor: "#dcfce7", color: "#166534", padding: "2px 6px", borderRadius: "4px", fontWeight: "700", marginRight: "8px" }}>
                  POST
                </span>
                <code>/api/orders</code> - Create or sync new orders
              </div>

              <div style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }}>
                <span style={{ backgroundColor: "#fef9c3", color: "#854d0e", padding: "2px 6px", borderRadius: "4px", fontWeight: "700", marginRight: "8px" }}>
                  PUT
                </span>
                <code>/api/orders/:id/status</code> - Update order status (Pending, Shipped, Delivered)
              </div>

              <div style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }}>
                <span style={{ backgroundColor: "#dbeafe", color: "#1e40af", padding: "2px 6px", borderRadius: "4px", fontWeight: "700", marginRight: "8px" }}>
                  GET
                </span>
                <code>/api/products</code> - List store products catalog
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inspect Order Modal */}
      {selectedOrder && (
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
              maxWidth: "520px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "18px", margin: 0, fontWeight: "700" }}>Order #{selectedOrder._id}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: "14px", backgroundColor: "#f8fafc", borderRadius: "10px", marginBottom: "16px", fontSize: "13px" }}>
              <p style={{ margin: "0 0 6px 0" }}><strong>Customer Name:</strong> {selectedOrder.customerInfo?.name}</p>
              <p style={{ margin: "0 0 6px 0" }}><strong>Phone:</strong> {selectedOrder.customerInfo?.phone}</p>
              <p style={{ margin: "0 0 6px 0" }}>
                <strong>Shipping Address:</strong> {selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city} ({selectedOrder.shippingAddress?.postalCode})
              </p>
              <p style={{ margin: "0 0 6px 0" }}><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
              <p style={{ margin: 0 }}><strong>Status:</strong> {selectedOrder.status}</p>
            </div>

            <h3 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "10px" }}>Ordered Items</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
              {selectedOrder.orderItems?.map((item, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", borderBottom: "1px solid #f1f5f9", paddingBottom: "6px" }}>
                  <span>{item.qty}x {item.name}</span>
                  <strong>${item.price * (item.qty || 1)}</strong>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "800", marginBottom: "20px" }}>
              <span>Total:</span>
              <span>${selectedOrder.totalPrice}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "none",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddProductOpen && (
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "18px", margin: 0, fontWeight: "700" }}>Add New Product</h2>
              <button
                onClick={() => setIsAddProductOpen(false)}
                style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProduct}>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vintage Leather Jacket"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="120"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>
                    Old Price ($)
                  </label>
                  <input
                    type="number"
                    placeholder="150"
                    value={newProduct.oldPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, oldPrice: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>
                    Category
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#fff" }}
                  >
                    <option value="T-shirts">T-shirts</option>
                    <option value="Shirts">Shirts</option>
                    <option value="Jeans">Jeans</option>
                    <option value="Shorts">Shorts</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>
                    Dress Style
                  </label>
                  <select
                    value={newProduct.style}
                    onChange={(e) => setNewProduct({ ...newProduct, style: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#fff" }}
                  >
                    <option value="casual">Casual</option>
                    <option value="formal">Formal</option>
                    <option value="party">Party</option>
                    <option value="gym">Gym</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  style={{ padding: "10px 18px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#fff", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "10px 22px", borderRadius: "8px", border: "none", background: "#000", color: "#fff", fontWeight: "600", cursor: "pointer" }}
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
