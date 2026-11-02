import { Link } from "react-router-dom";
import { useWishlist } from "../../Context/WishlistContext.jsx";
import { useCart } from "../../Context/Cart.jsx";
import ProductCard from "../../Components/ProductCard/ProductCard.jsx";

const Wishlist = () => {
  const { wishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddAllToCart = () => {
    wishlist.forEach((item) => {
      addToCart({
        ...item,
        id: item._id || item.id,
        image: item.image || item.imageUrl,
      });
    });
  };

  return (
    <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "20px 24px 60px" }}>
      <div style={{ display: "flex", gap: "8px", fontSize: "14px", color: "#64748b", marginBottom: "20px" }}>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
        <span>/</span>
        <strong style={{ color: "#000" }}>Wishlist</strong>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "800", margin: "0 0 6px 0" }}>MY WISHLIST</h1>
          <p style={{ color: "#64748b", margin: 0, fontSize: "14px" }}>
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>

        {wishlist.length > 0 && (
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleAddAllToCart}
              style={{
                padding: "10px 18px",
                borderRadius: "20px",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                fontWeight: "600",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Add All to Cart
            </button>
            <button
              onClick={clearWishlist}
              style={{
                padding: "10px 18px",
                borderRadius: "20px",
                backgroundColor: "#f1f5f9",
                color: "#64748b",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
            backgroundColor: "#f8fafc",
            borderRadius: "16px",
            border: "1px dashed #cbd5e1",
          }}
        >
          <div style={{ fontSize: "48px", color: "#94a3b8", marginBottom: "16px" }}>♡</div>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>Your wishlist is empty</h2>
          <p style={{ color: "#64748b", maxWidth: "400px", margin: "0 auto 24px", fontSize: "14px" }}>
            Browse our stylish collection and tap the heart icon on any product to save it here for later.
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
            Explore Collections
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {wishlist.map((product) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
