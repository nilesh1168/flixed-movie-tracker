// import Row from "react-bootstrap/Row";
// import FormGroup from 'react-bootstrap/FormGroup'
// import Form from 'react-bootstrap/Form'
// import Container from "react-bootstrap/Container";
// import button from 'react-bootstrap/button'
// import { Col } from "react-bootstrap";
import MovieItem from "./MovieItem";
import { useEffect, useRef, useState, useCallback } from "react";
// import Accordion from 'react-bootstrap/Accordion';
// import { Card } from "react-bootstrap";
// const API_KEY = process.env.REACT_APP_API_KEY


function SearchMovies(props) {
    const [movieMap, setMovieMap] = useState([])
    const [searchBtnClicked, setSearchBtnClicked] = useState(false);
    const [currentPage, setCurrentPage] = useState(props.configs.default_page_number);
    const base_url = props.configs.base_url
    const default_lang = props.configs.default_lang
    const image_size = props.configs.images.poster_sizes[0];
    const secure_base_url = props.configs.images.secure_base_url
    const totalPages = useRef(0)
    const numberOfResults = useRef(0)
    const handleError = props.handleError

    const populateSearchResults = useCallback(() => {
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        }
        let request = new Request(`${base_url}/search/movie?query=${encodeURIComponent(document.getElementById('movie_name').value)}&language=${default_lang}&page=${currentPage}`, options)
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
                    movieItem.media_type = element.media_type = 'movie'     // update this line when adding support for TV and Movie both
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
                handleError(error.message)
            })
    },[base_url, currentPage, default_lang, handleError])
    
    useEffect(() => {
        if (searchBtnClicked)
            populateSearchResults()
    }, [currentPage, searchBtnClicked, populateSearchResults])


    const incrementPage = () => {
        // setPrevBtnDisabled(false)
        setCurrentPage(currentPage => currentPage + 1);
    }

    const decrementPage = () => {
        if (currentPage <= 1) {
            return
        }
        setCurrentPage(currentPage => currentPage - 1);
    }

    const addToWatchList = (movieId) => {
        var data = {
            "id": movieId
        }
        let options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        }
        let request = new Request(`${base_url}/movies/watch_list`, options)
        fetch(request)
            .then(response => {
                if (response.status === 201) {
                    console.log("added movie")
                    props.handleError("added movie to watchlist")
                    // console.log(props.searchedMovie.id)
                    // props.handleWatchListAdd({ "title": props.searchedMovie.title, "id": props.searchedMovie.id })
                }
            })
            .catch(error => {
                console.log(error.message)
                props.handleError(error.message)
            })
    }

    const addToWatchedList = (movieId) => {
        var data = {
            "id": movieId
        }
        let options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        }
        let request = new Request(`${base_url}/movies/watched`, options)
        fetch(request)
            .then(response => {
                if (response.status === 201) {
                    console.log("added movie")
                    props.handleError("Movie added successfully to watched")
                    // show a alert that movie has been added successfully
                    // props.handleWatchedListAdd({ "title": props.searchedMovie.title, "id": props.searchedMovie.id })
                }
            })
            .catch(error => {
                props.handleError(error.message)
            })
    }



    const searchMovie = () => {
        props.handleError("")
        if (document.getElementById('movie_name').value === "") {
            props.handleError("Movie Name cannot be empty!!")
        }
        else {
            populateSearchResults();
            setSearchBtnClicked(true)
        }
    }

    return (
        <div className="row">
            <div className="container">
                <div className='row my-3'>
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-4 text-center">
                        <div className="container">
                            <input className="form-control" id="movie_name" type="text" placeholder="Enter Name" />
                            <button className="btn btn-outline-dark mt-2" onClick={() => searchMovie()} type="button">Search </button>
                            <button className="btn btn-outline-dark mt-2 mx-3" disabled>Advanced Search</button>
                        {/* </div>
                        <div className="flex-row"> */}
                        </div>
                    </div>
                    <div className="col-md-4">
                    <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="movieCheckChecked" checked/>
                                <label class="form-check-label" for="movieCheckChecked">
                                    Movie
                                </label>
                            </div>
                            {/* <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="tvCheckChecked" />
                                <label class="form-check-label" for="tvCheckChecked">
                                    TV
                                </label>
                            </div> */}
                    </div>
                </div>
                <div className="text-center"><p> <span style={{color:'red'}}>*</span> Current media type support for movies only.</p></div>
                <hr className="my-2"></hr>
                <div className="row">
                    <div className="container text-center">
                        <p style={{ color: "red" }}>{props.error}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="container">
                        <div className="row">
                            <div className="container">
                                <div className="accordion" id="movieAccordion">
                                    {
                                        searchBtnClicked ?
                                            movieMap.map(element => (
                                                element.media_type === "movie" ?
                                                    <MovieItem key={element.id} id={element.id} type={element.media_type} poster_path={element.poster_path} title={element.title} release_date={element.release_date} addToWatchList={addToWatchList} addToWatchedList={addToWatchedList} secure_base_url={secure_base_url} image_size={image_size} />
                                                    :
                                                    <MovieItem key={element.id} id={element.id} type={element.media_type} poster_path={element.poster_path} name={element.name} first_air_date={element.first_air_date} addToWatchList={addToWatchList} addToWatchedList={addToWatchedList} secure_base_url={secure_base_url} image_size={image_size} />
                                            ))
                                            :
                                            <div className="text-center"><p>Perform Search</p></div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="d-flex flex-row mb-3 justify-content-center">
                                {
                                    searchBtnClicked ?
                                        <div>
                                            <button id="prevBtn" disabled={currentPage === 1 ? true : false} className="btn btn-outline-dark mt-2" onClick={() => decrementPage()} type="button">Prev</button>
                                            <button className="btn mt-2" style={{ cursor: "default" }}>{currentPage} of {totalPages.current}</button>
                                            <button id="nextBtn" disabled={currentPage === totalPages.current ? true : false} className="btn btn-outline-dark mt-2" onClick={() => incrementPage()} type="button">Next</button>
                                        </div>
                                        : <div></div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchMovies