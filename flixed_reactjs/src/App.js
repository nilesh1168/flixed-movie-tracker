import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles/App.module.css'
import React from 'react'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './components/Home'
import Dashboard from './components/Dashboard'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import jwt_decode from "jwt-decode";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      logged_in: localStorage.getItem('token') ? true : false,
      user: '',
      error:'',
      unauthorized_user: false
    }
    this.handle_login = this.handle_login.bind(this)
    this.handle_logout = this.handle_logout.bind(this)
    this.handle_signup = this.handle_signup.bind(this)
    this.handleError = this.handleError.bind(this);
  }


  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://127.0.0.1:8000/current_user/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          if(json.detail != null){
            this.setState({ logged_in : false })
          }
          else{
            console.log("already logged in "+JSON.stringify(json))
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
        if(res.status === 401){
          this.setState({
            unauthorized_user: true
          })
        }
        else{
          this.setState({
            unauthorized_user: false,
            error:""
          })
        }
        return res.json()
      })
      .then(result => {
        if(this.state.unauthorized_user){
          console.log(result.detail)
          this.handleError(result.detail)
        }else{
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

  render() {
    var main_style = styles.main + " " +styles.main_background
    if(this.state.logged_in)
      main_style = styles.main
    return (
      <Router>
        <div className={styles.App}>
          <NavBar user={this.state.user} handle_login={this.state.handle_login} logged_in={this.state.logged_in} handle_logout={this.handle_logout} />
          <div  id="main" className={main_style}>
            <Switch>
              <Route path='/home'>
                <Home logged_in={this.state.logged_in} />
              </Route>
              <Route path="/login">
                <LoginForm handle_login={this.handle_login} error={this.state.error}/>
              </Route>
              <Route path="/register">
                <RegisterForm handle_signup={ this.handle_signup }/>
              </Route>
              <Route path="/dashboard">
                <Dashboard logged_in={this.state.logged_in}></Dashboard>
              </Route>
            </Switch>
              {
                this.state.logged_in ? <Redirect to="/home"/>  : 
                <Redirect to="/login"/>
              }
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
