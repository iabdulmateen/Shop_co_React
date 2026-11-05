
import { createContext, useContext, useState, useEffect } from "react";
import API from "../api";
import { useToast } from "./ToastContext";
import { useOrders } from "./OrdersContext";

const CartContext = createContext();

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

  // Save cart whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("shopco_cart", JSON.stringify(cart));
    } catch (err) {
      console.warn("Failed to save cart:", err);
    }
  }, [cart]);

  // Add product to cart
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
            ? {
                ...item,
                quantity: item.quantity + (product.quantity || 1),
              }
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

  // Remove product from cart
  const removeFromCart = (id, color, size) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            (item.id === id || item._id === id) &&
            item.color === color &&
            item.size === size
          )
      )
    );

    showToast("Item removed from cart", "info");
  };

  // Increase quantity
  const increaseQuantity = (id, color, size) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        (item.id === id || item._id === id) &&
        item.color === color &&
        item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id, color, size) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          (item.id === id || item._id === id) &&
          item.color === color &&
          item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    setPromoCode("");
    setDiscountPercent(0);

    localStorage.removeItem("shopco_cart");
  };

  // Apply promo code
  const applyPromo = (code) => {
    const clean = (code || "").trim().toUpperCase();

    if (clean === "SHOP20") {
      setPromoCode("SHOP20");
      setDiscountPercent(20);

      showToast("Promo SHOP20 applied! (20% off)", "success");

      return {
        success: true,
        message: "20% discount applied!",
      };
    }

    if (clean === "SAVE10") {
      setPromoCode("SAVE10");
      setDiscountPercent(10);

      showToast("Promo SAVE10 applied! (10% off)", "success");

      return {
        success: true,
        message: "10% discount applied!",
      };
    }

    if (clean === "SHOP50") {
      setPromoCode("SHOP50");
      setDiscountPercent(50);

      showToast("Super Promo SHOP50 applied! (50% off)", "success");

      return {
        success: true,
        message: "50% discount applied!",
      };
    }

    showToast("Invalid promo code. Try SHOP20 or SAVE10", "error");

    return {
      success: false,
      message: "Invalid promo code",
    };
  };

  // Place order through backend
  const placeOrder = async (
    shippingAddress,
    customerInfo,
    paymentMethod = "Cash on Delivery"
  ) => {
    if (cart.length === 0) {
      throw new Error("Cart is empty");
    }

    if (
      !shippingAddress ||
      !shippingAddress.address?.trim() ||
      !shippingAddress.city?.trim() ||
      !shippingAddress.postalCode?.trim() ||
      !shippingAddress.country?.trim()
    ) {
      throw new Error("Please provide complete shipping address");
    }

    // Only send real MongoDB product IDs
    const orderItems = cart.map((item) => {
      const productId = item._id || item.id;

      if (
        typeof productId !== "string" ||
        !/^[0-9a-fA-F]{24}$/.test(productId)
      ) {
        throw new Error(
          `Invalid product ID for "${item.name}". Please refresh products and add the product again.`
        );
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity < 1) {
        throw new Error(`Invalid quantity for "${item.name}"`);
      }

      return {
        product: productId,
        qty: quantity,
      };
    });

    const orderData = {
      orderItems,
      shippingAddress,
      customerInfo: customerInfo || {},
      paymentMethod,
    };

    try {
      // Save order in MongoDB through backend
      const res = await API.post("/orders", orderData);

      const placedOrder = res.data;

      if (!placedOrder || !placedOrder._id) {
        throw new Error("Backend did not return a valid order");
      }

      // Add confirmed order to local OrdersContext
      addOrder(placedOrder);

      // Clear cart only after successful backend response
      clearCart();

      showToast(
        `Order #${placedOrder._id} placed successfully!`,
        "success"
      );

      return placedOrder;
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.message ||
        "Unable to place order. Please try again.";

      showToast(message, "error");

      // Keep cart intact if order fails
      throw new Error(message, { cause: error });
    }
  };

  // Cart calculations
  const cartCount = cart.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

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
