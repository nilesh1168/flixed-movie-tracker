import ListMovies from './ListMovies'

function WatchedMovies(props) {
    return (
        <div className="flex flex-col justify-center items-center">
            <div>
                <ListMovies type="list-disc" movieList={props.watchedList}/>
            </div>
        </div>
    )
}

export default WatchedMovies