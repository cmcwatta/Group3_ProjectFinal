import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Welcome.css';

function Welcome() {
    const navigate = useNavigate(); 

    const handleGoToShop = (event) => {
        event.preventDefault();
        navigate('/shop');
    };

    const handleLogout = () => {
        console.log("Logging out");
        localStorage.removeItem('token');
        console.log("Token removed, navigating to sign-in page");
        navigate('/'); 
    };

    return (
        <div className="welcome-root">
            <h1>Welcome to the BestMobile!</h1>
            <p>You are now signed in.</p>
            <div className="welcome-buttons">
                <a href="/shop" onClick={handleGoToShop}>Go to Shop</a>
                <button type="button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Welcome;
