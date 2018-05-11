import React from 'react';
import ReactDOM from 'react-dom';
import './include/bootstrap'
import './index.css';
import App from './App';
import HelpPage from './components/HelpPage';
//import PdfViewer1 from './components/PdfViewer1';
import registerServiceWorker from './registerServiceWorker';
import HomePage from './components/Home/HomePage';


ReactDOM.render(<HomePage />, document.getElementById('root'));
registerServiceWorker();
