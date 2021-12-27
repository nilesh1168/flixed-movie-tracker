import {base_url} from '../config/config'

function WatchList(props) {

    const getIds = () => {
        var selected_options = [...document.getElementById('selected_movies').selectedOptions]
        var ids = []
        selected_options.forEach(option => {
            ids.push({ "title": option.innerHTML, "id": option.id })
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
        var moveRequest = new Request(base_url+'/movies/watch_list', options)
        fetch(moveRequest).then(response => {
            if (response) {
                console.log(response)
                props.handleWatchListDelete(ids)
                props.handleWatchedListAdd(ids)
                props.handleComponentWatchListDelete(ids)
                props.handleComponentWatchedListAdd(ids)
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
        var moveRequest = new Request(base_url+'/movies/watch_list', options)
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
            <div>
                    {
                        props.watchList.length === 0 ? <div>Empty</div> :
                <select className="text-center p-3 border outline-none border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-600" id="selected_movies" multiple>
                            {props.watchList.map(movie => (
                                <option key={movie.id} id={movie.id} movieName={movie.title}>{movie.title}</option>
                            ))}
                </select>
                    }
            </div>
            <button className="mt-3 text-white bg-blue-500 border-0 py-2 px-5 focus:outline-none hover:bg-blue-600 rounded text-lg"
                onClick={() => moveToWatched()}>Move to Watched</button>
            <button className="my-3 text-white bg-blue-500 border-0 py-2 px-5 focus:outline-none hover:bg-blue-600 rounded text-lg"
                onClick={() => removeFromWatch()} >Remove</button>
        </div>
    )
}

export default WatchList