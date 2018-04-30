import React, {Component } from 'react';
import ReactDOM from 'react-dom';

class HelpItem extends Component {
    cardBodyId="";
    cardBody="";
    buttonStyle = {
        width: '100%', 
        textAlign: 'left'
    }
    constructor(props) {
        super(props);
        this.cardBodyId="#this" + this.props.id;
        this.cardBody="this"  + this.props.id;
        if(this.props.item.IsComponent){
            this.buttonStyle["backgroundColor"] = "#136d7a";
            this.buttonStyle["border"] = "#136d7a";
        }
    };
    

    render() {
        return (
            <div className="card" style={{ backgroundColor: 'transparent', border: '0em'}}>
                <div className="card-header" style={{ backgroundColor: 'transparent', border: '0em'}}>
                <h5 className="mb-0">
                    <button className="btn btn-info"  style={this.buttonStyle} data-toggle="collapse" data-target={this.cardBodyId} aria-expanded="true" aria-controls={this.cardBody}>
                    {this.props.item.Question}
                    </button>
                </h5>
                </div>

                <div id={this.cardBody} className="collapse" data-parent="#accordion">
                <div className="card-body" style={{ backgroundColor: 'transparent', color: 'white', whiteSpace:' pre-line'}}>
                    {this.props.item.Answer}   
                </div>
                </div>
            </div>
        );
    }
}

export default HelpItem;