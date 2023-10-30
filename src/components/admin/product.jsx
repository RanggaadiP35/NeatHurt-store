import '../css/admin.css'
import home from '../../assets/images/home.png';

import { Link } from 'react-router-dom';
import { API_URL } from '../../utils/constans';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Sidebar from './sidebar';

const ProductAdmin = () => {
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

    const handleDelete = (itemId) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            axios.delete(API_URL + `list-product/${itemId}`)
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

    const handleEdit = (itemId) => {
        // Ganti URL dengan URL halaman edit yang sesuai
        window.location.href = `/edit/${itemId}`;
    };

    const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));

    return (
        <div className='side'>
            <div className='main-content'>
                <div className='card mt-3'>
                    <div className='card-body'>
                        <div className='table-Product'>
                            <Link to='/Add-Product'><button className='btn btn-warning'>Add</button></Link>
                            <h3>List Product</h3>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Product Name</th>
                                        <th>Product Category</th>
                                        <th>Product Description</th>
                                        <th style={{width:"100px"}}>Image</th>
                                        <th>Product Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.category}</td>
                                            <td>{item.description}</td>
                                            <td><img src={item.image} style={{ width: "50%" }} /></td>
                                            <td>Rp.{priceSplitter(item.price)}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>&nbsp;
                                                {/* <Link className="btn btn-success" to={`/detail/${item.id}`} state={{ detailData: item }}>Edit</Link>&nbsp; */}
                                                <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Sidebar></Sidebar>
        </div>
    )
}

export default ProductAdmin