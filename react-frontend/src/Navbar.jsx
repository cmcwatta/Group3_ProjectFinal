// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cartItems }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [addedToCartMessage, setAddedToCartMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const itemMap = new Map();
    cartItems.forEach((item) => {
      if (itemMap.has(item)) {
        itemMap.set(item, itemMap.get(item) + 1);
      } else {
        itemMap.set(item, 1);
      }
    });

    const updatedCart = Array.from(itemMap).map(([name, quantity]) => ({
      name,
      quantity,
    }));

    setCart(updatedCart);

    if (cartItems.length > 0) {
      const message = `${cartItems[cartItems.length - 1]} added to cart!`;
      setAddedToCartMessage(message);

      const timeoutId = setTimeout(() => {
        setAddedToCartMessage('');
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [cartItems]);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleIncreaseQuantity = (index) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index] = { ...updatedCart[index], quantity: updatedCart[index].quantity + 1 };
      return updatedCart;
    });
  };

  const handleDecreaseQuantity = (index) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index] = { ...updatedCart[index], quantity: Math.max(0, updatedCart[index].quantity - 1) };
      if (updatedCart[index].quantity === 0) {
        updatedCart.splice(index, 1);
      }
      return updatedCart;
    });
  };

  const handleCartItemTap = (event) => {
    event.stopPropagation();
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="navbar">
      <Link to="/welcome" className="nav-link">Home</Link>
      <div className="nav-link" onClick={handleCartClick}>
        Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
        {isCartOpen && (
          <div className="cart-modal" onClick={handleCartItemTap}>
            <h3>Your Cart</h3>
            {cart.length === 0 ? (
              <p style={{ color: 'darkslategray' }}>Cart is Empty!</p>
            ) : (
              <ul>
                {cart.map((item, index) => (
                  <li key={index}>
                    <span>{item.name}</span>
                    <span className="quantity">
                      <button onClick={() => handleDecreaseQuantity(index)}>-</button>
                      {item.quantity}
                      <button onClick={() => handleIncreaseQuantity(index)}>+</button>
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className="cart-buttons">
              <button onClick={() => setIsCartOpen(false)} style={{ marginRight: '8px' }}>Close Cart</button>
              <button onClick={handleCheckoutClick} style={{ color: 'darkslategray' }}>Checkout</button>
            </div>
          </div>
        )}
      </div>
      {addedToCartMessage && <div className="added-to-cart-message">{addedToCartMessage}</div>}
      <Link to="/" className="nav-link right">Logout</Link>
    </div>
  );
};

export default Navbar;
