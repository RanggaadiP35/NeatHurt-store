import './css/product.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import gambar from '../assets/images/tshirt.jpeg';
import gambar1 from '../assets/images/tshirt1.jpeg';
import gambar2 from '../assets/images/tshirt2.jpeg';
import gambar3 from '../assets/images/tshirt3.jpeg';
import gambar4 from '../assets/images/tshirt4.jpeg';
import gambar5 from '../assets/images/tshirt5.jpeg';

import axios from 'axios';
import React, { useEffect, useState } from "react";
import { API_URL } from '../utils/constans';
import { Link } from 'react-router-dom';

import Header from './header';
import Footer from './footer';

const Product = () => {
    let [data, setData] = useState([]);

    function getData() {
        useEffect(() => {
            axios.get(API_URL + "/list-product")
                .then((response) => {
                    setData(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Kesalahan:', error);
                });
        }, []);
    }

    getData()

    const handleEdit = (itemId) => {
        // Ganti URL dengan URL halaman edit yang sesuai
        window.location.href = `/Product-Detail/${itemId}`;
    };

    const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));

    return (
        <>
            {/* <Header></Header> */}
            <h2>Product</h2>
            <div className='row body-product'>
                {data.map((item) => (
                    <div className='col-md-3 card-container' key={item.id}>
                        <Link className='a-product' onClick={() => handleEdit(item.id)}>
                            <div className="card card-id" style={{ width: "100%" }} >
                                <div className='canvas'>
                                    <img className="card-img-top" src={item.image} alt="Card image cap" />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{item.category} {item.name}</h5>
                                    <p className="card-text">
                                        Rp. {priceSplitter(item.price)}
                                    </p>

                                </div>
                                <div className='size'>
                                    <p>S M L XL</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            {/* <div className='row body-product'>
                <div className='col-md-3 card-container'>
                    <Link to="/Product-Detail" className='a-product'>
                        <div className="card card-id" style={{ width: "100%" }} >
                            <div className='canvas'>
                                <img className="card-img-top" src={gambar} alt="Card image cap" />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">T-shirt poison</h5>
                                <p className="card-text">
                                    Rp. 150.000
                                </p>

                            </div>
                            <div className='size'>
                                <p>S M L XL</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='col-md-3 card-container'>
                    <div className="card card-id" style={{ width: "100%" }} >
                        <div className='canvas'>
                            <img className="card-img-top" src={gambar1} alt="Card image cap" />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">T-shirt poison</h5>
                            <p className="card-text">
                                Rp. 150.000
                            </p>

                        </div>
                        <div className='size'>
                            <p>S M L XL</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 card-container'>
                    <div className="card card-id" style={{ width: "100%" }} >
                        <div className='canvas'>
                            <img className="card-img-top" src={gambar2} alt="Card image cap" />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">T-shirt poison</h5>
                            <p className="card-text">
                                Rp. 150.000
                            </p>

                        </div>
                        <div className='size'>
                            <p>S M L XL</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 card-container'>
                    <div className="card card-id" style={{ width: "100%" }} >
                        <div className='canvas'>
                            <img className="card-img-top" src={gambar3} alt="Card image cap" />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">T-shirt poison</h5>
                            <p className="card-text">
                                Rp. 150.000
                            </p>

                        </div>
                        <div className='size'>
                            <p>S M L XL</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 card-container'>
                    <div className="card card-id" style={{ width: "100%" }} >
                        <div className='canvas'>
                            <img className="card-img-top" src={gambar4} alt="Card image cap" />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">T-shirt poison</h5>
                            <p className="card-text">
                                Rp. 150.000
                            </p>

                        </div>
                        <div className='size'>
                            <p>S M L XL</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 card-container'>
                    <div className="card card-id" style={{ width: "100%" }} >
                        <div className='canvas'>
                            <img className="card-img-top" src={gambar5} alt="Card image cap" />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">T-shirt poison</h5>
                            <p className="card-text">
                                Rp. 150.000
                            </p>

                        </div>
                        <div className='size'>
                            <p>S M L XL</p>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <Footer></Footer> */}
        </>
    )
}

export default Product