import React, { Component } from 'react';
import logo from '../../images/doc.png';
const axios = require('axios');


class PregledDokumenata extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dokumenti : [],
            error : null
        }

        this.loadDocuments = this.loadDocuments.bind(this);
    }

    componentWillMount() {
        this.loadDocuments();
    }

    loadDocuments() {
        axios.get('/documents', {
            params : {
                'id' : '5af85cc6bdb9e2014833b1fa' // id korisnika 
            }
        })
        .then(response => {
            if (response.data.success) {
                this.setState({dokumenti : response.data.data});
            }
            else 
                this.setState({error : response.data.dara});
        })
        .catch(error => {
            this.setState({error : error.toString()});
        })
    }

    render() {
        return(
            <div>
                {this.state.error != null ? 
                <div>
                    <p className="greska">{this.state.error}</p>
                </div> : 
                <div>
                    {this.state.dokumenti.length > 0 ? 
                    <div id="accordion">
                        {this.state.dokumenti.map((item,i) => 
                            <div style={{width : '5%'}}>
                                <figure>
                                    <img src={logo} alt="No file"></img>
                                    <figcaption>{item.ime}</figcaption>
                                </figure>
                            </div>
                            
                        )}
                    </div> : 
                <div>
                    <div>
                        <p className="obavjestenje">No files.</p>
                    </div>
                </div>}
                </div>
                }
            </div>
        )
    }
}

export default PregledDokumenata;