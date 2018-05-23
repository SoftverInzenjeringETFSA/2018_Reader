import React, { Component } from 'react';
import logo from '../../images/doc.png';

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Link
} from 'react-router-dom';


const axios = require('axios');


class PregledDokumenata extends Component {
    constructor(props) {
        super(props);

        this.state = {
            citati : [],
            id : this.props.id,
            sesija : this.props.sesija
        }
        this.loadDocuments = this.loadDocuments.bind(this);
    }

    componentWillMount() {
        this.loadDocuments();
    }

    loadDocuments() {
        axios.get('/archiveQuotes', {
            params : {
                'id' : this.state.id, // id korisnika
                'sesija' : this.state.sesija
            }
        })
        .then(response => {
            if (response.data.success) {
                this.setState({citati : response.data.data});
            }
            else
                this.setState({error : response.data.data});
        })
        .catch(error => {
            this.setState({error : error.toString()});
        })
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
                        {this.state.citati.length > 0 ?
                        <div>
                            <table><tbody>
                                {this.state.citati.map((item,i) =>
                                <tr>
                                    <td >
                                        <p style={{color : 'white'}}>{item}</p>
                                    </td>
                                </tr>
                                )}
                            </tbody></table>
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
