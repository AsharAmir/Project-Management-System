import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'; // Import Redirect
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
            setShowPopup(true); // Show the success popup
            setTimeout(() => {
                setRedirectToLogin(true); // Redirect to login after a delay
            }, 1500);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    if (redirectToLogin) {
        return <Navigate to="/LoginPM" />; // Use Redirect component
    }

    return (
        <div className="form-container"> {/* Apply the container class */}
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Register</button>
            </form>
            {showPopup && (
                <div className="popup">
                    <p>Project Manager registered successfully!</p>
                </div>
            )}
        </div>
    );
};

export default RegisterPM;
