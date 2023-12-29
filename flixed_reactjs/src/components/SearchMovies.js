import Row from "react-bootstrap/Row";
import FormGroup from 'react-bootstrap/FormGroup'
import Form from 'react-bootstrap/Form'
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button'
import { Col } from "react-bootstrap";
import MovieItem from "./MovieItem";
import { useEffect, useRef, useState } from "react";
// import { Card } from "react-bootstrap";
// const API_KEY = process.env.REACT_APP_API_KEY


function SearchMovies(props) {
    const [movieMap, setMovieMap] = useState([])
    const [searchBtnClicked, setSearchBtnClicked] = useState(false);
    const [currentPage, setCurrentPage] = useState(props.configs.DEFAULT_PAGE_NUMBER);
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

    const totalPages = useRef(0)
    const numberOfResults = useRef(0)

    useEffect(()=>{
        if(searchBtnClicked)
            populateSearchResults()
    }, [currentPage])
    

    const incrementPage = () =>{
        // setPrevBtnDisabled(false)
        setCurrentPage(currentPage => currentPage + 1);
    }

    const decrementPage = () =>{
        if(currentPage <= 1) {
            return
        }
        setCurrentPage(currentPage => currentPage - 1);
    }

    const addToWatchList = () => {
        if (document.getElementById('movie').value === "") {
            props.handleError("Movie Data cannot be empty!!")
        } else {
            let options = {
                method: 'POST',
                body: JSON.stringify(props.searchedMovie),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
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
    }

    const addToWatchedList = () => {
        if (document.getElementById('movie').value === "") {
            props.handleError("Movie Data cannot be empty!!")
        } else {
            let options = {
                method: 'POST',
                body: JSON.stringify(props.searchedMovie),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
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
    }

    const populateSearchResults = () => {
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        }
        let request = new Request(`${props.configs.BASE_URL}/search?query=${encodeURIComponent(document.getElementById('movie_name').value)}&language=${props.configs.DEFAULT_LANG}&page=${currentPage}`, options)
        // console.log(`${props.configs.BASE_URL}/search?query=${encodeURIComponent(document.getElementById('movie_name').value)}&language=${props.configs.DEFAULT_LANG}&page=${props.configs.DEFAULT_PAGE_NUMBER}`)
        console.log(request.url)
        fetch(request, options)
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
                totalPages.current = data.total_pages
                numberOfResults.current = data.total_results
                var movieList = []
                data.results.forEach(element => {
                    var movieItem = {}
                    movieItem.id = element.id
                    movieItem.media_type = element.media_type
                    if (element.media_type === "movie") {
                        movieItem.title = element.title
                        movieItem.release_date = element.release_date
                    }
                    else if (element.media_type === "tv") {
                        movieItem.name = element.name
                        movieItem.first_air_date = element.first_air_date
                    }
                    movieItem.poster_path = element.poster_path
                    // console.log(movieItem)
                    movieList.push(movieItem)
                });
                setMovieMap(movieList)
                // if (data.Error === undefined) {
                //     var obj = { 'id': data.imdbID, 'title': data.Title, 'genre': data.Genre, 'rating': data.imdbRating, 'year': data.Year, 'runtime': data.Runtime.split(" ")[0], 'language': data.Language }
                //     props.handleSearchedMovie(obj)
                //     props.handleError("");
                // }
                // else
                //     props.handleError(data.Error)

            })
            .catch(error => {
                props.handleError(error.message)
            })
    }


    const searchMovie = () => {
        if (document.getElementById('movie_name').value === "") {
            props.handleError("Movie Name cannot be empty!!")
        }
        else {
            populateSearchResults();
            setSearchBtnClicked(true)
        }
    }

    return (
        <Row>
            <Container>
                <Row className='my-3'>
                    <Col className="col-md-4 text-center">
                        <FormGroup>
                            <Form.Control id="movie_name" type="text" placeholder="Enter Movie Name" />
                        </FormGroup>
                        <Button className="mt-2" variant="primary" onClick={() => searchMovie()} type="button">Search</Button>
                        <Button className="mt-2 ml-3" disabled>Advanced Search</Button>
                    </Col>
                    <Col className="col-md-8">
                        <Container className="text-center">
                            <Form.Group>
                                <Form.Control id='movie' as="textarea" readOnly value={props.searchedMovie.title === undefined ? "" : `Title: ${props.searchedMovie.title}\nGenre: ${props.searchedMovie.genre}\nRating: ${props.searchedMovie.rating}\nYear: ${props.searchedMovie.year}\nRuntime: ${props.searchedMovie.runtime} min\nLanguage: ${props.searchedMovie.language}`} rows={6} />
                            </Form.Group>
                            <Button id="add2watched" className="mt-3" variant="primary" onClick={() => addToWatchedList()} type="button">Add to Watched</Button>
                            <Button id="add2watchlist" className='ml-3 mt-3' onClick={() => addToWatchList()} variant="primary" type="button" >Add to Watch List</Button>
                            <Button disabled className="ml-3 mt-3">Advanced Add</Button>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Container className="text-center">
                        <p style={{ color: "red" }}>{props.error}</p>
                    </Container>
                </Row>
                <Row>
                    <Container className="text-center">
                        <Row>
                            {
                                searchBtnClicked ?
                                    movieMap.map(element => (
                                        element.media_type === "movie" ?
                                            <MovieItem key={element.id} type={element.media_type} poster_path={element.poster_path} title={element.title} release_date={element.release_date} />
                                            :
                                            <MovieItem key={element.id} type={element.media_type} poster_path={element.poster_path} name={element.name} first_air_date={element.first_air_date} />
                                    ))
                                    :
                                    <div>Perform Search</div>
                            }
                        </Row>
                        <Row>
                            <Container className="text-center">
                                {
                                    searchBtnClicked ?  
                                    <div>
                                        <Button id="prevBtn" disabled = { currentPage === 1 ? prevBtnDisabled: !prevBtnDisabled} className="mt-2" variant="primary" onClick={() => decrementPage()} type="button">Prev</Button>
                                        <Button id="nextBtn" disabled = { currentPage === totalPages.current ? !nextBtnDisabled : nextBtnDisabled } className="mt-2" variant="primary" onClick={() => incrementPage()} type="button">Next</Button>
                                    </div>
                                    : <div></div>
                                }
                            </Container>
                        </Row>
                    </Container>
                </Row>
            </Container>
        </Row>
    )
}

export default SearchMovies