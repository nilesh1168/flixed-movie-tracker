function Movie(props) {
    return(
        <option id={props.id} key={props.id} value={props.movieName}>{props.movieName}</option>
    )
}

export default Movie