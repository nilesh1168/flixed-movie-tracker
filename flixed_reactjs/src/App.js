import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles/App.module.css'
import React from 'react'
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import SearchMovies from './components/SearchMovies'
import WatchList from './components/WatchList'
import WatchedMovies from './components/WatchedMovies'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { isEqual } from 'lodash';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      watchedList: [],
      watchList: [],
      searchedMovie: {},
      error: "",
      logged_in: localStorage.getItem('token') ? true : false,
      user: ''
    }
    this.handleWatchListAdd = this.handleWatchListAdd.bind(this);
    this.handleWatchedListAdd = this.handleWatchedListAdd.bind(this);
    this.handleWatchListDelete = this.handleWatchListDelete.bind(this);
    this.handleSearchedMovie = this.handleSearchedMovie.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handle_login = this.handle_login.bind(this)
    this.handle_logout = this.handle_logout.bind(this)
    this.handle_signup = this.handle_signup.bind(this)
  }


  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://127.0.0.1:8000/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ user: json.username });
        });
    }
    else {
      console.log('User needs to log in')
    }


    // const watchedRequest = new Request('http://127.0.0.1:8000/movies/watched', { method: 'GET' })
    // const watchListRequest = new Request('http://127.0.0.1:8000/movies/watch_list', { method: 'GET' })
    // fetch(watchedRequest)
    //   .then(response => {
    //     if (response.ok)
    //       return response.json()
    //     else
    //       throw new Error("Something went wrong!!!")
    //   })
    //   .then(data => {
    //     var movies = []
    //     data.map(movie => (
    //       movies.push({ "title": movie.title, "id": movie.id })
    //     ))
    //     this.setState({
    //       watchedList: movies
    //     })
    //   })
    //   .catch(error => {
    //     this.setState({
    //       error: error.message
    //     })
    //   })
    // fetch(watchListRequest)
    //   .then(response => {
    //     if (response.ok)
    //       return response.json()
    //     else
    //       throw new Error("Something went wrong!!!")
    //   })
    //   .then(data => {
    //     var movies = []
    //     data.map(movie => (
    //       movies.push({ "title": movie.title, "id": movie.id })
    //     ))
    //     this.setState({
    //       watchList: movies
    //     })
    //   })
    //   .catch(error => {
    //     this.setState({
    //       error: error.message
    //     })
    //   })
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

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          user: json.user.username
        });

      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          user: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, user: '' });
  };

  // render() {
  //   var page;
  //   this.state.logged_in ? 
  //   page =
  //     <Container>
  //       <NavBar user={this.state.user} logged_in={this.state.logged_in} handle_logout={this.handle_logout}/>
  //       <Container>
  //         <Row>
  //           <Container>
  //             <Row></Row>
  //           </Container>
  //         </Row>
  //         <SearchMovies error={this.state.error} handleError={this.handleError} searchedMovie={this.state.searchedMovie} handleSearchedMovie={this.handleSearchedMovie} handleWatchListAdd={this.handleWatchListAdd} handleWatchedListAdd={this.handleWatchedListAdd} />
  //         <Row>
  //           <Col>
  //             <WatchedMovies watchedList={this.state.watchedList} />
  //           </Col>
  //           <Col>
  //             <WatchList handleWatchedListAdd={this.handleWatchedListAdd} handleWatchListDelete={this.handleWatchListDelete} watchList={this.state.watchList} />
  //           </Col>
  //         </Row>

  //       </Container>
  //     </Container>

  //   :
  //   page = <LandingPage user={this.state.user} handle_login={this.handle_login} logged_in={this.state.logged_in} handle_signup = { this.handle_signup}/>
  //   return(page)
  // }

  render() {
    return (
      <Router>
        <div className={styles.App}>
          <NavBar user={this.state.user} handle_login={this.state.handle_login} logged_in={this.state.logged_in} />
          <div className={styles.main}>
            <Switch>
              <Route path="/login">
                <LoginForm />
              </Route>
              <Route path="/register">
                <RegisterForm />
              </Route>
              <Route path="/">
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
