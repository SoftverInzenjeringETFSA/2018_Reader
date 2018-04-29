import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import HelpPage from './components/HelpPage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<HelpPage />, document.getElementById('root'));
registerServiceWorker();
