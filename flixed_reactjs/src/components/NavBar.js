// import Navbar from 'react-bootstrap/Navbar'
// import Nav from 'react-bootstrap/Nav'
// import Navbar from 'react-bootstrap/Navbar'
// import Nav from 'react-bootstrap/Nav'
import {
    NavLink,
    Link
} from "react-router-dom";
import styles from '../styles/App.module.css'
import { useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function NavBar(props) {
    const flixed_styles = {
        fontFamily: 'Rye',
        color: '#EAE7DC'
    }
    const [isCollapsed, setIsCollapsed] = useState(true);
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    
    const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
      };
    
    const closeNavbar = () => {
        setIsCollapsed(true);
      };
    return (
        <nav className="navbar navbar-expand-lg" style={{backgroundColor: '#E85A4F'}}>
            <div className="container-fluid">
            <h3><NavLink className="navbar-brand" style={flixed_styles} to="/home" onClick={closeNavbar}>Flixed</NavLink></h3>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded={!isCollapsed} aria-label="Toggle navigation" onClick={handleToggle}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${!isCollapsed ? "show" : ""}`} id="navbarNavDropdown" >
                    <span className="me-auto"></span>
                    {/* <ul className="navbar-nav"> */}

                    {
                        props.logged_in === true ?
                                <ul className="navbar-nav">
                                    <li className="nav-item"><label className={`nav-link ${splitLocation[1] === props.user ? "active" : ""}`} aria-current="page" aria-disabled>{props.user}</label></li>
                                    <li className="nav-item"><label className={`nav-link ${splitLocation[1] === "dashboard" ? "active" : ""}`} aria-current="page"><Link className={styles.flixed_navLink} to="/dashboard" onClick={closeNavbar}>Dashboard</Link></label></li>
                                    <li className="nav-item"><label className={`nav-link ${splitLocation[1] === "statistics" ? "active" : ""}`} aria-current="page"><Link className={styles.flixed_navLink} to="/statistics" onClick={closeNavbar}>Statistics</Link></label></li>
                                    <li className="nav-item"><label className="nav-link" onClick={() => { props.handle_logout(); closeNavbar();}}> <label className={styles.flixed_navLink}>Logout</label></label></li>
                                </ul>
                            :
                                <ul className="navbar-nav">
                                    <li className="nav-item"><label className={`nav-link ${splitLocation[1] === "login" ? "active" : ""}`} aria-current="page"><Link className={styles.flixed_navLink} to="/login" onClick={closeNavbar}>Sign In</Link></label></li>
                                    <li className="nav-item"><label className={`nav-link ${splitLocation[1] === "register" ? "active" : ""}`} aria-current="page"><Link className={styles.flixed_navLink} to="/register" onClick={closeNavbar}>Register</Link></label></li>
                                </ul>
                    }
                </div>
            </div>
        </nav> 
    )
}
export default NavBar