import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/login.css'

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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

    const handleRegistration = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Pengguna berhasil terdaftar!');
            navigate('/User')
        } catch (error) {
            alert('Gagal mendaftar: ' + error.message);
        }
    }
    return (
        <div className='page-login'>
            <div className='text-login'>
                <h4>Register</h4>
            </div>
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
            <br />
            <button className='btn-login' onClick={handleRegistration}>LOGIN</button>
        </div>
    );
}

export default Register;
