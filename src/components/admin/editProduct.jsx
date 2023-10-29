import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { useNavigate, useParams, Link } from 'react-router-dom';
// import imageUpload from "../config/cloudinary";

import { Alert } from "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/admin.css'

import Sidebar from "./sidebar";

const EditProduct = () => {

    const { itemId } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        category: "",
        description: "",
        price: "",
        image:"",
    })

    const [selectedFile, setFile] = useState(null)

    const setImg = (event) => {
        setFile(event.target.files[0])
        // console.log(setFile);
    }
    
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            name: data.name,
            category: data.category,
            description: data.description,
            price: data.price,
            image: data.selectedFile,
        };

        axios.put(`https://652808c8931d71583df1c625.mockapi.io/list-product/${itemId}`, userData)
            .then((response) => {
                console.log(response)
                alert('Berhasil edit produk');
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
                            <h3>Form Edit Product</h3>
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
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="image"
                                        name="image"
                                        accept=".png"
                                        onChange={setImg}
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

export default EditProduct;