import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/css/header.css';
// import gambar from '../assets/images/element1.jpeg';

import Sidebar from '../components/admin/sidebar';
import ProductAdmin from '../components/admin/product';
import Header from '../components/admin/headerAdmin';
import AddProduct from '../components/admin/addProduct';

const AddProductAdmin = () => {
    return(
        <>
        <Header></Header>
        {/* <Sidebar/> */}
        <AddProduct></AddProduct>
        </>
    )
}

export default AddProductAdmin