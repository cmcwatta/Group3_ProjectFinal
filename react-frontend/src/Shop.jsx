// Shop.jsx
import React from 'react';
import './Shop.css';

const phoneImages = {
  'iPhone 15': 'iphone-15-pro-max.jpg',
  'Samsung Galaxy S23': 'samsung-galaxy-s23.jpg',
  'Google Pixel 8': 'google-pixel-8.webp',
  // Add more phones as needed
};

const phones = [
  { id: 1, name: 'iPhone 15', color: 'Natural Titanium', storage: '256GB', price: 1749 },
  { id: 2, name: 'Samsung Galaxy S23', color: 'White', storage: '128GB', price: 899 },
  { id: 3, name: 'Google Pixel 8', color: 'Silver', storage: '64GB', price: 799 },
  // Add more phones as needed
];

const Shop = ({ onAddToCart }) => {
  const handleAddToCart = (phone) => {
    onAddToCart(phone.name); // Pass the phone name to the parent component
  };

  return (
    <div className="shop-container">
      <h2>Explore Our Latest Phones</h2>
      <div className="phone-list">
        {phones.map((phone) => (
          <div key={phone.id} className="phone-card">
            <img
              src={`images/${phoneImages[phone.name]}`}
              alt={phone.name}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <h3>{phone.name}</h3>
            <p><strong>Color:</strong> {phone.color}</p>
            <p><strong>Storage:</strong> {phone.storage}</p>
            <p><strong>Price:</strong> ${phone.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <button onClick={() => handleAddToCart(phone)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
