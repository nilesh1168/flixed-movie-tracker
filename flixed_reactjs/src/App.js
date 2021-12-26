import styles from './styles/App.module.css'
import React from 'react'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import { isEqual } from "lodash";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {base_url, port } from './config/config' 

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      watchedList: [],
      watchList: [],
      logged_in: localStorage.getItem('token') ? true : false,
      user: ''
    }
    this.handle_login = this.handle_login.bind(this)
    this.handle_logout = this.handle_logout.bind(this)
    this.handle_signup = this.handle_signup.bind(this)
    this.handleWatchListAdd = this.handleWatchListAdd.bind(this);
    this.handleWatchedListAdd = this.handleWatchedListAdd.bind(this);
    this.handleWatchListDelete = this.handleWatchListDelete.bind(this);
  }

  populateData = () => {
    const watchedRequest = new Request(base_url+':'+port+'/movies/watched', {
      method: 'GET',
      headers: { Authorization: `JWT ${localStorage.getItem('token')}` }
    })
    const watchListRequest = new Request(base_url+':'+port+'/movies/watch_list', {
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
        if (data.length != 0) {
          var movies = []
          data.map(object => (
            movies.push({ "title": object.movie.title, "id": object.movie.id })
          ))
          this.setState({
            watchedList: movies
          })
        }
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
        if (data.length != 0) {
          var movies = []
          data.map(object => (
            movies.push({ "title": object.movie.title, "id": object.movie.id })
          ))
          this.setState({
            watchList: movies
          })
        }
      })
      .catch(error => {
        this.setState({
          error: error.message
        })
      })
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch(base_url+':'+port+'/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          if (json.detail != null) {
            this.setState({ logged_in: false })
          }
          else {
            console.log("alreadyt logged in " + JSON.stringify(json))
            this.setState({ user: json.username });
            this.populateData()
          }
        });
    }
    else {
      console.log('User needs to log in')
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch(base_url+':'+port+'/token-auth/', {
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
        console.log("login success!!")
        this.populateData()
      });

  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch(base_url+':'+port+'/users/', {
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
    this.setState({
      watchedList: [],
      watchList: [],
    })
  };

  handleWatchListAdd = (watchMovie) => {
    this.setState(
      {
        watchList: [...this.state.watchList, watchMovie]
      }
    )
  }

  handleWatchListDelete = (watchMovieIds) => {
    watchMovieIds.forEach(delmovie => {
      this.state.watchList.map((movie, index) => (
        isEqual(JSON.stringify(delmovie), JSON.stringify(movie)) ? this.state.watchList.splice(index, 1) : console.log("false")
      ))
    });
    this.setState({
      watchList: this.state.watchList
    })
  }

  handleWatchedListAdd = (watchedMovie) => {
    this.setState(
      {
        watchedList: this.state.watchedList.concat(watchedMovie)
      }
    )
  }

  render() {
    var main_style = styles.main + " " + styles.main_background
    if (this.state.logged_in)
      main_style = styles.main
    return (
      <Router>
        <div className={styles.App}>
          <NavBar user={this.state.user} handle_login={this.state.handle_login} logged_in={this.state.logged_in} handle_logout={this.handle_logout} />
          <div id="main" className={main_style}>
            <Switch>
              <Route path='/home'>
                <Home handleWatchedListAdd={this.handleWatchedListAdd} handleWatchListAdd={this.handleWatchListAdd} logged_in={this.state.logged_in} />
              </Route>
              <Route path='/dashboard'>
                <Dashboard handleWatchListDelete={this.handleWatchListDelete} handleWatchedListAdd={this.handleWatchedListAdd} watchedList={this.state.watchedList} watchList={this.state.watchList} />
              </Route>
              <Route path="/login">
                <LoginForm handle_login={this.handle_login} />
              </Route>
              <Route path="/register">
                <RegisterForm handle_signup={this.handle_signup} />
              </Route>
              <Route path="/">
              </Route>
            </Switch>
            {
              this.state.logged_in ? <Redirect to="/home" /> :
                <Redirect to="/login" />
            }
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
