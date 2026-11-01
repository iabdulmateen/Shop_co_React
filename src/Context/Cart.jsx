import { createContext, useContext, useState, useEffect } from "react";
import API from "../api";

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
  };

  const removeFromCart = (id, color, size) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !((item.id === id || item._id === id) && item.color === color && item.size === size)
      )
    );
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
    localStorage.removeItem("shopco_cart");
  };

  // Har kisam ki ID (1, 2, 5, 6, ya MongoDB ID) ko valid 24-character ObjectId banana
  const toMongoId = (id) => {
    if (typeof id === 'string' && id.length === 24 && /^[0-9a-fA-F]{24}$/.test(id)) {
      return id;
    }
    const cleanNum = Number(String(id || '1').replace(/\D/g, '')) || 1;
    return cleanNum.toString(16).padStart(24, '0'); // e.g. "000000000000000000000006"
  };

  const placeOrder = async (shippingAddress, customerInfo) => {
    if (cart.length === 0) throw new Error("Cart is empty");

    const orderData = {
      orderItems: cart.map((item) => ({
        name: item.name,
        qty: item.quantity || 1,
        price: item.price,
        imageUrl: item.image || item.imageUrl || "",
        product: toMongoId(item.id || item._id), // 👈 Yeh hamesha valid ID bhejega, kabhi khali nahi chhoray ga!
      })),
      shippingAddress: shippingAddress || {
        address: "Main Boulevard",
        city: "Karachi",
        postalCode: "75000",
        country: "Pakistan",
      },
      customerInfo,
      paymentMethod: "Cash on Delivery",
      totalPrice: cartTotal,
    };

    const res = await API.post("/orders", orderData);
    clearCart();
    return res.data;
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
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// The hook shares this module with the provider component; keep Fast Refresh enabled here.
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);