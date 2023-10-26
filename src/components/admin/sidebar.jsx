import '../css/admin.css'
import home from '../../assets/images/home.png';

import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="admin">
            <div className="sidebar">
                <div className='home'>
                    {/* <img src={home} alt='home' /> */}
                    {/* <Link to="/Dashboard"><h3>Dashboard</h3></Link> */}
                    <Link to="/Product-Admin"><h3>Product</h3></Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar