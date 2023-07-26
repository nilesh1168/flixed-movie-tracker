import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
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
        <Container>
            <h4>Top 5 Movies to Watch </h4>
            <Form.Group>
                <Form.Control id="selected_movies" as="select" multiple>
                    {
                        props.watchList.length === 0 ? <Movie movieName="Empty"></Movie> : props.watchList.map(movie => (
                            <Movie key={movie.id} id={movie.id} movieName={movie.title}></Movie>
                        ))
                    }
                </Form.Control>
            </Form.Group>
            <Button onClick={() => moveToWatched()}>Move to Watched</Button>
            <Button onClick={() => removeFromWatch()} className='ml-3'>Remove</Button>
            <Button disabled className="ml-3" >See complete WatchList</Button>
        </Container>
    )
}

export default WatchList