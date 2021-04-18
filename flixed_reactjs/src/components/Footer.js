import { Navbar,Container } from 'react-bootstrap'
function Footer() {
    const styles={
        footer:{
            textAlign:"center",
            position:"absolute",
            bottom:"0",
            backgroundColor:"#dbd9d3",
        }
    }
    return (
            <Container fluid style={styles.footer}>
                <p><h3>Flixed</h3></p>
                <p>&copy; Copyright 2021</p> 
                <p>Designed & Developed by <a href="http://nilesh1168.github.io">Nilesh Suryawanshi</a></p>
                </Container>
    )
}

export default Footer