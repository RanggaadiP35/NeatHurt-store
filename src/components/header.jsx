import './css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, Link } from 'react-router-dom';
import { API_URL } from '../utils/constans';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

import gambar from '../assets/images/NeatHurt21.png';
import cart from '../assets/images/cart.png';
import user from '../assets/images/user.png';

const Header = () => {
    const [data, setData] = useState([]);
    const [userName, setUserName] = useState('');

    const fetchData = () => {
        axios.get(API_URL + "/cart")
            .then((response) => {
                const count = response.data.length;
                setData(count);
            })
            .catch((error) => {
                console.error('Kesalahan:', error);
            });
    }

    useEffect(() => {
        fetchData(); // Panggil fetchData saat komponen dimuat
    }, []);

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

    useEffect(() => {
        // Saat pengguna login atau komponen dimuat
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Dapatkan nama pengguna dari profil pengguna
                const displayName = user.email
                setIsLoggedIn(true);
                if (displayName) {
                    // Jika nama pengguna tersedia, set ke state
                    setUserName(displayName);
                }
            } else {
                setIsLoggedIn(false);
            }
        });
    }, []);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             // Pengguna telah login
    //             setIsLoggedIn(true);
    //         } else {
    //             // Pengguna belum login
    //             setIsLoggedIn(false);
    //         }
    //     });
    // }, []);
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid layout-navbar">
                    <div className="navbar-brand">
                        <Link to="/">
                            <img className='logo' src={gambar} alt='logo' />
                        </Link>
                        <NavLink to="/Shop" className='nav-link' aria-current="page">Shop</NavLink>
                        <NavLink to="/Team" className='nav-link' aria-current="page">Team</NavLink>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className='icon-nav'>
                            <NavLink to="/cart" className='nav-link nav-image' aria-current="page">
                                <img className='cart-navbar' src={cart} alt='cart' /></NavLink>
                            {isLoggedIn ? (
                                <div>
                                    {data > 0 && (<span className='notif-number'>{data}</span>)}
                                </div>
                            ) : (
                                <p></p>
                            )}
                            <NavLink to="/user" className='nav-link nav-image' aria-current="page"><img className='user-navbar' src={user} alt='cart' /></NavLink>
                            <p style={{ position: "absolute", marginTop: "2.5rem", fontSize:"12px" }}>{userName}</p>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header