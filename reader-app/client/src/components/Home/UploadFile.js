import React, { Component } from 'react';

import PdfViewer from './PdfViewer.js';

const axios = require('axios');

class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pdfFile : null,
            url : null, 
            ime : '',
            opis : '',
            folder: '',
            error : null,
            id : this.props.id, // kor
            sesija : this.props.sesija, //kor

            online : false,
            local : false,

            files : []
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
    updateFolder(event) {
        this.setState({
            folder : event.target.value
        });
    }
    
    uLocal() {
        this.setState({
            local : true,
            online : false,
            pdfFile : null
        });
    }
    uOnline() {
        this.setState({
            local : false,
            online : true,
            pdfFile : null
        });
    }

    updateFile(event) {
        var fajl = [];
        fajl.push(event.target.files[0]);
        this.setState({
            files : fajl
        });
    }
    
    uploadOnline() {
        axios.post('/downloadOnline', {
            'url' : this.state.url,
            'ime' : this.state.ime,
            'opis' : this.state.opis,
            'korisnikId' : this.state.id,
            'sesija' : this.state.sesija
        })
        .then(response => {
            if (response.data.success) {
                axios.get('/pdfToClient', {
                    responseType: 'blob',
                    params : {
                        'dir' : response.data.dir
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
            else 
                this.setState({error : response.data.data});
        })
        .catch(error => {
            this.setState({error : error.toString()});
        })
    }
    
    uploadLocal() {
        var formData = new FormData();
        formData.append('file', this.state.files[0]);
        formData.append('ime', this.state.ime);
        formData.append('opis', this.state.opis);
        formData.append('korisnikId', this.state.id);
        formData.append('sesija', this.state.sesija);

        axios.post('/uploadLocal', formData)
        .then(response => {
            if (response.data.success) {
                axios.get('/pdfToClient', {
                    responseType: 'blob',
                    params : {
                        'dir' : response.data.dir
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
            else 
                this.setState({error : response.data.data});
        })
        .catch(error => {
            this.setState({ error : error.toString() });
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
                    <div>
                        <label><input className="radio-inline" type="radio" name="optradio" onClick={this.uOnline.bind(this)}/><span style={{color : 'white', margin: '3%'}}>Upload online</span></label>
                        <label><input className="radio-inline" type="radio" name="optradio" onClick={this.uLocal.bind(this)}/><span style={{color : 'white', margin: '3%'}}>Upload from computer</span></label>
                    </div>
                    {this.state.online ? 
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
                                <tr>
                                            <td><span style={{color : 'white', marginRight : '10px'}}>Folder Name:</span></td>
                                            <td> <input type="text" style={{width : '90%'}} onChange={this.updateFolder.bind(this)}/><br/></td>
                                </tr>
                            </tbody>
                        </table>
                       
                        
                       
                        <div style={{textAlign : 'center'}}>
                            <div className="file btn btn-lg btn-primary" style={{marginTop : '15px'}} onClick={this.uploadOnline.bind(this)}>
                                Upload
                            </div>
                        </div>
                    </div> : 
                    <div>
                        {this.state.local ? 
                        <div>
                            <form>
                                <input type="file" onChange={this.updateFile.bind(this)}/>
                                <table style={{width : '90%'}}> 
                                    <tbody>
                                        <tr>
                                            <td><span style={{color : 'white', marginRight : '10px'}}>Name:</span></td>
                                            <td> <input type="text" style={{width : '90%'}} onChange={this.updateIme.bind(this)}/><br/></td>
                                        </tr>
                                        <tr>
                                            <td><span style={{color : 'white', marginRight : '10px'}}>Description:</span></td>
                                            <td> <input type="text" style={{width : '90%'}} onChange={this.updateOpis.bind(this)}/><br/></td>
                                        </tr>
                                        <tr>
                                            <td><span style={{color : 'white', marginRight : '10px'}}>Folder Name:</span></td>
                                            <td> <input type="text" style={{width : '90%'}} onChange={this.updateFolder.bind(this)} /><br/></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div style={{textAlign : 'center'}}>
                                    <div className="file btn btn-lg btn-primary" style={{marginTop : '15px'}} onClick={this.uploadLocal.bind(this)}>
                                        Upload
                                    </div>
                                </div>
                            </form>
                        </div> : 
                        null}
                    </div>}
                    <div style={{height: '100vh', overflowY: 'scroll', marginTop : '10px'}}>
                        <PdfViewer pdfFile={this.state.pdfFile}/>
                    </div>
                </div> }
            </div>
        )
    }
}

export default UploadFile;