// Checkout.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCVV] = useState('');

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [expirationDateError, setExpirationDateError] = useState('');
  const [cvvError, setCVVError] = useState('');

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Clear previous errors
    setFullNameError('');
    setEmailError('');
    setCardNumberError('');
    setExpirationDateError('');
    setCVVError('');

    // Validate form fields
    if (!fullName.trim()) {
      setFullNameError('Full Name is required');
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError('Invalid email address');
      return;
    }

    if (!isValidCardNumber(cardNumber)) {
      setCardNumberError('Invalid card number');
      return;
    }

    if (!isValidDate(expirationDate)) {
      setExpirationDateError('Invalid expiration date');
      return;
    }

    if (!isValidCVV(cvv)) {
      setCVVError('Invalid CVV');
      return;
    }

    // Navigate to the thank you page
    navigate('/thank-you', {
      state: {
        orderDetails: { fullName, email, cardNumber, expirationDate, cvv },
      },
    });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidCardNumber = (cardNumber) => /^\d{16}$/.test(cardNumber);
  const isValidDate = (date) => /^\d{2}\/\d{2}$/.test(date);
  const isValidCVV = (cvv) => /^\d{3}$/.test(cvv);

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form>
        <label>
          Full Name:
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
          />
          <span className="error-message">{fullNameError}</span>
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john.doe@example.com"
          />
          <span className="error-message">{emailError}</span>
        </label>
        <label>
          Card Number:
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="xxxx-xxxx-xxxx-xxxx"
          />
          <span className="error-message">{cardNumberError}</span>
        </label>
        <label>
          Expiration Date:
          <input
            type="text"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            placeholder="MM/YY"
          />
          <span className="error-message">{expirationDateError}</span>
        </label>
        <label>
          CVV:
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCVV(e.target.value)}
            placeholder="123"
          />
          <span className="error-message">{cvvError}</span>
        </label>
        <button onClick={handlePlaceOrder}>Place Order</button>
      </form>
      {/* Display Home and Shop Again links based on the route */}
      {window.location.pathname === '/thank-you' ? (
        <div>
          <Link to="/">Home</Link> {' | '} <Link to="/shop">Shop Again</Link>
        </div>
      ) : null}
    </div>
  );
};

export default Checkout;
