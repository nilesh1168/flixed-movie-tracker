import {
    NavLink,
    Link
} from "react-router-dom";
import styles from '../styles/App.module.css'

function NavBar(props) {
    return (

        //   <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        //     <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        //       <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-blue-500 rounded-full" viewBox="0 0 24 24">
        //         <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        //       </svg>
        //       <span class="ml-3 text-xl">Tailblocks</span>
        //     </a>
        //     <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
        //       <a class="mr-5 hover:text-gray-900">First Link</a>
        //       <a class="mr-5 hover:text-gray-900">Second Link</a>
        //       <a class="mr-5 hover:text-gray-900">Third Link</a>
        //       <a class="mr-5 hover:text-gray-900">Fourth Link</a>
        //     </nav>
        //   </div>
        <header>
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <div className="flex items-center text-gray-900 mb-4 md:mb-0">
                    <NavLink to="/home">
                        <h2 className={styles.productName}>Flixed</h2>
                    </NavLink>
                </div>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    {
                        props.logged_in === true ?
                            <>
                                <div className="mr-5 hover:text-gray-900">{props.user}</div>
                                <div className="mr-5 hover:text-gray-900"><Link className={styles.navLink} to="/home">Home</Link></div>
                                <div className="mr-5 hover:text-gray-900"><Link className={styles.navLink} to="/dashboard">Dashboard</Link></div>
                                <div className="mr-5 hover:text-gray-900">Statistics</div>
                                <div className="mr-5 hover:text-gray-900 cursor-pointer" onClick={() => props.handle_logout()}>Logout</div>
                            </>
                            :
                            <>
                                <div className="mr-5 hover:text-gray-900"><Link className={styles.navLink} to="/login">Sign In</Link></div>
                                <div className="mr-5 hover:text-gray-900"><Link className={styles.navLink} to="/register">Register</Link></div>
                            </>
                    }
                </nav>
            </div>
        </header>
    )
}

export default NavBar