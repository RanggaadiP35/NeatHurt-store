import './css/product.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import React, { useEffect, useState } from "react";
import { API_URL } from '../utils/constans';
import { Link } from 'react-router-dom';

const Product = () => {
    let [data, setData] = useState([]);

    function getData() {
        useEffect(() => {
            axios.get(API_URL + "/list-product")
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

    const handleEdit = (itemId) => {
        window.location.href = `/Product-Detail/${itemId}`;
    };

    const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));

    return (
        <>
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
                                    <h6 className="card-title">{item.category} {item.name}</h6>
                                </div>
                                <div className='size'>
                                    <p className="card-text">
                                        Rp. {priceSplitter(item.price)}
                                    </p>
                                    <p>S M L XL</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Product