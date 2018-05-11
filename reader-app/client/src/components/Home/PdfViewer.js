import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';


class PdfViewer extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
    width: 1000 /// ????????
  }
 
  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }
 
  render() {
    const { pageNumber, numPages } = this.state;
    //alert(this.props.pdfFile);
    return (
      <div>
        {this.props.pdfFile != null ? <div>
        <Document
          file={this.props.pdfFile}
          onLoadSuccess={this.onDocumentLoad}
        >
        {
          Array.from(
            new Array(numPages),
              (el, index) => (
                <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={this.state.width}
                />  
              ),
              <p>Page {pageNumber} of {numPages}</p> 
          )
        }
        </Document> 
        </div> : null }
      </div>
    );
  }
}

export default PdfViewer;