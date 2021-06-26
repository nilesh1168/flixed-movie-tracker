import Movie from './Movie'

function WatchList(props) {

    const getIds = () => {
        var selected_options = [...document.getElementById('selected_movies').selectedOptions]
        var ids = []
        selected_options.forEach(option => {
            ids.push({"title":option.innerHTML,"id":option.id})
        })
        return ids
    }

    const moveToWatched = () => {
        console.log("move to watched!!")
        var ids = getIds()
        var options = {
            method: 'PATCH',
            body: JSON.stringify({ "ids": ids }),
            headers: { 
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        }
        var moveRequest = new Request('http://127.0.0.1:8000/movies/watch_list', options)
        fetch(moveRequest).then(response => {
            if (response){
                console.log(response)
                props.handleWatchListDelete(ids)
                props.handleWatchedListAdd(ids)
            }
            else
                throw new Error("Something went wrong!!")
        })
            .catch(error => {
                console.log(error.message)
            })
    }

    const removeFromWatch = () => {
        var ids = getIds()
        var options = {
            method: 'DELETE',
            body: JSON.stringify({ "ids": ids }),
            headers: { 
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        }
        var moveRequest = new Request('http://127.0.0.1:8000/movies/watch_list', options)
        fetch(moveRequest).then(response => {
            if (response) {
                console.log(response.status)
                props.handleWatchListDelete(ids)
            }
            else
                throw new Error("Something went wrong!!")
        })
            .catch(error => {
                console.log(error.message)
            })
    }


    return (
        <div className="flex flex-col justify-center items-center">
            <h4 className="font-bold">Top 5 Movies to Watch </h4>
            <div>
                <ol className="list-decimal" id="selected_movies" multiple>
                    {
                        props.watchList.length === 0 ? <Movie movieName="Empty"></Movie> : props.watchList.map(movie => (
                            <Movie key={movie.id} id={movie.id} movieName={movie.title}></Movie>
                        ))
                    }
                </ol>
            </div>
            {/* <button className="md:mt-0 mt-3 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                onClick={() => moveToWatched()}>Move to Watched</button>
            <button className="md:mt-0 my-3 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                onClick={() => removeFromWatch()} >Remove</button> */}
        </div>
    )
}

export default WatchList