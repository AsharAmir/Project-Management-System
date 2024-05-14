import React, { useState } from 'react';
import axios from 'axios';
import '../LoginPM.css'; // Import the CSS file

const LoginPM = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/projectManagers/login', {
                email,
                password
            });

            console.log('Login successful:', response.data);
            // Do something after successful login, like redirecting to a dashboard
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="form-container"> {/* Apply the container class */}
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPM;
