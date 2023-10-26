import 'bootstrap/dist/css/bootstrap.min.css';
import './css/landingPage.css'

import gambar from '../assets/images/element1.jpeg';
import { Link } from 'react-router-dom';

const Section1 = () => {
    return (
        <div className='section'>
            <div className='section-text'>
                <h1>UNTAMED</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type 
                specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,</p>
                <Link to="/Shop" className='button'>SHOP NOW</Link>
            </div>
            <img className='img-section' src={gambar} alt='section' />
        </div>
    )
}

export default Section1