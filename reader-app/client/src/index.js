import React from 'react';
import ReactDOM from 'react-dom';
import './include/bootstrap'
import './index.css';
import App from './App';
//import PdfViewer1 from './components/PdfViewer1';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
