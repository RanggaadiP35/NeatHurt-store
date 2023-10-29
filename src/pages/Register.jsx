import 'bootstrap/dist/css/bootstrap.min.css';
// import gambar from '../assets/images/element1.jpeg';

import Register from '../components/registrasi';
import Footer from '../components/footer';
import Header from '../components/header';

const RegisterPages = () => {
    return(
        <>
        <Header></Header>
        <Register></Register>
        <Footer></Footer>
        </>
    )
}

export default RegisterPages