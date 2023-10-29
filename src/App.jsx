import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import './components/css/landingPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header'
import Footer from './components/footer';
import Product from './components/product';
import Cart from './components/cart';
import ProductDetail from './components/detail';
import Login from './components/login';
import ProductAdmin from './components/admin/product';

import LandingPages from './pages/landingPages';
import Admin from './pages/Admin';
import ProductPages from './pages/Product';
import DetailPages from './pages/ProductDetail';
import LoginPages from './pages/Login';
import AddProductAdmin from './pages/AddProduct';
import CartPages from './pages/ProductCart';
import EditProductAdmin from './pages/EditProduct';
import RegisterPages from './pages/Register';
import LoginAdmin from './pages/LoginAdmin';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        {/* <Header></Header> */}
        <Routes>
          <Route path='/' element={<LandingPages />} />
          <Route path='/Shop' element={<ProductPages />} />
          <Route path='/Cart' element={<CartPages />} />
          <Route path='/Product-Detail/:itemId' element={<DetailPages />} />
          <Route path='/User' element={<LoginPages />} />
          <Route path='/Admin' element={<Admin />} />
          <Route path='/Product-Admin' element={<ProductAdmin />} />
          <Route path='/Add-Product' element={<AddProductAdmin />} />
          <Route path='/edit/:itemId' element={<EditProductAdmin />} />
          <Route path='/Registrasi' element={<RegisterPages />} />
          <Route path='/Login-Admin' element={<LoginAdmin />} />
        </Routes>
        {/* <Footer></Footer> */}
      </BrowserRouter>
    </>
  )
}

export default App
