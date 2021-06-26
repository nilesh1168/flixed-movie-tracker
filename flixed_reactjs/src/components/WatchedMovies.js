
function WatchedMovies(props) {
    return (
        <div className="flex flex-col justify-center items-center">
            <h4 className="font-bold">This week's Watched Movies</h4>
            <div>
                {
                    props.watchedList.length === 0 ? <div>Empty</div> : props.watchedList.map(movie => (
                        <div className="list-disc" key={movie.id} >{movie.title}</div>
                    ))
                }
            </div>
        </div>
    )
}

export default WatchedMovies