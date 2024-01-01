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
                    {/* <li className="nav-item">
                            <a className="nav-link active" aria-current="page" >Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" >Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">Pricing</a>
                        </li> */}
                    {/* </ul> */}
                </div>
            </div>
        </nav>


        // <Navbar collapseOnSelect>
        //     <NavLink to="/home"><Navbar.Brand><h2 className={styles.flixed_name}>Flixed</h2></Navbar.Brand></NavLink>
        //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        //     <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        //         <span className='mr-auto'></span>
        //         {
        //             props.logged_in === true ?
        //                 <Nav>
        //                     <Nav.Link disabled>{props.user}</Nav.Link>
        //                     <Nav.Link><Link className={styles.flixed_navLink} to="/dashboard">Dashboard</Link></Nav.Link>
        //                     <Nav.Link><Link className={styles.flixed_navLink} to="/statistics">Statistics</Link></Nav.Link>
        //                     <Nav.Link onClick = { ()=> props.handle_logout() }>Logout</Nav.Link>
        //                 </Nav>
        //                 :
        //                 <Nav>
        //                 <Nav.Link as="span"><Link className={styles.flixed_navLink} to="/login">Sign In</Link></Nav.Link>
        //                 <Nav.Link as="span"><Link className={styles.flixed_navLink} to="/register">Register</Link></Nav.Link>
        //                 </Nav>
        //         }
        //     </Navbar.Collapse>
        // </Navbar>      
    )
}

export default NavBar