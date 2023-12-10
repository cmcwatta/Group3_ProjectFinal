// Cart.jsx
import React from 'react';
import './Cart.css';

const Cart = ({ isOpen, onClose }) => {
  return (
    <div className={`cart ${isOpen ? 'open' : ''}`}>
      <div className="cart-content">
        {/* Add your cart items and additional information here */}
        <p>Cart content goes here...</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Cart;
