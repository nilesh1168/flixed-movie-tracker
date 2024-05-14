// import Navbar from 'react-bootstrap/Navbar'
// import Nav from 'react-bootstrap/Nav'
import {
    NavLink,
    Link
} from "react-router-dom";
import styles from '../styles/App.module.css'

function NavBar(props) {
    const flixed_styles = {
        fontFamily: 'Rye',
        color: '#EAE7DC'
    }

    return (
        <nav className="navbar navbar-expand-lg" style={{backgroundColor: '#E85A4F'}}>
            <div className="container-fluid">
            <h3><NavLink className="navbar-brand" style={flixed_styles} to="/home">Flixed</NavLink></h3>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <span className="me-auto"></span>
                    {/* <ul className="navbar-nav"> */}

                    {
                        props.logged_in === true ?
                                <ul className="navbar-nav">
                                    <li className="nav-item"><label className="nav-link active" aria-current="page" aria-disabled>{props.user}</label></li>
                                    <li className="nav-item"><label className="nav-link" ><Link className={styles.flixed_navLink} to="/dashboard">Dashboard</Link></label></li>
                                    <li className="nav-item"><label className="nav-link" ><Link className={styles.flixed_navLink} to="/statistics">Statistics</Link></label></li>
                                    <li className="nav-item"><label className="nav-link" onClick={() => props.handle_logout()}> <label className={styles.flixed_navLink}>Logout</label></label></li>
                                </ul>
                            :
                                <ul className="navbar-nav">
                                    <li className="nav-item"><label className="nav-link" ><Link className={styles.flixed_navLink} to="/login">Sign In</Link></label></li>
                                    <li className="nav-item"><label className="nav-link" ><Link className={styles.flixed_navLink} to="/register">Register</Link></label></li>
                                </ul>
                    }
                </div>
            </div>
        </nav> 
    )
}

export default NavBar