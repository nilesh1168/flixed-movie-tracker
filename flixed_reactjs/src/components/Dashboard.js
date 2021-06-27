import { Component } from "react";
import ListMovies from "./ListMovies"
import WatchList from "./WatchList";

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            watchedList: [],
            watchList: [],
            error: "",
        }

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

    handleError = (message) => {
        this.setState({
            error: message
        })
    }

    // componentDidUpdate(prevProps){
    //     if(prevProps.watchedList.length != this.props.watchedList.length){
    //         console.log(prevProps.watchedList.length+"  "+this.props.watchedList.length)
    //     }
    // }

    render() {
        return (
            <div className="flex flex-col">
                <div className="container mx-auto my-3 flex flex-col items-center md:flex-row md:justify-evenly">
                    <div className="mb-3">
                        <div className="text-center">
                            <h4 className="font-bold">This week's Watched Movies</h4>
                            <ListMovies movieList={this.state.watchedList} />
                        </div>
                    </div>
                    <div>
                        <div className="text-center">
                            <h4 className="font-bold">Top 5 Movies to Watch </h4>
                            <ListMovies movieList={this.state.watchList} />
                        </div>
                    </div>
                </div>
                <hr className="my-3 w-9/12 self-center" />
                <div className="container mx-auto my-3 flex flex-col items-center md:flex-row md:justify-evenly">
                    <div className="mb-3">
                        <div className="text-center">
                            <h4 className="font-bold">Watched Movies</h4>
                            <ListMovies movieList={this.props.watchedList} />
                        </div>
                    </div>
                    <hr className="my-3 w-9/12 self-center md:w-0" />
                    <div>
                        <div className="text-center">
                            <h4 className="font-bold">WatchList</h4>
                            <WatchList watchList={this.props.watchList}
                                handleWatchListDelete={this.props.handleWatchListDelete}
                                handleWatchedListAdd={this.props.handleWatchedListAdd} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard