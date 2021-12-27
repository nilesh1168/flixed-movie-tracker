import { useState } from 'react';
import {base_url } from '../config/config'

const API_KEY = process.env.REACT_APP_API_KEY


function SearchMovies(props) {
    const [year, setYear] = useState(false);
    const [date, setDate] = useState(false);

    const reset = () => {
        if (year)
            setYear(false)
        if (date)
            setDate(false)
        document.getElementById('movie').value = ""
    }


    const addToWatchList = () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(props.searchedMovie),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `JWT ${localStorage.getItem('token')}`
            },
        }
        let request = new Request(base_url+'/movies/watch_list', options)
        fetch(request)
            .then(response => {
                if (response.status === 201) {
                    console.log(props.searchedMovie.id)
                    props.handleWatchListAdd({ "title": props.searchedMovie.title, "id": props.searchedMovie.id })
                    reset()
                }
            })
            .catch(error => {
                console.log(error.message)
                props.handleError(error.message)
            })
    }

    const addToWatchedList = () => {
        var date = document.getElementById('watched_date')
        if (date != null) {
            props.searchedMovie['watched_date'] = date.value
        }
        let options = {
            method: 'POST',
            body: JSON.stringify(props.searchedMovie),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `JWT ${localStorage.getItem('token')}`
            },
        }
        let request = new Request(base_url+'/movies/watched', options)
        fetch(request)
            .then(response => {
                if (response.status === 201) {
                    props.handleWatchedListAdd({ "title": props.searchedMovie.title, "id": props.searchedMovie.id })
                    reset()
                }
            })
            .catch(error => {
                props.handleError(error.message)
            })
    }

    const searchMovie = () => {
        var year = document.getElementById('movie_year')
        if (year === null)
            year = ""
        fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(document.getElementById('movie_name').value)}&y=${year.value}`)
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
        <>
            <div className='grid-flow-col grid-rows-2 my-2 md:grid md:grid-rows-1 md:grid-cols-2'>
                <div className="flex flex-col items-center justify-center mb-3">
                    <input id="movie_name" type="text" placeholder="Enter Movie Name" className="mb-3 w-3/5 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                            text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    {
                        year ?
                            <input id="movie_year" type="text" placeholder="Enter Movie Year" className="mb-3 w-3/5 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                                    text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            : console.log("false")
                    }

                    <button className="mb-3 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                        onClick={() => { setYear(!(year)) }}>Advanced Search</button>
                    <button className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                        onClick={() => searchMovie()} type="button">Search</button>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <textarea className="w-5/6 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                        id='movie' type="textarea" readOnly
                        value={props.searchedMovie.title === undefined ? "" : `Title: ${props.searchedMovie.title}\nGenre: ${props.searchedMovie.genre}\nRating: ${props.searchedMovie.rating}\nYear: ${props.searchedMovie.year}\nRuntime: ${props.searchedMovie.runtime} min\nLanguage: ${props.searchedMovie.language}`}
                        rows={6} />
                    {
                        date ? <><input className="mt-3 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                                        text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" id="watched_date"
                            type="date" placeholder="Enter Date when watched" />
                            <p style={{ color: "orange" }}>NOTE: Leave blank if watched today</p></>
                            : console.log("false")
                    }
                    <p style={{ color: "red" }}>{props.error}</p>
                    <div className="flex flex-col md:flex-row md:mt-3">
                        <button className="md:mt-0 my-3 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                            onClick={() => { setDate(!(date)) }} >Add Watched Date</button>
                        <button className="md:ml-3 mb-3 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                            id="add2watched" onClick={() => addToWatchedList()} >Add to Watched</button>
                        <button className="md:ml-3 mb-3 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                            id="add2watchlist" onClick={() => addToWatchList()} >Add to Watch List</button>
                    </div>
                </div>
            </div>
        </>
    )
}



export default SearchMovies