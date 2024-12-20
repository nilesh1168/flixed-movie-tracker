// import { Card, Col } from "react-bootstrap";
// import { Container } from 'react-bootstrap';
// import Accordion from 'react-bootstrap/Accordion';
import Constants from "./constants"
function MovieItem(props) {
    var img_src = props.secure_base_url + props.image_size + props.poster_path
    var id = ""
    var data_target = ""
    if (Constants.MOVIE === props.type) {
        id = "m" + props.id
        data_target = "#" + id
    }
    else {
        id = Constants.TV + props.id
        data_target = "#" + id
    }
    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={data_target} aria-expanded="false" aria-controls={id}>
                    {
                       Constants.MOVIE === props.type ? props.title : props.name
                    }
                </button>
            </h2>
            <div id={id} className="accordion-collapse collapse" data-bs-parent="#movieAccordion">
                <div className="accordion-body">
                    <div className="row">
                        <div className="col-md-3 text-center">
                            <img src={img_src} className="img-fluid" alt={Constants.MOVIE === props.type ? props.title : props.name} />
                        </div>
                        <div className="col-md-5 my-1">
                            {
                                Constants.MOVIE === props.type ? <><p>Title : {props.title}</p><p>Release Date : {props.release_date}</p></> : <> <p>Name : {props.name}</p><p>First Air Date: {props.first_air_date}</p></>
                            }
                            <p>Type : {props.type.toUpperCase()}</p>
                            {
                                Constants.WATCHED === props.parent ? <p>Times Watched : {props.timesWatched}</p> :<></>
                            }

                        </div>
                        <div className="col-md-4 d-flex align-items-center">
                            {
                                Constants.WATCHED === props.parent ? <>
                                    {/* add count incremental logic */}
                                    <div ><button id="incrementWatchCount" className='btn btn-outline-dark' onClick={()=> props.incrementWatchCount(props.id)} type="button">Increase watch count</button></div>
                                </>
                                    :
                                    <>
                                        <button id="add2watched" className="btn btn-outline-dark" onClick={() => props.addToWatchedList(props.id)} type="button">Add to Watched</button>
                                        <button id="add2watchlist" className='btn btn-outline-dark ms-1' onClick={() => props.addToWatchList(props.id)} type="button" >Add to Watch List</button>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieItem