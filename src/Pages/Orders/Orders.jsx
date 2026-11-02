import { useState } from "react";
import { Link } from "react-router-dom";
import { useOrders } from "../../Context/OrdersContext.jsx";

const statusColors = {
  Pending: { bg: "#fef9c3", text: "#854d0e", border: "#fde047" },
  Processing: { bg: "#e0f2fe", text: "#0369a1", border: "#7dd3fc" },
  Shipped: { bg: "#f3e8ff", text: "#6b21a8", border: "#d8b4fe" },
  Delivered: { bg: "#dcfce7", text: "#15803d", border: "#86efac" },
  Cancelled: { bg: "#fee2e2", text: "#b91c1c", border: "#fca5a5" },
};

const Orders = () => {
  const { orders } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "20px 24px 60px" }}>
      <div style={{ display: "flex", gap: "8px", fontSize: "14px", color: "#64748b", marginBottom: "20px" }}>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
        <span>/</span>
        <strong style={{ color: "#000" }}>My Orders</strong>
      </div>

      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", margin: "0 0 6px 0" }}>MY ORDERS &amp; TRACKING</h1>
        <p style={{ color: "#64748b", margin: 0, fontSize: "14px" }}>
          Check real-time dispatch progress, delivery status, and order receipts.
        </p>
      </div>

      {orders.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
            backgroundColor: "#f8fafc",
            borderRadius: "16px",
            border: "1px dashed #cbd5e1",
          }}
        >
          <div style={{ fontSize: "48px", color: "#94a3b8", marginBottom: "16px" }}>📦</div>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>No orders placed yet</h2>
          <p style={{ color: "#64748b", maxWidth: "420px", margin: "0 auto 24px", fontSize: "14px" }}>
            When you complete checkout, your order receipt and tracking timeline will appear here automatically.
          </p>
          <Link
            to="/category"
            style={{
              display: "inline-block",
              padding: "12px 28px",
              borderRadius: "25px",
              backgroundColor: "#000",
              color: "#fff",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {orders.map((order) => {
            const statusStyle = statusColors[order.status] || statusColors.Processing;
            const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={order._id}
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "14px",
                  padding: "20px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    borderBottom: "1px solid #f1f5f9",
                    paddingBottom: "14px",
                    marginBottom: "16px",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "17px", fontWeight: "700", color: "#0f172a" }}>
                        Order #{order._id}
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          padding: "3px 10px",
                          borderRadius: "12px",
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.text,
                          border: `1px solid ${statusStyle.border}`,
                        }}
                      >
                        ● {order.status}
                      </span>
                    </div>
                    <div style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
                      Placed on {formattedDate} • Payment: {order.paymentMethod}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>Total Amount</div>
                    <div style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>
                      ${order.totalPrice}
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {order.orderItems?.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        padding: "8px 0",
                      }}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        style={{
                          width: "56px",
                          height: "56px",
                          objectFit: "contain",
                          backgroundColor: "#f8fafc",
                          borderRadius: "8px",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b" }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                          Qty: {item.qty} {item.size && `• Size: ${item.size}`} {item.color && `• Color: ${item.color}`}
                        </div>
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: "700" }}>
                        ${item.price * (item.qty || 1)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Info */}
                <div
                  style={{
                    marginTop: "16px",
                    paddingTop: "14px",
                    borderTop: "1px solid #f1f5f9",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "10px",
                    fontSize: "13px",
                    color: "#475569",
                  }}
                >
                  <div>
                    <strong>Delivering to:</strong> {order.shippingAddress?.address},{" "}
                    {order.shippingAddress?.city} ({order.shippingAddress?.postalCode || "Pakistan"})
                  </div>

                  <button
                    onClick={() => setSelectedOrder(order)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "6px",
                      border: "1px solid #cbd5e1",
                      backgroundColor: "#f8fafc",
                      fontSize: "12px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    View Receipt / Tracking
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Order Tracking Modal */}
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
              <h2 style={{ fontSize: "20px", margin: 0, fontWeight: "700" }}>
                Tracking Details (#{selectedOrder._id})
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}
              >
                ✕
              </button>
            </div>

            {/* Tracking Progress Steps */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gap: "8px",
                marginBottom: "24px",
                textAlign: "center",
                fontSize: "11px",
                fontWeight: "600",
              }}
            >
              {[
                { label: "Order Placed", done: true },
                { label: "Processing", done: ["Processing", "Shipped", "Delivered"].includes(selectedOrder.status) },
                { label: "Shipped", done: ["Shipped", "Delivered"].includes(selectedOrder.status) },
                { label: "Delivered", done: selectedOrder.status === "Delivered" },
              ].map((step, sIdx) => (
                <div key={sIdx}>
                  <div
                    style={{
                      height: "6px",
                      borderRadius: "3px",
                      backgroundColor: step.done ? "#10b981" : "#e2e8f0",
                      marginBottom: "6px",
                    }}
                  ></div>
                  <span style={{ color: step.done ? "#047857" : "#94a3b8" }}>{step.label}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: "14px", backgroundColor: "#f8fafc", borderRadius: "10px", marginBottom: "16px" }}>
              <div style={{ fontSize: "13px", marginBottom: "6px" }}>
                <strong>Customer Name:</strong> {selectedOrder.customerInfo?.name || "Customer"}
              </div>
              <div style={{ fontSize: "13px", marginBottom: "6px" }}>
                <strong>Contact Phone:</strong> {selectedOrder.customerInfo?.phone || "N/A"}
              </div>
              <div style={{ fontSize: "13px", marginBottom: "6px" }}>
                <strong>Shipping Address:</strong> {selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city}
              </div>
              <div style={{ fontSize: "13px" }}>
                <strong>Estimated Arrival:</strong> 2 - 4 business days
              </div>
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
    </div>
  );
};

export default Orders;
