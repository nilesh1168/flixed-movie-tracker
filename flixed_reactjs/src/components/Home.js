import { Component } from "react";
import SearchMovies from "./SearchMovies"

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
                <div className='container mx-auto grid-flow-row'>
                    <div>
                        <SearchMovies error={this.state.error}
                            handleError={this.handleError}
                            searchedMovie={this.state.searchedMovie}
                            handleSearchedMovie={this.handleSearchedMovie}
                            handleWatchListAdd={this.props.handleWatchListAdd}
                            handleWatchedListAdd={this.props.handleWatchedListAdd}
                        />
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