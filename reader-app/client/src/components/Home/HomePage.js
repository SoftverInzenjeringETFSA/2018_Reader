import React, { Component } from 'react';
import { 
    BrowserRouter as Router, 
    Route, 
    Redirect,
    Link
} from 'react-router-dom';

import '../../css/Home.css';
import UploadOnline from './UploadOnline.js';
import HelpPage from '../HelpPage.js';
import PregledDokumenata from './PregledDokumenata.js';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dokumenti : [],
            error : null
        }
    }

    render() {
        const uploadOnline = () => <UploadOnline />;
        const helpPage = () => <HelpPage />;
        const pregledDokumenata = () => <PregledDokumenata />;
        

        return (
        <Router>
            {this.state.error != null ? 
            <div>
                <p className="greska">{this.state.error}</p>
            </div> :
            <div>
            <div className="content">
                <div className="meni">
                    <i className="fa fa-user" style={{fontSize : '40px'}}> <span style={{fontSize : '20px', fontVariant : 'small-caps'}}> Account settings </span> </i>
                    <input type="text" placeholder="Search"/>
                    <i className="fa fa-search" style={{fontSize : '30px', margin : 'auto 10px'}}></i>
                </div>
                <div className="navigation">
                        <div>
                        <Link to='/pregledDokumenata'> 
                                <i className="fas fa-file" style={{marginBottom: '15%'}}> <span style={{fontSize: '20px'}}> Your files </span></i>
                            </Link>
                            <Link to='/uploadOnline'> 
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
                            <i className="fas fa-sign-out-alt" style={{marginBottom: '10%'}}> <span style={{fontSize: '20px'}}> Log out </span></i>
                        </div>
                </div>
                <div className="mainContent">
                    <Redirect from='/' to='/pregledDokumenata' />
                    <Route exact path="/pregledDokumenata" component={pregledDokumenata}/>
                    <Route exact path='/uploadOnline' component={uploadOnline}></Route>
                    <Route exact path='/helpPage' component={helpPage}></Route>
                </div>
            </div>
            </div> }
         </Router>
        )
    }
}

export default HomePage;