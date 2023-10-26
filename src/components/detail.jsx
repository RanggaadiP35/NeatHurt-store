import './css/product.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import gambar from '../assets/images/tshirt.jpeg';

// import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Header from './header';
import Footer from './footer';

const ProductDetail = () => {
    const [selectedSize, setSelectedSize] = useState(null);

    const handleSize = (size) => {
        setSelectedSize(size);
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const storedUsername = localStorage.getItem('username');
    // localStorage.removeItem('username');

    function addToCart(product) {
        if (storedUsername) {
            setIsLoggedIn(true);
            alert('berhasil')
            // setCart([...cart, product]);
            console.log(product);
        } else {
            navigate('/user')
        }
    };

    // fungsi menambahkan ke keranjang
    const [cart, setCart] = useState([]);

    const { itemId } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        selectedBarang: '',
        image: '',
        price: '',
    });

    useEffect(() => {
        axios.get(`https://652808c8931d71583df1c625.mockapi.io/list-product/${itemId}`)
            .then((response) => {
                // console.log(response);
                setFormData(response.data);
            })
            .catch((error) => {
                console.error('Gagal mengambil data:', error);
            });
    }, [itemId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    return (
        <>
            {/* <Header></Header> */}
            <div className="cart-detail">
                <div className='col-md-3 card-container'>
                    <div className="card card-id" style={{ width: "100%" }} >
                        <div className='canvas'>
                            <img className="card-img-detail" src={formData.image} alt="Card image cap" />
                        </div>
                    </div>
                </div>
                {/* <img src={gambar} alt='product' /> */}
                <div className='detail-cart'>
                    <h3>Tshirt</h3>
                    <h5>{formData.name}</h5>
                    <p>Rp. {formData.price}</p>
                    <div className='size-cart'>
                        <h4>Size</h4>
                        <button onClick={() => handleSize('S')} className={selectedSize === 'S' ? 'selected' : ''}>S</button>
                        <button onClick={() => handleSize('M')} className={selectedSize === 'M' ? 'selected' : ''}>M</button>
                        <button onClick={() => handleSize('L')} className={selectedSize === 'L' ? 'selected' : ''}>L</button>
                        <p>Selected Size: {selectedSize}</p>
                    </div><br />
                    <button className='button-cart' onClick={() => addToCart()}>Add Cart</button>
                </div>
            </div>
            {/* <Footer></Footer> */}
        </>
    )
}

export default ProductDetail