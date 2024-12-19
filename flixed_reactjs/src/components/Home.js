import { Component } from "react";
import SearchMovies from "./SearchMovies"
import { Redirect } from "react-router-dom";
// import WatchedMovies from "./WatchedMovies"
// import WatchList from "./WatchList"


class Home extends Component {
    constructor() {
        super();
        this.state = {
            searchedMovie: {},
            error: "",
        }
        
        this.handleSearchedMovie = this.handleSearchedMovie.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    // componentDidMount() {
    //     const watchedRequest = new Request('http://127.0.0.1:8000/movies/watched/thisweek', { 
    //         method: 'GET',
    //         headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    //      })
    //     const watchListRequest = new Request('http://127.0.0.1:8000/movies/watch_list/top_five', { 
    //         method: 'GET',
    //         headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    //     })
    //     fetch(watchedRequest)
    //         .then(response => {
    //             if (response.ok)
    //                 return response.json()
    //             else
    //                 throw new Error("Something went wrong!!!")
    //         })
    //         .then(data => {
    //             var movies = []
    //             data.map(movie => (
    //                 movies.push({ "title": movie.title, "id": movie.id })
    //             ))
    //             this.setState({
    //                 watchedList: movies
    //             })
    //         })
    //         .catch(error => {
    //             this.setState({
    //                 error: error.message
    //             })
    //         })
    //     fetch(watchListRequest)
    //         .then(response => {
    //             if (response.ok)
    //                 return response.json()
    //             else
    //                 throw new Error("Something went wrong!!!")
    //         })
    //         .then(data => {
    //             var movies = []
    //             data.map(movie => (
    //                 movies.push({ "title": movie.title, "id": movie.id })
    //             ))
    //             this.setState({
    //                 watchList: movies
    //             })
    //         })
    //         .catch(error => {
    //             this.setState({
    //                 error: error.message
    //             })
    //         })
    // }


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

    

    render() {
        console.log("inside home " + this.props.logged_in)
        if (this.props.logged_in) {
            console.log("logged in Home!")
            return (
                <div className="container">
                    {/* <div className="row">
                        <div className="container">
                            <div className="row"></div>
                        </div>
                    </div> */}
                    <SearchMovies error={this.state.error}
                        handleError={this.handleError}
                        // searchedMovie={this.state.searchedMovie}
                        // handleSearchedMovie={this.handleSearchedMovie}
                        // handleWatchListAdd={this.handleWatchListAdd}
                        // handleWatchedListAdd={this.handleWatchedListAdd}
                        configs={this.props.configs}
                    />
                    {/* <Row className="mb-4">
                        <Col>
                            <WatchedMovies watchedList={this.state.watchedList} />
                        </Col>
                        <Col>
                            <WatchList handleWatchedListAdd={this.handleWatchedListAdd}
                                handleWatchListDelete={this.handleWatchListDelete}
                                watchList={this.state.watchList} />
                        </Col>
                    </Row> */}
                </div>
            )
        }
        else {
            console.log("not logged home!!")
            return <Redirect to="/" />
        }
    }

}

export default Home