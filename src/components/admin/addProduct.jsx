import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { Widget } from "@uploadcare/react-widget";

import { Alert } from "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/admin.css'

import Sidebar from "./sidebar";

const AddProduct = () => {

    const API_URL = 'https://652808c8931d71583df1c625.mockapi.io/list-product';
    const navigate = useNavigate();
    const [imageFile, setImage] = useState('')

    // const setImg = (event) => {
    //     setFile(event.target.files[0])
    //     // console.log(setFile);
    // }

    // const imageUploade = (e) => {
    //     const file = e.target.files[0];
    //     setImage(file)
    // }

    const [data, setData] = useState({
        name: "",
        category: "",
        description: "",
        price: "",
        image: "",
    })

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };

    const handleImageUpload = (info) => {
        setData({
            ...data,
            image: info.cdnUrl,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            name: data.name,
            category: data.category,
            description: data.description,
            price: data.price,
            image: data.image,
        };

        axios.post("https://652808c8931d71583df1c625.mockapi.io/list-product", userData)
            .then((response) => {
                console.log(response)
                alert('Berhasil menambahkan produk');
                navigate('/Admin');
            });
    };

    return (
        <div className='add-product' >
            <div className='main-content'>
                <div className='card mt-3'>
                    <div className='card-body card-input'>
                        <Link to="/Admin"><button className="btn btn-warning">Back</button></Link>
                        <div className="form-add">
                            <h3>Form Add Product</h3>
                            <form>
                                <div>
                                    <label htmlFor="name">Product Name:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="gender">Product Category:</label>
                                    <select
                                        className="form-control"
                                        id="category"
                                        name="category"
                                        value={data.category}
                                        onChange={handleChange}
                                    >
                                        <option value="">-- Pilih Category --</option>
                                        <option value="T-Shirt">T-Shirt</option>
                                        <option value="Hoodie">Hoodie</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="image">Image of product</label>
                                    <br/>
                                    {/* <input
                                        type="file"
                                        className="form-control"
                                        id="image"
                                        name="image"
                                        accept=".png" // Hanya file dengan ekstensi .png yang diperbolehkan
                                        onChange={(e) => imageUploade(e)}
                                    /> */}
                                    <Widget
                                        crop="free, 16:9, 4:3, 5:4, 1:1"
                                        publicKey="7ef5eb777beb1a741b6f"
                                        clearable
                                        onChange={(info) => handleImageUpload(info)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description">Additional Description:</label>
                                    <textarea
                                        className="form-control"
                                        type="text"
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone">Price:</label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={data.price}
                                        onChange={handleChange}
                                    />
                                </div>
                                <br />
                                <button className="btn btn-primary btn-add" onClick={handleSubmit}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Sidebar></Sidebar>
        </div >
    );
}

export default AddProduct;
