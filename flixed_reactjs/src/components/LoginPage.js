import Navbar from "./NavBar";
import LoginForm from "./LoginForm"

const style ={
    landingImg: {
        backgroundImage: `url(images/3.jpg)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
    },
}

function LoginPage(props){
    return(
        <div style={style.landingImg}>
            <Navbar/>
            <LoginForm/>
        </div>
    )    
}

export default LoginPage