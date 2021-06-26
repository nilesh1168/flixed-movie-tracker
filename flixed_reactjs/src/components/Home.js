import { Component } from "react";
import { isEqual } from "lodash";
import SearchMovies from "./SearchMovies"
import WatchedMovies from "./WatchedMovies"
import WatchList from "./WatchList"


class Home extends Component {
    constructor() {
        super();
        this.state = {
            watchedList: [],
            watchList: [],
            searchedMovie: {},
            error: "",
        }
        this.handleWatchListAdd = this.handleWatchListAdd.bind(this);
        this.handleWatchedListAdd = this.handleWatchedListAdd.bind(this);
        this.handleWatchListDelete = this.handleWatchListDelete.bind(this);
        this.handleSearchedMovie = this.handleSearchedMovie.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    componentDidMount() {
        const watchedRequest = new Request('http://127.0.0.1:8000/movies/watched/thisweek', {
            method: 'GET',
            headers: { Authorization: `JWT ${localStorage.getItem('token')}` }
        })
        const watchListRequest = new Request('http://127.0.0.1:8000/movies/watch_list/top_five', {
            method: 'GET',
            headers: { Authorization: `JWT ${localStorage.getItem('token')}` }
        })
        fetch(watchedRequest)
            .then(response => {
                if (response.ok)
                    return response.json()
                else
                    throw new Error("Something went wrong!!!")
            })
            .then(data => {
                var movies = []
                data.map(movie => (
                    movies.push({ "title": movie.title, "id": movie.id })
                ))
                this.setState({
                    watchedList: movies
                })
            })
            .catch(error => {
                this.setState({
                    error: error.message
                })
            })
        fetch(watchListRequest)
            .then(response => {
                if (response.ok)
                    return response.json()
                else
                    throw new Error("Something went wrong!!!")
            })
            .then(data => {
                var movies = []
                data.map(movie => (
                    movies.push({ "title": movie.title, "id": movie.id })
                ))
                this.setState({
                    watchList: movies
                })
            })
            .catch(error => {
                this.setState({
                    error: error.message
                })
            })
    }


    handleError(message) {
        this.setState({
            error: message
        })
    }

    handleSearchedMovie(movie) {
        this.setState({
            searchedMovie: movie
        })
    }

    handleWatchListAdd(watchMovie) {
        this.setState(
            {
                watchList: [...this.state.watchList, watchMovie]
            }
        )
    }

    handleWatchListDelete(watchMovieIds) {
        watchMovieIds.forEach(delmovie => {
            this.state.watchList.map((movie, index) => (
                isEqual(JSON.stringify(delmovie), JSON.stringify(movie)) ? this.state.watchList.splice(index, 1) : console.log("false")
            ))
        });
        this.setState({
            watchList: this.state.watchList
        })
    }

    handleWatchedListAdd(watchedMovie) {
        this.setState(
            {
                watchedList: this.state.watchedList.concat(watchedMovie)
            }
        )

    }

    render() {
        console.log("inside home " + this.props.logged_in)
        if (this.props.logged_in) {
            console.log("logged in Home!")
            return (
                <div className='container mx-auto grid-flow-row'>
                    <div>
                        <SearchMovies error={this.state.error}
                            handleError={this.handleError}
                            searchedMovie={this.state.searchedMovie}
                            handleSearchedMovie={this.handleSearchedMovie}
                            handleWatchListAdd={this.handleWatchListAdd}
                            handleWatchedListAdd={this.handleWatchedListAdd}
                        />
                    </div>
                    <div className="container mx-auto my-3 md:grid md:grid-rows-1 md:grid-cols-2 md:my-2">
                        <div>
                            <WatchedMovies watchedList={this.state.watchedList} />
                        </div>
                        <div>
                            <WatchList handleWatchedListAdd={this.handleWatchedListAdd}
                                handleWatchListDelete={this.handleWatchListDelete}
                                watchList={this.state.watchList} />
                        </div>
                    </div>
                </div>
            )
        }
        else {
            console.log("not logged home!!")
            return null
        }
    }

}

export default Home