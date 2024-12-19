import cssStyle from "../styles/App.module.css";
import tmdb_logo from "../styles/images/TMDB-ico.svg"
function Footer() {

    return (
        <footer id="footer" className={cssStyle.flixed_footer}>
            <div className="container-fluid row">
                <span className="col-md-4 text-center"><h3 className={cssStyle.flixed_name}>Flixed</h3></span>
                <span className="col-md-4 text-center my-2"><img src={tmdb_logo} alt="TMDB" height={50}></img></span>
                <div className="col-md-4 text-center">
                    <p>&copy; Copyright 2024 </p>
                    <p>Designed & Developed by <a style={{ color: '#E98074' }} href="http://nilesh1168.github.io">Nilesh Suryawanshi</a></p>
                </div>
            </div>
        </footer>
    )
}

export default Footer