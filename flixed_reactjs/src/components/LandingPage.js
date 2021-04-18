import Container from "react-bootstrap/Container"
import NavBar from "./NavBar";
import Footer from './Footer'
function LandingPage(props) {
    return (
        <div style={styles.landingImg}>
            <NavBar user={props.user} handle_login = {props.handle_login} logged_in={props.logged_in} />
            <Footer/>
        </div>
    )
}

const styles = {
    landingImg: {
        backgroundImage: `url(images/3.jpg)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
    },
};




export default LandingPage