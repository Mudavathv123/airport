import { Link } from "react-router-dom";
import './index.css'

const Sidebar = () => (
    <div className="sidebar-container">
        <ul className="sidebar-item-container">
            <Link to="/" className="link">
                <li className="siderbar-item">
                    <img src="https://res.cloudinary.com/dnml2vs6t/image/upload/v1720112703/MyMiniProjectsImages/w4puvwh0dn9lakunhbqv.svg" alt="home icon" className="home-img" />
                    <label className="label-name">Home</label>
                </li>
            </Link>
            <li className="siderbar-item">
                <img src="https://res.cloudinary.com/dnml2vs6t/image/upload/v1720113126/ndtwq0qy9p9sxyymmbt3.svg" alt="app icon" className="app-img" />
                <label className="label-name">Dashboard</label>
            </li>
        </ul>
        <ul className="sidebar-item-container">
            <li className="sidebar-header-container">
                <h1 className="sidebar-head">Services</h1>
            </li>
            <Link to="/airport-services" className="link">
                <li className="active-tab">Airports</li>
            </Link>
            <li className="label-name">Videos</li>
        </ul>
        <ul className="sidebar-item-container">
            <li className="sidebar-header-container">
                <h1 className="sidebar-head">Others</h1>
            </li>
            <li className="label-name">List 1</li>
            <li className="label-name">List 2</li>
            <li className="label-name">List 3</li>
        </ul>
    </div>
);

export default Sidebar