import { createContext, useContext, useState, useEffect } from "react";
import API from "../api";
import { useToast } from "./ToastContext";
import { useOrders } from "./OrdersContext";

const CartContext = createContext();

const toMongoId = (id) => {
  if (typeof id === "string" && id.length === 24 && /^[0-9a-fA-F]{24}$/.test(id)) {
    return id;
  }
  const cleanNum = Number(String(id || "1").replace(/\D/g, "")) || 1;
  return cleanNum.toString(16).padStart(24, "0");
};

const generateMockOrder = (orderData) => ({
  _id: "ORD-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
  ...orderData,
  status: "Pending",
  createdAt: new Date().toISOString(),
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("shopco_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  const { showToast } = useToast();
  const { addOrder } = useOrders();

  useEffect(() => {
    try {
      localStorage.setItem("shopco_cart", JSON.stringify(cart));
    } catch (err) {
      console.warn("Failed to save cart to localStorage", err);
    }
  }, [cart]);

  const addToCart = (product) => {
    const productId = product._id || product.id;

    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) =>
          (item._id === productId || item.id === productId) &&
          item.color === product.color &&
          item.size === product.size
      );

      if (existingProduct) {
        return prevCart.map((item) =>
          (item._id === productId || item.id === productId) &&
          item.color === product.color &&
          item.size === product.size
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          id: productId,
          _id: productId,
          quantity: product.quantity || 1,
        },
      ];
    });

    showToast(`Added "${product.name || "Item"}" to cart!`, "success");
  };

  const removeFromCart = (id, color, size) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !((item.id === id || item._id === id) && item.color === color && item.size === size)
      )
    );
    showToast("Item removed from cart", "info");
  };

  const increaseQuantity = (id, color, size) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        (item.id === id || item._id === id) && item.color === color && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id, color, size) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          (item.id === id || item._id === id) && item.color === color && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode("");
    setDiscountPercent(0);
    localStorage.removeItem("shopco_cart");
  };

  const applyPromo = (code) => {
    const clean = (code || "").trim().toUpperCase();
    if (clean === "SHOP20") {
      setPromoCode("SHOP20");
      setDiscountPercent(20);
      showToast("Promo SHOP20 applied! (20% off)", "success");
      return { success: true, message: "20% discount applied!" };
    }
    if (clean === "SAVE10") {
      setPromoCode("SAVE10");
      setDiscountPercent(10);
      showToast("Promo SAVE10 applied! (10% off)", "success");
      return { success: true, message: "10% discount applied!" };
    }
    if (clean === "SHOP50") {
      setPromoCode("SHOP50");
      setDiscountPercent(50);
      showToast("Super Promo SHOP50 applied! (50% off)", "success");
      return { success: true, message: "50% discount applied!" };
    }
    showToast("Invalid promo code. Try SHOP20 or SAVE10", "error");
    return { success: false, message: "Invalid promo code" };
  };

  const placeOrder = async (shippingAddress, customerInfo, paymentMethod = "Cash on Delivery", finalTotal) => {
    if (cart.length === 0) throw new Error("Cart is empty");

    const orderData = {
      orderItems: cart.map((item) => ({
        name: item.name,
        qty: item.quantity || 1,
        price: item.price,
        imageUrl: item.image || item.imageUrl || "",
        size: item.size || "M",
        color: item.color || "black",
        product: toMongoId(item.id || item._id),
      })),
      shippingAddress: shippingAddress || {
        address: "Main Boulevard",
        city: "Karachi",
        postalCode: "75000",
        country: "Pakistan",
      },
      customerInfo,
      paymentMethod,
      totalPrice: finalTotal || cartTotal,
      promoCode: promoCode || null,
      status: "Processing",
    };

    let placed;
    try {
      const res = await API.post("/orders", orderData);
      placed = res.data;
    } catch {
      // In-memory fallback if backend is offline / not running
      placed = generateMockOrder(orderData);
    }

    addOrder(placed);
    clearCart();
    showToast(`Order #${placed._id} placed successfully!`, "success");
    return placed;
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        placeOrder,
        applyPromo,
        promoCode,
        discountPercent,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);