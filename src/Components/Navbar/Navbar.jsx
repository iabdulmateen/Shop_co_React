import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import logo from "../../assets/logo.png";
import { useCart } from "../../Context/Cart.jsx";

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">

      <Link to="/" className="navlogo">
        <img src={logo} alt="SHOP.CO Logo" />
      </Link>

      <ul className="navlist">
        <li>
          <Link to="/category">Shop</Link>
        </li>
        <li>On Sale</li>
        <li>New Arrival</li>
        <li>Brands</li>
      </ul>

      <div className="search-box">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Search for products..." />
      </div>

      {/* Icons */}
      <div className="nav-icons">
        <Link to="/cart" className="cart-icon-wrapper">
          <i className="fa-solid fa-cart-shopping"></i>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>

        <i className="fa-regular fa-circle-user"></i>
      </div>

    </nav>
  );
};

export default Navbar;