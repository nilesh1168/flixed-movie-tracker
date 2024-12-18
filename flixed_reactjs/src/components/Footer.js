import cssStyle from "../styles/App.module.css";
import tmdb_logo from "../styles/images/TMDB-ico.svg"
function Footer() {

    const styles = {
        verticalLine: {
            borderLeft: '1px solid #8e8d8a',
            height: '40px',
        }
    }

    return (
        <footer id="footer" className={cssStyle.flixed_footer}>
            <h3 className={cssStyle.flixed_name}>Flixed</h3>
            <div style={styles.verticalLine}></div>
            <img src={tmdb_logo} alt="TMDB" width="60"></img>
            <div style={styles.verticalLine}></div>
            <div style={{textAlign:'center'}}>
                <p>&copy; Copyright 2024 </p>
                <p>Designed & Developed by <a style={{color: '#E98074'}} href="http://nilesh1168.github.io">Nilesh Suryawanshi</a></p>
            </div>

        </footer>
    )
}

export default Footer