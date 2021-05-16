import Row from "react-bootstrap/Row";
import FormGroup from 'react-bootstrap/FormGroup'
import Form from 'react-bootstrap/Form'
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button'
import { Col } from "react-bootstrap";
import {useState} from 'react';

const API_KEY = process.env.REACT_APP_API_KEY


function SearchMovies(props) {
    const [year,setYear] = useState(false);

    const addToWatchList = () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(props.searchedMovie),
            headers: { 
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `JWT ${localStorage.getItem('token')}`
            },
        }
        let request = new Request('http://127.0.0.1:8000/movies/watch_list', options)
        fetch(request)
            .then(response => {
                if (response.status === 201) {
                    console.log(props.searchedMovie.id)
                    props.handleWatchListAdd({ "title": props.searchedMovie.title, "id": props.searchedMovie.id })
                }
            })
            .catch(error => {
                console.log(error.message)
                props.handleError(error.message)
            })
    }

    const addToWatchedList = () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(props.searchedMovie),
            headers: { 
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `JWT ${localStorage.getItem('token')}`
            },
        }
        let request = new Request('http://127.0.0.1:8000/movies/watched', options)
        fetch(request)
            .then(response => {
                if (response.status === 201) {
                    props.handleWatchedListAdd({ "title": props.searchedMovie.title, "id": props.searchedMovie.id })
                }
            })
            .catch(error => {
                props.handleError(error.message)
            })
    }

    const searchMovie = () => {
        fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(document.getElementById('movie_name').value)}&y=$`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    if (response.status === 401)
                        throw new Error("Unauthorized Access")
                }
            })
            .then((data) => {
                if (data.Error === undefined) {
                    var obj = { 'id': data.imdbID, 'title': data.Title, 'genre': data.Genre, 'rating': data.imdbRating, 'year': data.Year, 'runtime': data.Runtime.split(" ")[0], 'language': data.Language }
                    props.handleSearchedMovie(obj)
                    props.handleError("");
                }
                else
                    props.handleError(data.Error)

            })
            .catch(error => {
                props.handleError(error.message)
            })
    }

    return (
        <Row>
            <Container>
                <Row className='my-3'>
                        <Col className="col-md-4 text-center">
                            <FormGroup>
                                <Form.Control id="movie_name" type="text" placeholder="Enter Movie Name" />
                            </FormGroup>
                            <Button variant="primary" onClick={() => searchMovie()} type="button">Search</Button>
                            <Button className="ml-3" disabled>Advanced Search</Button>
                        </Col>
                        <Col className="col-md-8">
                            <Container className="text-center">
                                <Form.Group>
                                    <Form.Control id='movie' as="textarea" readOnly value={props.searchedMovie.title === undefined ? "" : `Title: ${props.searchedMovie.title}\nGenre: ${props.searchedMovie.genre}\nRating: ${props.searchedMovie.rating}\nYear: ${props.searchedMovie.year}\nRuntime: ${props.searchedMovie.runtime} min\nLanguage: ${props.searchedMovie.language}`} rows={6} />
                                </Form.Group>
                                <Row>
                                    <Container>
                                        <p style={{ color: "red" }}>{props.error}</p>
                                    </Container>
                                </Row>
                                <Button id="add2watched" variant="primary" onClick={() => addToWatchedList()} type="button">Add to Watched</Button>
                                <Button id="add2watchlist" className='ml-3' onClick={() => addToWatchList()} variant="primary" type="button" >Add to Watch List</Button>
                                <Button disabled className="ml-3">Advanced Add</Button>
                            </Container>
                        </Col>
                </Row>
                <hr />
            </Container>
        </Row>
    )
}



export default SearchMovies