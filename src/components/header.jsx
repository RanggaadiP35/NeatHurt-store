import './css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, Link } from 'react-router-dom';

import gambar from '../assets/images/NeatHurt21.png';
import cart from '../assets/images/cart.png';
import user from '../assets/images/user.png';

const storedUsername = localStorage.getItem('username');

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid layout-navbar">
                    <div className="navbar-brand">
                        <Link to="/">
                            <img className='logo' src={gambar} alt='logo' />
                        </Link>
                        {/* <b>Rangga Adi Putra</b> */}
                        <NavLink to="/Shop" className='nav-link' aria-current="page">Shop</NavLink>
                        <NavLink to="/Team" className='nav-link' aria-current="page">Team</NavLink>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className='icon-nav'>
                            <NavLink to="/cart" className='nav-link nav-image' aria-current="page"><img className='cart-navbar' src={cart} alt='cart' /></NavLink>
                            <NavLink to="/user" className='nav-link nav-image' aria-current="page"><img className='user-navbar' src={user} alt='cart' />{storedUsername}</NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header