import React, { Component } from 'react';
import logo from '../../images/doc.png';

import { 
    BrowserRouter as Router, 
    Route, 
    Redirect,
    Link
} from 'react-router-dom';

import PdfViewer from './PdfViewer.js';

const axios = require('axios');


class PregledDokumenata extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dokumenti : [],
            error : null,
            pdfFile : null,
            id : this.props.id,
            sesija : this.props.sesija
        }
        this.bar = React.createRef();
        this.loadDocuments = this.loadDocuments.bind(this);
    }
    scrollNumber = 0;
    
    scrollChanged(event){  
        this.scrollNumber = (event.target.scrollTop / (event.target.scrollHeight -  event.target.clientHeight) )*100;
        this.bar.current.setAttribute("aria-valuenow", Math.ceil(this.scrollNumber));
        this.bar.current.style.width= Math.ceil(this.scrollNumber)+'%';
     }
    componentWillMount() {
        this.loadDocuments();
    }

    loadDocuments() {
        axios.get('/documents', {
            params : {
                'id' : this.state.id, // id korisnika 
                'sesija' : this.state.sesija
            }
        })
        .then(response => {
            if (response.data.success) {
                this.setState({dokumenti : response.data.data});
            }
            else 
                this.setState({error : response.data.data});
        })
        .catch(error => {
            this.setState({error : error.toString()});
        })
    }

    prikaziPdf(dir) {
        axios.get('/pdfToClient', {
            responseType: 'blob',
            params : {
                'dir' : dir
            }
        })
        .then(response => {
            const file = new Blob(
            [response.data], 
            {type: 'application/pdf'});
        const fileUrl = URL.createObjectURL(file);
        this.setState({pdfFile : fileUrl});
        })
        .catch(error => {
            this.setState({error : error.toString()});
        });
    }

    render() {
        return(
            <Router>
                <div>
                    {this.state.error != null ? 
                    <div>
                        <p className="greska">{this.state.error}</p>
                    </div> : 
                    <div>
                        {this.state.dokumenti.length > 0 ? 
                        <div>
                            <table><tbody><tr>
                                {this.state.dokumenti.map((item,i) => 
                                    <td >
                                        <figure>
                                            <img src={logo} alt="No file" onClick={() => this.prikaziPdf(item.direktorij)}></img>
                                            <figcaption>{item.ime}</figcaption>
                                        </figure>
                                    </td>
                                    
                                )}
                            </tr></tbody></table>
                            <button className="btn btn-primary">Spasi progres čitanja</button>
                            <div className="progress" style={{height: '20px'}}>
                                <div ref={this.bar} className="progress-bar" role="progressbar" style={{width: '0%'}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <div style={{height: '100vh', overflowY: 'scroll', marginTop : '10px'}} onScroll={this.scrollChanged.bind(this)}>
                                <PdfViewer pdfFile={this.state.pdfFile}/>
                            </div>
                        </div>
                        : 
                    <div>
                        <div>
                            <p className="obavjestenje">No files.</p>
                        </div>
                    </div>}
                    </div>
                    }
                </div>
            </Router>
        )
    }
}

export default PregledDokumenata;