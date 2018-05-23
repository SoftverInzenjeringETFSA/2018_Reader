import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import HomePage from './components/Home/HomePage.js';
import Login from './components/Login.js';

import { 
  BrowserRouter as Router, 
  Route, 
  Redirect,
  Link
} from 'react-router-dom';

const axios = require('axios');



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      poruka : null,
      id : '',
      sesija : ''
    }

    this.loginKorisnika = this.loginKorisnika.bind(this);
    this.logoutKorisnika = this.logoutKorisnika.bind(this);
  }

  loginKorisnika(korisnik) {
    axios.get('/login', {
        params : {
            'email' : korisnik.email,
            'lozinka' : korisnik.lozinka
        }
    })
    .then(response => {
        if (response.data.success) {
          if (response.data.success == 'yes')
              this.setState({
                id : response.data.data,
                sesija : response.data.session,
                poruka : null
              });
          else  
              this.setState({poruka : response.data.data});
        }
        else
          this.setState({poruka : response.data.data})
    })
    .catch(error => {
      this.setState({poruka : error.toString()});
    });
  }

  logoutKorisnika(sesija) {
    axios.get('/logout', {
      params : {
        'sesija' : sesija
      }
    })
    .then(response => {
      if (response.data.success) {
        this.setState({id : '', poruka : null})
      }
      else {
        this.setState({poruka : response.data.data});
      }
    })
    .catch(error => {
      this.setState({poruka : error.toString()});
    })

  }


  render() {
    const loginPage = () => <Login poruka={this.state.poruka} login={this.loginKorisnika}/>
    const homePage = () => <HomePage id={this.state.id} sesija={this.state.sesija} poruka={this.state.poruka} logout={this.logoutKorisnika} />;
    var redirect = this.state.id.length > 0 ? '/homePage' : '/';

    return (
      <Router>
        <div className="App"> 
      <Route exact path="/" render={() => (
      <Redirect to={redirect}/>
        )
      }/>
            {this.state.id.length == 0 ? <Redirect from="/homePage"to="/"/> :null}
            <Route exact path="/" component={loginPage}/>
            <Route  path="/homePage" component={homePage}/>
            
            }
      </div>
      </Router>
    );
  }
}

export default App;