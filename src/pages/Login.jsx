import 'bootstrap/dist/css/bootstrap.min.css';
// import gambar from '../assets/images/element1.jpeg';

import Login from '../components/login';
import Footer from '../components/footer';
import Header from '../components/header';

const LoginPages = () => {
    return(
        <>
        <Header></Header>
        <Login></Login>
        <Footer></Footer>
        </>
    )
}

export default LoginPages