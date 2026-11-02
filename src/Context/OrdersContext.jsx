import { createContext, useContext, useState, useEffect } from "react";
import cloth1 from "../assets/cloth1.png";
import cloth2 from "../assets/cloth2.png";
import cloth5 from "../assets/cloth5.png";

const OrdersContext = createContext();

const initialDemoOrders = [
  {
    _id: "ORD-948210A",
    createdAt: "2026-10-28T14:32:00.000Z",
    status: "Delivered",
    paymentMethod: "Cash on Delivery",
    totalPrice: 360,
    shippingAddress: {
      address: "House 42, Street 8, DHA Phase 6",
      city: "Karachi",
      postalCode: "75500",
      country: "Pakistan",
    },
    customerInfo: {
      name: "Hamza Tariq",
      phone: "+92 321 9876543",
    },
    orderItems: [
      { name: "T-shirt with Tape Details", qty: 1, price: 120, imageUrl: cloth1, size: "Large", color: "brown" },
      { name: "Skinny Fit Jeans", qty: 1, price: 240, imageUrl: cloth2, size: "Medium", color: "navy" },
    ],
  },
  {
    _id: "ORD-719342B",
    createdAt: "2026-10-31T09:15:00.000Z",
    status: "Processing",
    paymentMethod: "Credit Card (Online)",
    totalPrice: 212,
    shippingAddress: {
      address: "Flat 302, Palm Residency, Clifton",
      city: "Karachi",
      postalCode: "75600",
      country: "Pakistan",
    },
    customerInfo: {
      name: "Sara Khan",
      phone: "+92 300 5551234",
    },
    orderItems: [
      { name: "Vertical Striped Shirt", qty: 1, price: 212, imageUrl: cloth5, size: "Medium", color: "green" },
    ],
  },
];

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("shopco_orders");
      return saved ? JSON.parse(saved) : initialDemoOrders;
    } catch {
      return initialDemoOrders;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("shopco_orders", JSON.stringify(orders));
    } catch (err) {
      console.warn("Failed to persist orders", err);
    }
  }, [orders]);

  const addOrder = (order) => {
    const formattedOrder = {
      ...order,
      _id: order._id || "ORD-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
      createdAt: order.createdAt || new Date().toISOString(),
      status: order.status || "Pending",
    };
    setOrders((prev) => [formattedOrder, ...prev]);
    return formattedOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useOrders = () => useContext(OrdersContext);
