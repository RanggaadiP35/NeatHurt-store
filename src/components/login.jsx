import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/login.css'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = () => {
        if (username === 'user' && password === '123') {
            // Jika login berhasil, simpan informasi login dalam state lokal
            localStorage.setItem('username', username, 'password', password);
            navigate('/Shop');
        } else if(username === 'admin' && password === '123'){
            navigate('/Admin');
        } else {
            setErrorMessage('Username atau password salah. Silakan coba lagi.');
        }
    };

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    return (
        <div className='page-login'>
            <div className='text-login'>
                <h3>Welcome Back</h3>
                <h4>Register</h4>
            </div>
            <input
                type="text"
                className='form-control'
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            /><br />
            <input
                type="password"
                className='form-control'
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button className='btn-login' onClick={handleLogin}>LOGIN</button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
}

export default Login;
