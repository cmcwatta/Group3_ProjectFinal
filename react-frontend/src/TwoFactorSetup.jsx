import React, { useState } from 'react';
import QRCode from 'qrcode.react';

function TwoFactorSetup() {
    const [token, setToken] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [setupComplete, setSetupComplete] = useState(false);

    const generateSecret = async () => {
        try {
            const response = await fetch('http://localhost:3000/users/enable-2fa', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to generate 2FA secret');
            }

            const data = await response.json();
            setQrCodeUrl(data.qrCodeUrl);
        } catch (error) {
            console.error('Error generating 2FA secret:', error);
        }
    };

    const verifyToken = async () => {
        try {
            const response = await fetch('http://localhost:3000/users/verify-2fa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ token })
            });

            if (!response.ok) {
                throw new Error('Failed to verify 2FA token');
            }

            console.log('2FA setup successful');
            setSetupComplete(true);
        } catch (error) {
            console.error('Error verifying 2FA token:', error);
        }
    };

    return (
        <div>
            {!setupComplete ? (
                <>
                    <button onClick={generateSecret}>Enable 2FA</button>
                    {qrCodeUrl && <QRCode value={qrCodeUrl} />}
                    {qrCodeUrl && (
                        <div>
                            <input
                                type="text"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                placeholder="Enter token from authenticator app"
                            />
                            <button onClick={verifyToken}>Verify Token</button>
                        </div>
                    )}
                </>
            ) : (
                <p>Two-factor authentication is set up successfully.</p>
            )}
        </div>
    );
}

export default TwoFactorSetup;
