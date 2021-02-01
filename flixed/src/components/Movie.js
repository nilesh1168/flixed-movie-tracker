function Movie(props) {
    return(
        <option value={props.movieName}>{props.movieName}</option>
    )
}

export default Movie