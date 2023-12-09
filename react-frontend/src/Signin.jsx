import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [twoFactorToken, setTwoFactorToken] = useState('');
    const [requires2FA, setRequires2FA] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!');
            }

            if (data.requires2FA) {
                // 2FA is required
                setRequires2FA(true);
                setMessage('Two-factor authentication required. Please enter your token.');
            } else {
                // No 2FA required, proceed as normal
                localStorage.setItem('token', data.token);
                setMessage('Sign-in successful! Token stored.');
                navigate('/welcome');
                // Redirect or update UI accordingly
            }
            if (data.token) {
                localStorage.setItem('token', data.token);
                navigate('/welcome'); // Navigate to the welcome page
            }
            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.reload(); // Add this line to force a refresh
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleVerifyToken = async () => {
        try {
            const response = await fetch('http://localhost:3000/users/verify-2fa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in localStorage
                },
                body: JSON.stringify({ token: twoFactorToken })
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || 'Error verifying 2FA token');
            }
    
           
            setMessage('Two-factor authentication successful. You are now signed in.');

            
        } catch (error) {
            setMessage(error.message);
        }
        navigate('/welcome');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Sign In</button>
                <div>
                <p>
                Don't have an account? <Link to="/register">Register here</Link>
               </p>
               </div>
            </form>
            {requires2FA && (
                <div>
                    <input 
                        type="text" 
                        value={twoFactorToken} 
                        onChange={(e) => setTwoFactorToken(e.target.value)} 
                        placeholder="2FA Token" 
                    />
                    <button onClick={handleVerifyToken}>Verify Token</button>
                </div>
            )}
            {message && <p>{message}</p>}
        </div>
    );
}

export default SignIn;
