import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/login.css'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const firebaseConfig = {
        apiKey: "AIzaSyDsR1TlgN3CpdgsKgfknMX3Fp_Yy7KgxYs",
        authDomain: "neathurt-store.firebaseapp.com",
        projectId: "neathurt-store",
        storageBucket: "neathurt-store.appspot.com",
        messagingSenderId: "924356459068",
        appId: "1:924356459068:web:6ccba918912e4f0b06a139"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Pengguna berhasil Login!');
            navigate('/Shop')
        } catch (error) {
            alert('Gagal mendaftar: ' + error.message);
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Pengguna telah login
                setIsLoggedIn(true);
            } else {
                // Pengguna belum login
                setIsLoggedIn(false);
            }
        });
    }, []);

    const handleLogout = () => {
        signOut(auth) // Memanggil metode signOut
            .then(() => {
                alert('Anda telah logout')
                navigate('/User');
            })
            .catch((error) => {
                // Penanganan kesalahan jika logout gagal
                console.error('Gagal logout:', error);
            });
    };
    return (
        <div className='page-login'>
            {isLoggedIn ? (
                <h4 style={{ textAlign: "center", display: "block" }}>You are currently logged in</h4>
            ) : (
                <div className='text-login'>
                    <h3>Welcome Back</h3>
                    <Link to='/Registrasi'><h4>Register</h4></Link>
                </div>
            )}
            {isLoggedIn ? (
                <p></p>
            ) : (
                <div className='login-input'>
                    <input
                        type="email"
                        className='form-control'
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /><br />
                    <input
                        type="password"
                        className='form-control'
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            )}
            <br />
            {isLoggedIn ? (
                <button className='btn-logout' onClick={handleLogout}>LOGOUT</button>
            ) : (
                <button className='btn-login' onClick={handleLogin}>LOGIN</button>
            )}
            {/* <button className='btn-login' onClick={handleLogin}>LOGIN</button> */}
        </div>
    );
}

export default Login;
