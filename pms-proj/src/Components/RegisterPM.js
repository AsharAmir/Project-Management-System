import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';
import '../Styles/RegisterPM.css'; // Import the CSS file

const RegisterPM = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/projectManagers/register', {
                name,
                email,
                password
            });

            console.log('Registration successful:', response.data);
            setName('');
            setEmail('');
            setPassword('');
            setShowPopup(true);
            setTimeout(() => {
                setRedirectToLogin(true);
            }, 1500);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    if (redirectToLogin) {
        return <Navigate to="/LoginPM" />;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#222', color: '#fff' }}>
            <div style={{ backgroundColor: '#333', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
                <h2 style={{ color: '#4CAF50' }}>Welcome to the Project Management System</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        style={{ marginBottom: '10px', padding: '8px', width: '100%', border: '1px solid #888', borderRadius: '4px', boxSizing: 'border-box', backgroundColor: '#444', color: '#fff' }}
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        style={{ marginBottom: '10px', padding: '8px', width: '100%', border: '1px solid #888', borderRadius: '4px', boxSizing: 'border-box', backgroundColor: '#444', color: '#fff' }}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        style={{ marginBottom: '10px', padding: '8px', width: '100%', border: '1px solid #888', borderRadius: '4px', boxSizing: 'border-box', backgroundColor: '#444', color: '#fff' }}
                    />
                    <button type="submit" style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '10px 15px', margin: '8px 0', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', transition: 'background-color 0.3s' }}>Register</button>
                </form>
                <div style={{ marginTop: '20px' }}>
                    <Link to="/LoginPM" style={{ color: '#4CAF50', textDecoration: 'none' }}>Back to Login</Link>
                </div>
                {showPopup && (
                    <div className="popup">
                        <p>Project Manager registered successfully!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegisterPM;
