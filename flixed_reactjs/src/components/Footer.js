import { flixed_name } from "../styles/App.module.css";
function Footer() {

    const styles = {
        footerStyle: {
            marginTop: 'auto',
            display: 'flex',
            height: '80px',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: '#EAE7DC',
        },
        verticalLine: {
            borderLeft: '1px solid #8e8d8a',
            height: '40px',
        }
    }

    return (
        <footer style={styles.footerStyle}>
            <h3 className={flixed_name}>Flixed</h3>
            <div style={styles.verticalLine}></div>
            <div style={{textAlign:'center'}}>
                <p>&copy; Copyright 2023 </p>
                <p>Designed & Developed by <a style={{color: '#E98074'}} href="http://nilesh1168.github.io">Nilesh Suryawanshi</a></p>
            </div>

        </footer>
    )
}

export default Footer