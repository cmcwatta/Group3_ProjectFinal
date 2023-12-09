// ThankYou.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ThankYou.css'; // Import the styles

const ThankYou = ({ location = {} }) => {
  const orderDetails = location?.state?.orderDetails || null;

  return (
    <div className="thank-you-container">
      <h2>Thank You for Shopping with Us!</h2>
      {orderDetails && (
        <div className="order-details">
          <h3>Your Order Details:</h3>
          <p>
            <strong>Full Name:</strong> {orderDetails.fullName}
          </p>
          <p>
            <strong>Email:</strong> {orderDetails.email}
          </p>
          {/* Add more order details as needed */}
        </div>
      )}
      <div className="button-container">
        <Link to="/welcome">
          <button>Home</button>
        </Link>
        <Link to="/shop">
          <button>Shop</button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
