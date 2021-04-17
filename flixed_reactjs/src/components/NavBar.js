import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import LoginForm from './LoginForm'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function NavBar(props) {
    return (
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Link to="/"><Navbar.Brand>Flixed</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <span className='mr-auto'></span>
                    {
                        props.logged_in === true ?
                            <Nav>
                                <Nav.Link>{props.user}</Nav.Link>
                                <Nav.Link>Statistics</Nav.Link>
                                <Nav.Link onClick = { ()=> props.handle_logout() }>Logout</Nav.Link>
                            </Nav>
                            :
                            <Nav>
                                <Nav.Link><Link to="/login">Sign In</Link></Nav.Link>
                                <Nav.Link><Link to="/register">Register</Link></Nav.Link>
                            </Nav>
                    }
                </Navbar.Collapse>
            </Navbar>      
    )
}

export default NavBar