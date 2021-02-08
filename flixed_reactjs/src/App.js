import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import SearchMovies from './components/SearchMovies'
import WatchList from './components/WatchList'
import WatchedMovies from './components/WatchedMovies'
import { isEqual } from 'lodash';
const DATE = new Date()

class App extends React.Component {
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
    const watchedRequest = new Request('http://127.0.0.1:8000/movies/watched', { method: 'GET' })
    const watchListRequest = new Request('http://127.0.0.1:8000/movies/watch_list', { method: 'GET' })
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
        watchList:[...this.state.watchList,watchMovie]
      }
    )
  }

  handleWatchListDelete(watchMovieIds) {
    watchMovieIds.forEach(delmovie => {
        this.state.watchList.map((movie,index)=>(
          isEqual(JSON.stringify(delmovie),JSON.stringify(movie)) ? this.state.watchList.splice(index,1) : console.log("false")
        ))
    });
    this.setState({
      watchList:this.state.watchList
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
    return (
      <Container>
        <Row>
          <Container>
            <Row className='justify-content-center'>
              <h2 style={{ color: 'red' }}>FLIXED</h2>
            </Row>
            <Row>
              <Container>{DATE.toDateString()}</Container>
            </Row>
            <hr />
            <Row></Row>
          </Container>
        </Row>
        <SearchMovies error={this.state.error} handleError={this.handleError} searchedMovie={this.state.searchedMovie} handleSearchedMovie={this.handleSearchedMovie} handleWatchListAdd={this.handleWatchListAdd} handleWatchedListAdd={this.handleWatchedListAdd} />
        <Row>
          <Col>
            <WatchedMovies watchedList={this.state.watchedList} />
          </Col>
          <Col>
            <WatchList handleWatchedListAdd={this.handleWatchedListAdd} handleWatchListDelete={this.handleWatchListDelete} watchList={this.state.watchList} />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App;
