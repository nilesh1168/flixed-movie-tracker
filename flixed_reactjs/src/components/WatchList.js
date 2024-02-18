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
                Authorization: `Bearer ${localStorage.getItem('token')}`
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
                Authorization: `Bearer ${localStorage.getItem('token')}`
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
        <div className='container'>
            <div>
                <select className="form-select" id="selected_movies" as="select" multiple>
                    {
                        props.watchList.length === 0 ? <Movie movieName="Empty"></Movie> : props.watchList.map(movie => (
                            <Movie key={movie.id} id={movie.id} movieName={movie.title}></Movie>
                        ))
                    }
                </select>
            </div>
            <button type="button" className='btn btn-outline-dark mt-2' onClick={() => moveToWatched()}>Move to Watched</button>
            <button type="button" className='btn btn-outline-dark mt-2 ml-3' onClick={() => removeFromWatch()}>Remove</button>
            <button type="button" className='btn btn-outline-dark mt-2 ml-3 m-1' disabled>See complete WatchList</button>
        </div>
    )
}

export default WatchList