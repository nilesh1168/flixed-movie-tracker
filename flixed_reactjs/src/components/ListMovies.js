import Movie from './Movie'

function ListMovies(props) {
    return (
        <ol className={props.type} >
            {
                props.movieList.length === 0 ? <div>Empty</div> : 
                props.movieList.map(movie => (
                    <Movie key={movie.id} id={movie.id} movieName={movie.title}></Movie>
                ))
            }
        </ol>
    )
}

export default ListMovies