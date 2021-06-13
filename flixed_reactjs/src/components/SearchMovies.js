import { useState } from 'react';

const API_KEY = process.env.REACT_APP_API_KEY


function SearchMovies(props) {
    const [year, setYear] = useState(false);
    const [date,setDate] = useState(false);

    const reset = ()=>{
        if(year)
            setYear(false)
        if(date)
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
        let request = new Request('http://127.0.0.1:8000/movies/watch_list', options)
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
        if(date != null){
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
        let request = new Request('http://127.0.0.1:8000/movies/watched', options)
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
        if(year === null)
            year=""    
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
        <div>
            <div>
                <div className='my-3'>
                    <div className="col-md-4 text-center">
                        <div>
                            <div id="movie_name" type="text" placeholder="Enter Movie Name" />
                            {
                            year ?
                                <div className="my-3" id="movie_year" type="text" placeholder="Enter Movie Year" />
                                : console.log("false")
                        }
                        </div>

                        <div variant="primary" onClick={() => searchMovie()} type="button">Search</div>
                        <div className="ml-3" onClick={() => { setYear(!(year)) }}>Advanced Search</div>
                    </div>
                    <div className="col-md-8">
                        <div className="text-center">
                            <div>
                                <div id='movie' as="textarea" readOnly value={props.searchedMovie.title === undefined ? "" : `Title: ${props.searchedMovie.title}\nGenre: ${props.searchedMovie.genre}\nRating: ${props.searchedMovie.rating}\nYear: ${props.searchedMovie.year}\nRuntime: ${props.searchedMovie.runtime} min\nLanguage: ${props.searchedMovie.language}`} rows={6} />
                                {
                                    date ? <><div className="my-3" id="watched_date" 
                                                type="date" placeholder="Enter Date when watched" />    
                                            <p style={{ color: "orange" }}>NOTE: Leave blank if watched today</p></>
                                           : console.log("false") 
                                }
                            </div>

                            <div>
                                <div>
                                    <p style={{ color: "red" }}>{props.error}</p>
                                </div>
                            </div>
                            <div id="add2watched" variant="primary" onClick={() => addToWatchedList()} type="button">Add to Watched</div>
                            <div onClick={() => { setDate(!(date)) }} className="ml-3">Add Watched Date</div>
                            <div id="add2watchlist" className='ml-3' onClick={() => addToWatchList()} variant="primary" type="button" >Add to Watch List</div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    )
}



export default SearchMovies