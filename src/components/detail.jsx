import './css/product.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import gambar from '../assets/images/tshirt.jpeg';

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const ProductDetail = () => {
    const [selectedSize, setSelectedSize] = useState(null);
    const sizes = ['S', 'M', 'L', 'XL'];

    const handleSize = (size) => {
        setSelectedSize(size);
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const storedUsername = localStorage.getItem('username');

    function addCart(item, size) {
        const newItem = { name: item, size: size };
        if (item && size) {
            setCart([...cart, newItem]);
            alert('Produk berhasil ditambahkan ke keranjang');
            navigate('/cart')
        }
    };

    const { itemId } = useParams();
    const [data, setData] = useState({
        name: '',
        category: '',
        selectedBarang: '',
        image: '',
        price: '',
    });

    useEffect(() => {
        axios.get(`https://652808c8931d71583df1c625.mockapi.io/list-product/${itemId}`)
            .then((response) => {
                console.log(response);
                setData(response.data);
            })
            .catch((error) => {
                console.error('Gagal mengambil data:', error);
            });
    }, [itemId]);

    const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));

    const [quantity, setQuantity] = useState(0);

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    }

    const decrementQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedSize) {
            alert('Pilih ukuran terlebih dahulu');
            return;
        }

        if (quantity <= 0) {
            alert('Jumlah harus lebih dari 0');
            return;
        }

        if (!isLoggedIn) {
            alert('Anda harus login terlebih dahulu untuk menambahkan produk ke keranjang');
            navigate('/User'); // Anda bisa mengarahkan pengguna ke halaman login
            return;
        }

        const userData = {
            name: data.name,
            category: data.category,
            price: data.price,
            image: data.image,
            size: selectedSize,
            quantity: quantity
        };

        axios.post("https://652808c8931d71583df1c625.mockapi.io/cart", userData)
            .then((response) => {
                console.log(response)
                alert('Berhasil menambahkan produk');
                navigate('/Cart');
            });
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

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true); // Pengguna sudah login
            } else {
                setIsLoggedIn(false); // Pengguna belum login
            }
        });
    }, []);

    return (
        <>
            <div className="cart-detail">
                <div className='col-md-3 card-container'>
                    <div className="card card-id" style={{ width: "100%" }} >
                        <div className='canvas'>
                            <img className="card-img-detail" src={data.image} alt="Card image cap" />
                        </div>
                    </div>
                </div>
                <div className='detail-cart'>
                    <h5>{data.category}</h5>
                    <h5>{data.name}</h5><br />
                    <h4>Rp. {priceSplitter(data.price)}</h4>
                    <br />
                    <div className='size-cart' key={sizes}>
                        <h6>Size</h6>
                        {sizes.map((size => <button onClick={() => handleSize(size)} className={selectedSize === size ? 'selected' : ''}>{size}</button>))}
                        {/* <p>Selected Size: {selectedSize}</p> */}
                        <h6>Kuantitas:</h6>
                        <button className='btn btn-outline-dark' onClick={decrementQuantity}>-</button>
                        <span className='btn'>{quantity}</span>
                        <button className='btn btn-outline-dark' onClick={incrementQuantity}>+</button>
                    </div><br />
                    <button className='button-cart' onClick={handleSubmit}>Add Cart</button>
                </div>
            </div>
        </>
    )
}

export default ProductDetail