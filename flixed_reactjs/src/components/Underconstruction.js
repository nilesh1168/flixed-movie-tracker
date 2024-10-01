import { Component } from "react"
import image from '../styles/images/Inprogress.jpg'
import styles from '../styles/App.module.css'
class UnderConstruction extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <h1>
                            <p>We are working on it.</p>
                        </h1>
                    </div>
                    <div className="col-md-6">                        
                        <img src={image} className="img-fluid"></img>
                    </div>
                </div>
            </div>
        )
    }

}

export default UnderConstruction