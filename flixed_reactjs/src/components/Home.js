import { Route, Redirect} from "react-router-dom";
function Home(props){
    if(props.logged_in){

        console.log("Loggign")
    }


    return <Redirect to="/login"/>
}

export default Home