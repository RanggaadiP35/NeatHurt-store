import './css/cart.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import gambar from '../assets/images/tshirt.jpeg';
import remove from '../assets/images/remove.png';

import { API_URL } from '../utils/constans';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const Cart = () => {
    let [data, setData] = useState([]);

    function getData() {
        useEffect(() => {
            axios.get(API_URL + "/cart")
                .then((response) => {
                    setData(response.data);
                    // console.log(response.data);
                })
                .catch((error) => {
                    console.error('Kesalahan:', error);
                });
        }, []);
    }

    getData()

    const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));

    const handleDelete = (itemId) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus dari keranjang?')) {
            axios.delete(API_URL + `cart/${itemId}`)
                .then((response) => {
                    if (response.status === 200) {
                        const updatedItems = data.filter((item) => item.id !== itemId);
                        // console.log(updatedItems);
                        setData(updatedItems);
                        console.log('Entri berhasil dihapus');
                    }
                })
                .catch((error) => {
                    console.error('Gagal menghapus entri:', error);
                });
        }
    };

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

    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    return (
        <>
            <div className='body-cart'>
                <div className='row body-product'>
                    <div className='cart'>
                        <h4>YOUR CART</h4>
                        <br/>
                        {isLoggedIn ? (
                            <div>
                            {data.length === 0 ? (
                                <p style={{textAlign:"center"}}>Keranjang Anda kosong.</p>
                            ) : (
                                <div>
                                    <h5>Product</h5>
                                    {data.map((item) => (
                                        <div className='col-md-12 mt-3 card-container' key={item.id}>
                                            <div className='product-cart'>
                                                <img src={item.image} alt='image-product' className='img-product' />
                                                <div className='text-cart'>
                                                    <h6>{item.category} {item.name}</h6>
                                                    <h6>Size: {item.size}</h6>
                                                    <h6>Kuantitas: {item.quantity}</h6>
                                                    <h6>Rp. {priceSplitter(item.price)}</h6>
                                                </div>
                                                <button onClick={() => handleDelete(item.id)}>
                                                    <img src={remove} alt='remove' className='img-remove' />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button className='button-cart mt-3'>CHECK OUT</button>
                                </div>
                            )
                            }
                        </div>
                        ) : (
                            <h5 style={{textAlign:"center"}}>"Your status is not logged in."</h5> 
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart