// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './Signin';
import Register from './Register';
import Welcome from './Welcome';
import Shop from './Shop';
import Navbar from './Navbar';
import Checkout from './Checkout';
import ThankYou from './ThankYou'; // Import the new ThankYou component
import './app.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const onAddToCart = (itemName) => {
    console.log('Item added to cart:', itemName);
    setCartItems((prevItems) => [...prevItems, itemName]);
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token != null;
  };

  return (
    <Router>
      <div className="container">
        <div className="logo">
          <img src="group3_logo.png" alt="Logo" />
        </div>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/welcome"
            element={isAuthenticated() ? <Welcome /> : <Navigate to="/" />}
          />
          <Route
            path="/shop/*"
            element={
              <>
                <Navbar cartItems={cartItems} />
                <Shop onAddToCart={onAddToCart} />
              </>
            }
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thank-you" element={<ThankYou />} /> {/* Add this route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
