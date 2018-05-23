import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Link
} from 'react-router-dom';

import '../../css/Home.css';
import UploadFile from './UploadFile.js';
import HelpPage from '../HelpPage.js';
import PregledDokumenata from './PregledDokumenata.js';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {

            sesija : this.props.sesija,
            id : this.props.id,
            poruka : this.props.poruka
        }

        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.logout(this.state.sesija);
    }

    render() {
        const uploadFile = () => <UploadFile id={this.state.id} sesija={this.state.sesija}/>;
        const helpPage = () => <HelpPage />;
        const pregledDokumenata = () => <PregledDokumenata id={this.state.id} sesija={this.state.sesija}/>;


        return (
        <Router>
            {this.state.poruka != null ?
            <div>
                <p className="greska">{this.state.poruka}</p>
            </div> :
            <div>
            <div className="content">
                <div className="meni">
                    <i className="fa fa-user" style={{fontSize : '40px'}}> <span style={{fontSize : '20px', fontVariant : 'small-caps'}}> Account settings </span> </i>
                </div>
                <div className="navigation">
                        <div>
                        <Link to='/pregledDokumenata'>
                                <i className="fas fa-file" style={{marginBottom: '15%'}}> <span style={{fontSize: '20px'}}> Your files </span></i>
                            </Link>
                            <Link to='/uploadFile'>
                                <i className="fas fa-upload" style={{marginBottom: '15%'}}> <span style={{fontSize: '20px'}}> Upload file </span></i>
                            </Link>


                            <i className="fas fa-archive" style={{marginBottom: '15%'}}> <span style={{fontSize: '20px'}}> Archive text </span> </i>
                            <i className="fas fa-quote-right" style={{marginBottom: '15%'}}><span style={{fontSize: '20px', marginLeft : '5px'}}> Favourite quote </span></i>
                            <i className="fas fa-comment" style={{marginBottom: '15%'}}> <span style={{fontSize: '20px'}}> Comment </span> </i>
                            <i className="fas fa-pencil-alt" style={{marginBottom: '15%'}}> <span style={{fontSize: '20px'}}> Highlight text </span></i>
                            <i className="fas fa-mobile-alt" style={{marginBottom: '15%'}}><span style={{fontSize: '20px', marginLeft : '20px'}}> Redirect </span></i>
                            <Link to='/helpPage' >
                                <i className="fas fa-hire-a-helper" style={{marginBottom: '90%'}} > <span style={{fontSize: '20px'}}> HelpPage </span></i>
                            </Link>
                            <i className="fas fa-sign-out-alt" style={{marginBottom: '10%'}} onClick={this.logout}> <span style={{fontSize: '20px'}}> Log out </span></i>
                        </div>
                </div>
                <div className="mainContent">
                    <Redirect from='/' to='/pregledDokumenata' />
                    <Route exact path="/pregledDokumenata" component={pregledDokumenata}/>
                    <Route exact path='/uploadFile' component={uploadFile}></Route>
                    <Route exact path='/helpPage' component={helpPage}></Route>
                </div>
            </div>
            </div> }
         </Router>
        )
    }
}

export default HomePage;
