import workingImage from '../styles/images/working-new.png'
import styles from '../styles/App.module.css'
function UnderProduction() {
    return (
        <>
            <div class="grid-cols-3 gap-4 md:grid">
                <div></div>
                <div>
                    <img alt="under-construction" className={styles.working} src={workingImage}></img>
                </div>
                <div></div>
            </div>
            <div class="flex flex-col justify-center">
                <p className="text-xl text-center">Sit back and Relax!</p>
                <div class="justify-center">
                    <p className="text-xl text-center">We are working on something <span className="text-2xl">AWESOME!</span></p>
                </div>
            </div>
        </>
    )
}

export default UnderProduction