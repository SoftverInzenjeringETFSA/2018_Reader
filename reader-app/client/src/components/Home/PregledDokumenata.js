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
            svidokumenti : [],
            error : null,
            pdfFile : null,
            id : this.props.id,
            sesija : this.props.sesija
        }

        this.loadDocuments = this.loadDocuments.bind(this);
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
                this.setState({svidokumenti : response.data.data});
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

    pretrazi(e){
        this.setState({dokumenti :this.state.svidokumenti});
        var search = e.target.value;
        var rezultatiPretrage = [];
        if(search.length < 1){
          rezultatiPretrage = this.state.svidokumenti;
        }
        else {
          for(var i=0; i<this.state.dokumenti.length; i++){
            if(this.state.dokumenti[i].ime.includes(search)){
              rezultatiPretrage.push(this.state.dokumenti[i]);
            }
          }
        }
        this.setState({dokumenti :rezultatiPretrage});
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
                        <div>
                            <input type="text" placeholder="Search" onChange = {this.pretrazi.bind(this)}/>
                            <i className="fa fa-search" style={{fontSize : '30px', margin : 'auto 10px'}}></i>
                        </div>
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
                            <div style={{height: '100vh', overflowY: 'scroll', marginTop : '10px'}}>
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
