import styles from './styles/App.module.css'
import '../src/styles/App.module.css'
import React from 'react'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import TMDB_Configuration from './components/config'
import Test from './components/test'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import jwt_decode from "jwt-decode";
import Statistics from './components/Statistics';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      logged_in: localStorage.getItem('token') ? true : false,
      // logged_in: true,
      user: '',
      error: '',
      unauthorized_user: false,
    }
    this.handle_login = this.handle_login.bind(this)
    this.handle_logout = this.handle_logout.bind(this)
    this.handle_signup = this.handle_signup.bind(this)
    this.handleError = this.handleError.bind(this);
  }

  static tmdb_config = TMDB_Configuration.getConfigs()

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://127.0.0.1:8000/current_user/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          if (json.detail != null) {
            this.setState({ logged_in: false })
          }
          else {
            console.log("already logged in " + JSON.stringify(json))
            this.setState({ user: json.username });
          }
        });
    }
    else {
      console.log('User needs to log in')
    }
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
      .then(res => {
        if (res.status === 401) {
          this.setState({
            unauthorized_user: true
          })
        }
        else {
          this.setState({
            unauthorized_user: false,
            error: ""
          })
        }
        return res.json()
      })
      .then(result => {
        if (this.state.unauthorized_user) {
          console.log(result.detail)
          this.handleError(result.detail)
        } else {
          localStorage.setItem('token', result.access);
          this.setState({
            logged_in: true,
            user: jwt_decode(result.access).username
          });
          console.log("login success!!")
        }
      })
      
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/users/', {
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

  handleError(message) {
    this.setState({
      error: message
    })
  }

  // async function getTMDBConfigs(){
  //   return await fetch('http://127.0.0.1:8000/tmdb_configurations', {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: `Bearer ${localStorage.getItem('token')}`
  //           },
  //         }).then(res => {
  //           return res.json()
  //         })
  // }

  render() {
    return (
      //   <Accordion>
      //   <Accordion.Item eventKey="0">
      //     <Accordion.Header>Accordion Item #1</Accordion.Header>
      //     <Accordion.Body>
      //       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      //       eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      //       minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      //       aliquip ex ea commodo consequat. Duis aute irure dolor in
      //       reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      //       pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
      //       culpa qui officia deserunt mollit anim id est laborum.
      //     </Accordion.Body>
      //   </Accordion.Item>
      //   <Accordion.Item eventKey="1">
      //     <Accordion.Header>Accordion Item #2</Accordion.Header>
      //     <Accordion.Body>
      //       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      //       eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      //       minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      //       aliquip ex ea commodo consequat. Duis aute irure dolor in
      //       reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      //       pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
      //       culpa qui officia deserunt mollit anim id est laborum.
      //     </Accordion.Body>
      //   </Accordion.Item>
      // </Accordion>
      //   <div className='App'>
      //   <header className='App-header'>
      //     <div class='alert alert-primary' role='alert'>
      //       <p style={{ display: "none" }} className='d-block'>
      //         Bootstrap is now successfully installed 😃
      //       </p>
      //       <p className='d-none'>
      //         Bootstrap is not installed if you can see this 😢
      //       </p>
      //     </div>
      //   </header>
      // </div>

      <Router>
        <div className={styles.flixed_app}>
          <NavBar user={this.state.user} handle_login={this.state.handle_login} logged_in={this.state.logged_in} handle_logout={this.handle_logout} />
          <div id="main" className={styles.flixed_main}>
            <Switch>
              <Route path='/home'>
                <Home logged_in={this.state.logged_in} configs={App.tmdb_config}/>
              </Route>
              <Route path="/login">
                <LoginForm handle_login={this.handle_login} error={this.state.error} />
              </Route>
              <Route path="/register">
                <RegisterForm handle_signup={this.handle_signup} />
              </Route>
              <Route path="/dashboard">
                <Dashboard configs={App.tmdb_config}/>
              </Route>
              <Route path="/statistics">
                <Statistics />
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
      
      // <Test/>
    )
  }
}

export default App;

// image_size={this.state.tmdb_config.images.poster_sizes[0]}
// secure_base_url={this.state.tmdb_config.images.secure_base_url} image_sizes={this.state.tmdb_config.images.poster_sizes}