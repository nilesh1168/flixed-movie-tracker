import { productName } from "../styles/App.module.css";
function Footer() {

    const styles = {
        footerStyle: {
            display: 'flex',
            height: '80px',
            justifyContent: 'space-evenly',
            alignItems: 'center',
        },
        verticalLine: {
            borderLeft: '1px solid black',
            height: '40px',
        }
    }

    return (
        <footer style={styles.footerStyle}>
            <div><h3 className={productName}>Flixed</h3></div>
            <div style={styles.verticalLine}></div>
            <div style={{textAlign:'center'}}>
                <p>&copy; Copyright 2021 </p>
                <p>Designed & Developed by <a href="http://nilesh1168.github.io">Nilesh Suryawanshi</a></p>
            </div>

        </footer>
    )
}

export default Footer