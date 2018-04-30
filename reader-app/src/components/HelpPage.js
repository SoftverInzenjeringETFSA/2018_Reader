import React, {Component } from 'react';
import ReactDOM from 'react-dom';

import '../css/Home.css';
import HelpItem from './HelpItem.js';


class HelpPage extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        HelpItems: [
            {Question: 'Kako pokrenuti aplikaciju?', 
             Answer: 'Potrebno je otvoriti konzolu u folderu /reader-app. Zatim je potrebno upisati komande: npm install i npm start.',
             IsComponent: false},
            {Question: 'Koje su tehnologije korištene?', 
             Answer: 'React, Node',
             IsComponent: false},
             {Question: 'Kakva je struktura react projekta?', 
             Answer: "U folderu /src se nalaze mnogi podfolderi koji olakšavaju organizaciju projekta. \r\n"+
             "Folder /src/components sadrži .js fajlove komponenti. \r\n"+
             "Folder /src/css sadrži prateće .css fajlove komponenti iz foldera /src/components. \r\n" +
             "Folder /src/images sadrži slike koje su korištene u projektu. \r\n"+
             "Folder /src/include sadrži fajlove 'bootstrap.js', 'jquery.js','popper.js' i 'tether.js' koji služe za podršku bootstrap verzije 4.",
             IsComponent: false},
            {Question: 'Komponenta HELP?', 
             Answer: 'Komponenta help je sastavljena od dvije komponente: HelpPage.js i HelpItem.js koje se nalaze u folderu /src/components \r\n'+
             'Komponenta HelpPage sadrži listu HelpItem-a kojima se proslijeđuju podaci za prikaz i određivanje izleda pojedinih HelpItem-a.\r\n'+
             'Komponenta HelpItem se nalazi unutar HelpPage komponente.',
             IsComponent: true},
             
             
        ]
    };

    render() {
        return (
            <div className="HelpPage">
                <div className="content">
                    <div className="meni">
                    <i className="fa fa-user"> <span > Account settings </span> </i> 
                    <a href="#" style={{ color: 'white', marginTop: '2em' }}>HELP</a>
                    <input type="text" placeholder="Search"/>
                    <i className="fa fa-search"></i>
                   
                </div>
                <div className="navigation">
                
                </div>
                <div className="mainContent" style={{ width: '100%'}}>
                <div id="accordion">

                {this.state.HelpItems.map((item,i) => 
                        <HelpItem key={i} id={i} item={item} />
                )}
                </div>
                </div>
                </div>
            </div>
        );
    }
}

export default HelpPage;