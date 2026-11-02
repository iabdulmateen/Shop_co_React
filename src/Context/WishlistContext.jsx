import { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("shopco_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem("shopco_wishlist", JSON.stringify(wishlist));
    } catch (err) {
      console.warn("Failed to save wishlist", err);
    }
  }, [wishlist]);

  const isInWishlist = (id) => {
    const checkId = String(id);
    return wishlist.some(
      (item) => String(item.id || item._id) === checkId
    );
  };

  const toggleWishlist = (product) => {
    const id = product.id || product._id;
    if (isInWishlist(id)) {
      setWishlist((prev) =>
        prev.filter((item) => String(item.id || item._id) !== String(id))
      );
      showToast(`Removed "${product.name}" from Wishlist`, "info");
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Added "${product.name}" to Wishlist!`, "success");
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) =>
      prev.filter((item) => String(item.id || item._id) !== String(id))
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => useContext(WishlistContext);
