import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/login.css'

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();

        if (username === 'admin' && password === '12345678') {
            navigate('/Admin');
        } else {
            setErrorMessage('Invalid username or password');
        }
    };

    return (
        <div className='page-login'>
            <div className='text-loginAdmin'>
                <h3 style={{textAlign:"center"}}>Login Admin</h3>
                {/* <Link to='/Registrasi'><h4>Register</h4></Link> */}
            </div>
            <div className='login-input'>
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
            </div>
            <br />
            <button className='btn-login' onClick={handleLogin}>LOGIN</button>
            <br/>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
}

export default Login;
