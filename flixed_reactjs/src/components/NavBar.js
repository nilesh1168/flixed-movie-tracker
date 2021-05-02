import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {
    NavLink,
    Link
} from "react-router-dom";
import styles from '../styles/App.module.css'

function NavBar(props) {
    return (
            <Navbar collapseOnSelect>
                <NavLink to="/"><Navbar.Brand><h2 className={styles.productName}>Flixed</h2></Navbar.Brand></NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <span className='mr-auto'></span>
                    {
                        props.logged_in === true ?
                            <Nav>
                                <Nav.Link>{props.user}</Nav.Link>
                                <Nav.Link>Dashboard</Nav.Link>
                                <Nav.Link>Statistics</Nav.Link>
                                <Nav.Link onClick = { ()=> props.handle_logout() }>Logout</Nav.Link>
                            </Nav>
                            :
                            <Nav>
                            <Nav.Link as="span"><Link className={styles.navLink} to="/login">Sign In</Link></Nav.Link>
                            <Nav.Link as="span"><Link className={styles.navLink} to="/register">Register</Link></Nav.Link>
                            </Nav>
                    }
                </Navbar.Collapse>
            </Navbar>      
    )
}

export default NavBar