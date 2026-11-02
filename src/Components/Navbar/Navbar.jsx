import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import logo from "../../assets/logo.png";
import { useCart } from "../../Context/Cart.jsx";
import { useWishlist } from "../../Context/WishlistContext.jsx";
import { useAuth } from "../../Context/AuthContext.jsx";
import { initialProducts } from "../../data/products.js";

const Navbar = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAdmin, logout, login } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchBoxRef = useRef(null);
  const userMenuRef = useRef(null);

  // Filter products for the live search preview dropdown
  const searchResults = searchQuery.trim()
    ? initialProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.style && p.style.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setShowSearchResults(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchResults(false);
      navigate(`/category?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSelectProduct = (product) => {
    setShowSearchResults(false);
    setSearchQuery("");
    navigate(`/product/${product.id}`, { state: product });
  };

  const handleScrollToBrands = () => {
    setMobileMenuOpen(false);
    navigate("/");
    setTimeout(() => {
      const el = document.querySelector(".brand-strip");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <nav className="navbar">
      {/* Mobile Hamburger Button */}
      <button
        type="button"
        className="mobile-menu-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          display: "none",
          background: "none",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
          marginRight: "10px",
        }}
        aria-label="Toggle menu"
      >
        <i className={mobileMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
      </button>

      {/* Brand Logo */}
      <Link to="/" className="navlogo" onClick={() => setMobileMenuOpen(false)}>
        <img src={logo} alt="SHOP.CO Logo" />
      </Link>

      {/* Nav List */}
      <ul className={`navlist ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <li>
          <Link to="/category" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
        </li>
        <li>
          <Link to="/category?filter=sale" onClick={() => setMobileMenuOpen(false)}>On Sale</Link>
        </li>
        <li>
          <Link to="/category?filter=new" onClick={() => setMobileMenuOpen(false)}>New Arrival</Link>
        </li>
        <li>
          <span onClick={handleScrollToBrands} style={{ cursor: "pointer" }}>Brands</span>
        </li>
      </ul>

      {/* Live Search Box */}
      <div className="search-box" ref={searchBoxRef}>
        <form onSubmit={handleSearchSubmit} style={{ display: "flex", width: "100%" }}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search for clothes, styles, categories..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => setShowSearchResults(true)}
          />
        </form>

        {/* Live Search Results Dropdown */}
        {showSearchResults && searchQuery.trim().length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              right: 0,
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
              overflow: "hidden",
              border: "1px solid #e2e8f0",
            }}
          >
            {searchResults.length === 0 ? (
              <div style={{ padding: "16px", textAlign: "center", color: "#64748b", fontSize: "14px" }}>
                No products found for "{searchQuery}"
              </div>
            ) : (
              <div>
                <div style={{ padding: "10px 14px", backgroundColor: "#f8fafc", fontSize: "12px", fontWeight: "600", color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>
                  MATCHING PRODUCTS ({searchResults.length})
                </div>
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectProduct(item)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 14px",
                      cursor: "pointer",
                      borderBottom: "1px solid #f1f5f9",
                      transition: "background-color 0.15s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "42px", height: "42px", objectFit: "contain", backgroundColor: "#f1f5f9", borderRadius: "6px" }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>
                        {item.category} • ${item.price}
                      </div>
                    </div>
                    {item.discount && (
                      <span style={{ fontSize: "11px", backgroundColor: "#fee2e2", color: "#ef4444", padding: "2px 6px", borderRadius: "4px", fontWeight: "600" }}>
                        -{item.discount}%
                      </span>
                    )}
                  </div>
                ))}

                <button
                  onClick={handleSearchSubmit}
                  style={{
                    width: "100%",
                    padding: "10px",
                    textAlign: "center",
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "none",
                    fontSize: "13px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  View All Results for "{searchQuery}" →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Icons: Wishlist, Cart, User Dropdown */}
      <div className="nav-icons">
        {/* Wishlist Link */}
        <Link to="/wishlist" className="cart-icon-wrapper" title="My Wishlist">
          <i className="fa-regular fa-heart"></i>
          {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
        </Link>

        {/* Cart Link */}
        <Link to="/cart" className="cart-icon-wrapper" title="Shopping Cart">
          <i className="fa-solid fa-cart-shopping"></i>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>

        {/* User Account Dropdown */}
        <div style={{ position: "relative" }} ref={userMenuRef}>
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
            }}
            aria-label="User Account"
          >
            {user ? (
              <span
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: isAdmin ? "#ef4444" : "#000",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </span>
            ) : (
              <i className="fa-regular fa-circle-user"></i>
            )}
          </button>

          {/* User Popover Menu */}
          {showUserMenu && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 12px)",
                right: 0,
                width: "240px",
                backgroundColor: "#fff",
                borderRadius: "14px",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
                padding: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              {user ? (
                <div>
                  <div style={{ paddingBottom: "10px", borderBottom: "1px solid #f1f5f9", marginBottom: "8px" }}>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>
                      {user.name}
                    </div>
                    <div style={{ fontSize: "12px", color: "#64748b", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {user.email}
                    </div>
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: "4px",
                        fontSize: "10px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        backgroundColor: isAdmin ? "#fee2e2" : "#e0e7ff",
                        color: isAdmin ? "#b91c1c" : "#4338ca",
                      }}
                    >
                      {user.role}
                    </span>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      fontSize: "13px",
                      color: "#334155",
                      textDecoration: "none",
                    }}
                  >
                    <i className="fa-regular fa-id-card"></i> My Profile
                  </Link>

                  <Link
                    to="/orders"
                    onClick={() => setShowUserMenu(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      fontSize: "13px",
                      color: "#334155",
                      textDecoration: "none",
                    }}
                  >
                    <i className="fa-solid fa-box"></i> My Orders
                  </Link>

                  <Link
                    to="/wishlist"
                    onClick={() => setShowUserMenu(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      fontSize: "13px",
                      color: "#334155",
                      textDecoration: "none",
                    }}
                  >
                    <i className="fa-regular fa-heart"></i> My Wishlist
                  </Link>

                  {/* Admin Dashboard Entry */}
                  <Link
                    to="/admin"
                    onClick={() => setShowUserMenu(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      fontSize: "13px",
                      color: "#b91c1c",
                      fontWeight: "600",
                      backgroundColor: "#fef2f2",
                      textDecoration: "none",
                      marginTop: "4px",
                    }}
                  >
                    <i className="fa-solid fa-shield-halved"></i> Admin Portal
                  </Link>

                  <div style={{ borderTop: "1px solid #f1f5f9", marginTop: "8px", paddingTop: "8px" }}>
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "8px 10px",
                        borderRadius: "8px",
                        fontSize: "13px",
                        color: "#ef4444",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p style={{ fontSize: "13px", color: "#475569", marginBottom: "12px" }}>
                    Welcome to Shop.co! Sign in to track orders and save favorites.
                  </p>

                  <Link
                    to="/login"
                    onClick={() => setShowUserMenu(false)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px 0",
                      textAlign: "center",
                      backgroundColor: "#000",
                      color: "#fff",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: "600",
                      textDecoration: "none",
                      marginBottom: "8px",
                    }}
                  >
                    Sign In / Register
                  </Link>

                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      type="button"
                      onClick={() => {
                        login("customer@shop.co", "123456");
                        setShowUserMenu(false);
                      }}
                      style={{
                        flex: 1,
                        padding: "6px",
                        fontSize: "11px",
                        backgroundColor: "#f1f5f9",
                        border: "1px solid #cbd5e1",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Demo User
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        login("admin@shop.co", "admin123");
                        setShowUserMenu(false);
                      }}
                      style={{
                        flex: 1,
                        padding: "6px",
                        fontSize: "11px",
                        backgroundColor: "#fee2e2",
                        color: "#b91c1c",
                        border: "1px solid #fca5a5",
                        borderRadius: "6px",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      Demo Admin
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;