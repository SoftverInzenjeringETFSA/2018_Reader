import React, { Component } from 'react';

import '../css/Login.css';
const axios = require('axios');


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'email' : '',
            'lozinka' : '',
            'poruka' : null
        }

        this.login = this.login.bind(this);
    }

    updateMail(event) {
        this.setState({'email' : event.target.value});
    }

    updateLozinka(event) {
        this.setState({'lozinka' : event.target.value});
    }

    login() {
        this.props.login(this.state);
    }

    render() {
        return(
            <div id="content"> {this.props.poruka != null ? <div className="div_greska"><p className="greska">{this.props.poruka}</p></div> : null }
               <div className="login">
                <h2> User Login </h2> 
               
                <input type="text" placeholder="Email" onChange={this.updateMail.bind(this)} />
                <input type="text" placeholder="Password" onChange={this.updateLozinka.bind(this)} />
                <p> Forgot password ? </p>
                <button id = "login" onClick={this.login}>Login</button>
                <p> Not a member yet ? <u> Join us ! </u> </p>
                </div>
            </div>
        )
    }
 }

 export default Login;