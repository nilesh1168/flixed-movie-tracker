
function WatchedMovies(props) {
    return (
        <div>
        <h4>This week's Watched Movies</h4>
        <div variant='flush' style={{overflow:'auto', height:'30vh'}}>
            {
                
                props.watchedList.length === 0 ? <div>Empty</div> : props.watchedList.map(movie=>(
                    <div key={movie.id} >{movie.title}</div>
                ))  
                
            }
        </div>
        </div>
    )
}

export default WatchedMovies