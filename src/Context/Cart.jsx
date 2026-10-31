import { createContext, useContext, useState, useEffect } from "react";
import API from "../api"; // API client

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // LocalStorage se cart load karein (refresh par delete na ho)
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("shopco_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Jab bhi cart change ho, localStorage me update ho jaye
  useEffect(() => {
    try {
      localStorage.setItem("shopco_cart", JSON.stringify(cart));
    } catch (err) {
      console.warn("Failed to save cart to localStorage", err);
    }
  }, [cart]);

  // =========================
  // ADD TO CART
  // =========================
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
  };

  // =========================
  // REMOVE FROM CART
  // =========================
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
  };

  // =========================
  // INCREASE QUANTITY
  // =========================
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

  // =========================
  // DECREASE QUANTITY
  // =========================
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

  // =========================
  // CLEAR CART
  // =========================
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("shopco_cart");
  };

  // =========================
  // PLACE REAL ORDER (API)
  // =========================
  const placeOrder = async (shippingAddress) => {
    if (cart.length === 0) {
      throw new Error("Your cart is empty");
    }

    const orderData = {
      orderItems: cart.map((item) => ({
        name: item.name,
        qty: item.quantity,
        price: item.price,
        imageUrl: item.image || item.imageUrl,
        product: item._id || item.id,
      })),
      shippingAddress: shippingAddress || {
        address: "Default Address",
        city: "Karachi",
        postalCode: "75000",
        country: "Pakistan",
      },
      paymentMethod: "Cash on Delivery",
      totalPrice: cartTotal,
    };

    const res = await API.post("/orders", orderData);
    clearCart();
    return res.data;
  };

  // Totals
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