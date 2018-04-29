import React, {Component } from 'react';
import ReactDOM from 'react-dom';

import '../css/Home.css';


class HelpPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="HelpPage">
                <div className="content">
                    <div className="meni">
                    <i className="fa fa-user"> <span > Account settings </span> </i> 
                    <h4>HELP</h4>
                    <input type="text" placeholder="Search"/>
                    <i className="fa fa-search"></i>
                   
                </div>
                <div className="navigation">
                
                </div>
                <div className="files">
            
                </div>
                </div>
            </div>
        );
    }
}

export default HelpPage;