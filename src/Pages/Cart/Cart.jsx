import { Link } from "react-router-dom";
import { useCart } from "../../Context/Cart.jsx";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, cartTotal } = useCart();

  const discount = Math.round(cartTotal * 0.2);
  const deliveryFee = cart.length > 0 ? 15 : 0;
  const total = cartTotal - discount + deliveryFee;

  return (
    <div className="cart-page">
      <div className="cart-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <strong>Cart</strong>
      </div>

      <h1 className="cart-title">YOUR CART</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items">
            {cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.image} alt={item.name} className="cart-item-image" />

                <div className="cart-item-details">
                  <div className="cart-item-top">
                    <div>
                      <h3>{item.name}</h3>
                      {item.size && <p className="cart-item-meta">Size: {item.size}</p>}
                      {item.color && (
                        <p className="cart-item-meta">
                          Color:{" "}
                          <span
                            className="color-dot"
                            style={{ backgroundColor: item.color }}
                          ></span>
                        </p>
                      )}
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id, item.color, item.size)}
                    >
                      🗑
                    </button>
                  </div>

                  <div className="cart-item-bottom">
                    <span className="cart-item-price">${item.price}</span>

                    <div className="qty-box">
                      <button onClick={() => decreaseQuantity(item.id, item.color, item.size)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id, item.color, item.size)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal}</span>
            </div>

            <div className="summary-row discount-row">
              <span>Discount (-20%)</span>
              <span>-${discount}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>${deliveryFee}</span>
            </div>

            <div className="summary-row total-row">
              <span>Total</span>
              <span>${total}</span>
            </div>

            <div className="promo-row">
              <input type="text" placeholder="Add promo code" />
              <button>Apply</button>
            </div>

            <button className="checkout-btn">Go to Checkout →</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;