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
    return (
        // <div className="admin">
        //     <div className="sidebar">
        //         <div className='home'>
        //             {/* <img src={home} alt='home' /> */}
        //             <Link to="/Dashboard"><h3>Dashboard</h3></Link>
        //             <Link to="/Product-Admin"><h3>Product</h3></Link>
        //         </div>
        //         <div className='table-Product'>
        //             <h1>List Product</h1>
        //             <table className="table table-striped">
        //                 <thead>
        //                     <tr>
        //                         <th>Nomor</th>
        //                         <th>Product Name</th>
        //                         <th>Product Category</th>
        //                         <th>Product Feshness</th>
        //                         <th>Image</th>
        //                         <th>Product Price</th>
        //                         <th>Action</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     {data.map((item, index) => (
        //                         <tr key={item.uuid}>
        //                             <td>{item.id}</td>
        //                             <td>{item.name}</td>
        //                             <td>{item.category}</td>
        //                             <td>{item.freshness}</td>
        //                             <td><img src={item.image}/></td>
        //                             <td>{item.price}</td>
        //                             <td>
        //                                 <Link className="btn btn-warning" to={`/detail/${item.uuid}`} state={{ detailData: item }}>Detail</Link>&nbsp;
        //                                 <button className="btn btn-danger" onClick={() => onDelete(index)}>Delete</button>
        //                             </td>
        //                         </tr>
        //                     ))}
        //                 </tbody>
        //             </table>
        //         </div>
        //     </div>
        // </div>

        <div className='side'>
            <div className='main-content'>
                <div className='card mt-3'>
                    <div className='card-body'>
                        <div className='table-Product'>
                            <button className='btn btn-warning'>Add</button>
                            <h3>List Product</h3>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Product Name</th>
                                        <th>Product Category</th>
                                        <th>Product Feshness</th>
                                        <th>Image</th>
                                        <th>Product Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={item.uuid}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.category}</td>
                                            <td>{item.freshness}</td>
                                            <td><img src={item.image} style={{ width: "50%" }} /></td>
                                            <td>Rp.{item.price}</td>
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