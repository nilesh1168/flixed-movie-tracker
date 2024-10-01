function Movie(props) {
    return(
        <li id={props.id} key={props.id} value={props.movieName}>{props.movieName}</li>
    )
}

export default Movie