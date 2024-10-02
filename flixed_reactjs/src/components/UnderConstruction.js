import workingImage from '../styles/images/working-new.png'
import styles from '../styles/App.module.css'

function UnderProduction() {
    return (
        <>
            <div class="container row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <img alt="under-construction" className={styles.working} src={workingImage}></img>
                </div>
                <div class="col-md-3"></div>
            </div>
            <div class="flex flex-col justify-center">
                <h5 className="text-center">Sit back and Relax!</h5>
                <div class="justify-center">
                    <h5 className="text-center">We are working on something<h4>AWESOME!</h4></h5>
                </div>
            </div>
        </>
    )
}

export default UnderProduction