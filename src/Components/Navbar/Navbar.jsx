import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import logo from "../../assets/logo.png";
import { useCart } from "../../Context/Cart.jsx";
import { useAuth } from "../../Context/AuthContext.jsx";

const Navbar = () => {
  const { cartCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/category");
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navlogo">
        <img src={logo} alt="SHOP.CO Logo" />
      </Link>

      <ul className="navlist">
        <li>
          <Link to="/category">Shop</Link>
        </li>
        <li>
          <Link to="/category?filter=sale">On Sale</Link>
        </li>
        <li>
          <Link to="/category?filter=new">New Arrival</Link>
        </li>
        <li>
          <Link to="/brands">Brands</Link>
        </li>
      </ul>

      {/* Search Bar */}
      <div className="search-box">
        <form onSubmit={handleSearchSubmit} style={{ width: "100%", display: "flex" }}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Original Right Icons: Cart & User Only */}
      <div className="nav-icons">
        <Link to="/cart" className="cart-icon-wrapper" aria-label="Shopping Cart">
          <i className="fa-solid fa-cart-shopping"></i>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>

        <Link
          to={user ? "/account" : "/login"}
          aria-label="User Account"
          style={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center" }}
        >
          <i className="fa-regular fa-circle-user"></i>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;