import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import SearchMovies from './components/SearchMovies'
import WatchList from './components/WatchList'
import WatchedMovies from './components/WatchedMovies'

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
    this.handleWatchListChange = this.handleWatchListChange.bind(this);
    this.handleWatchedListChange = this.handleWatchedListChange.bind(this);
    this.handleSearchedMovie = this.handleSearchedMovie.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8000/movies/watched', { method: 'GET' })
    fetch(request)
      .then(response => {
        if (response.ok)
          return response.json()
        else
          throw new Error("Something went wrong!!!")
      })
      .then(data => {
        var movies = []
        data.map(movie => (
          movies.push(movie.title)
        ))
        this.setState({
          watchedList: movies
        })
      })
      .catch(error => {
        console.log(error.message)
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

  handleWatchListChange(watchMovie) {
    this.setState(
      {
        watchList: [...this.state.watchList, watchMovie]
      }
    )
  }

  handleWatchedListChange(watchedMovie) {
    this.setState(
      {
        watchedList: [...this.state.watchedList, watchedMovie]
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
        <SearchMovies error={this.state.error} handleError={this.handleError} searchedMovie={this.state.searchedMovie} handleSearchedMovie={this.handleSearchedMovie} handleWatchListChange={this.handleWatchListChange} handleWatchedListChange={this.handleWatchedListChange} />
        <Row>
          <Col>
            <WatchedMovies watchedList={this.state.watchedList} />
          </Col>
          <Col>
            <WatchList watchList={this.state.watchList} />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App;
