import 'bootstrap/dist/css/bootstrap.min.css';
// import gambar from '../assets/images/element1.jpeg';

import Section1 from '../components/section1';
import Product from '../components/product';
import Footer from '../components/footer';
import Header from '../components/header';

const ProductPages = () => {
    return(
        <>
        <Header></Header>
        {/* <Section1></Section1> */}
        <Product></Product>
        <Footer></Footer>
        </>
    )
}

export default ProductPages