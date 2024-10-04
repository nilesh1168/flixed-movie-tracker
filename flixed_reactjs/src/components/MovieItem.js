// import { Card, Col } from "react-bootstrap";
// import { Container } from 'react-bootstrap';
// import Accordion from 'react-bootstrap/Accordion';

function MovieItem(props) {
    var img_src = props.secure_base_url + props.image_size + "/" + props.poster_path
    var id = ""
    var data_target = ""
    if (props.type === 'movie') {
        id = "m" + props.id
        data_target = "#" + id
    }
    else {
        id = "tv" + props.id
        data_target = "#" + id
    }
    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={data_target} aria-expanded="false" aria-controls={id}>
                    {
                        props.type === 'movie' ? props.title : props.name
                    }
                </button>
            </h2>
            <div id={id} className="accordion-collapse collapse" data-bs-parent="#movieAccordion">
                <div className="accordion-body">
                    <div className="row">
                        <div className="col-md-3">
                            <img src={img_src} className="img-fluid" alt={props.type === 'movie' ? props.title : props.name} />
                        </div>
                        <div className="col-md-6">
                            {
                                props.type === 'movie' ? <><p>Title : {props.title}</p><p>Release Date : {props.release_date}</p></> : <> <p>Name : {props.name}</p><p>First Air Date: {props.first_air_date}</p></>
                            }
                            <p>Type : {props.type.toUpperCase()}</p>
                            <p>Times Watched : {props.timesWatched}</p>

                        </div>
                        <div className="col-md-3">
                            {
                                props.parent === "watched" ? <>
                                    {/* add count incremental logic */}
                                    <button id="incrementWatchCount" className='btn btn-outline-dark mt-3' onClick={()=> props.incrementWatchCount(props.id)} type="button">Increase watch count</button>
                                </>
                                    :
                                    <>
                                        <p><button id="add2watched" className="btn btn-outline-dark mt-3" onClick={() => props.addToWatchedList(props.id)} type="button">Add to Watched</button></p>
                                        <button id="add2watchlist" className='btn btn-outline-dark mt-3' onClick={() => props.addToWatchList(props.id)} type="button" >Add to Watch List</button>
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