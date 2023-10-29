import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/css/header.css';
// import gambar from '../assets/images/element1.jpeg';

import Header from '../components/admin/headerAdmin';
import Login from '../components/admin/loginAdmin';

const LoginAdmin = () => {
    return(
        <>
        <Header></Header>
        {/* <Sidebar/> */}
        <Login></Login>
        </>
    )
}

export default LoginAdmin