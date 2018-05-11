import React, { Component } from 'react';

import PdfViewer from './PdfViewer.js';

const axios = require('axios');

class UploadOnline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pdfFile : null,
            url : null, 
            ime : '',
            opis : '',
            error : null
        }
    }

    updateUrl(event) {
        this.setState({
            url : event.target.value
        });
    }

    updateIme(event) {
        this.setState({
            ime : event.target.value
        });
    }

    updateOpis(event) {
        this.setState({
            opis : event.target.value
        });
    }
    
    
    uploadOnline() {
        axios.post('/downloadOnline', {
            'url' : this.state.url,
            'ime' : this.state.ime,
            'opis' : this.state.opis
        })
        .then(response => {
            if (response.data.success) {
                axios.get('/pdfToClient', {
                    responseType: 'blob',
                    params : {
                        'pdfName' : response.data.pdfName
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
        })
        .catch(error => {
            this.setState({error : error.toString()});
        })
    }
    
    render() {
        return (
            <div>
                {this.state.error != null ? 
                <div>
                    <p className="greska">{this.state.error}</p>
                </div> 
                : <div>
                    <span style={{color : 'white'}}>Odabrali ste tu i tu opciju...</span><br/>
                    <div style={{marginTop : '20px'}}>
                        <table style={{width : '90%'}}> 
                            <tbody>
                                <tr>
                                    <td><span style={{color : 'white', marginRight : '10px'}}>PDF URL:</span></td>
                                    <td><input type="text" style={{width : '90%'}} onChange={this.updateUrl.bind(this)}/><br/></td>
                                </tr>
                                <tr>
                                    <td><span style={{color : 'white', marginRight : '10px'}}>Name:</span></td>
                                    <td> <input type="text" style={{width : '90%'}} onChange={this.updateIme.bind(this)}/><br/></td>
                                </tr>
                                <tr>
                                    <td><span style={{color : 'white', marginRight : '10px'}}>Description:</span></td>
                                    <td> <input type="text" style={{width : '90%'}} onChange={this.updateOpis.bind(this)}/><br/></td>
                                </tr>
                            </tbody>
                        </table>
                       
                        
                       
                        <div style={{textAlign : 'center'}}>
                            <div className="file btn btn-lg btn-primary" style={{marginTop : '15px'}} onClick={this.uploadOnline.bind(this)}>
                                Upload
                            </div>
                        </div>
                    </div>
                    <div style={{height: '100vh', overflowY: 'scroll', marginTop : '10px'}}>
                        <PdfViewer pdfFile={this.state.pdfFile}/>
                    </div>
                </div> }
            </div>
        )
    }
}

export default UploadOnline;