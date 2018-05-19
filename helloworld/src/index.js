import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Pet from './Pet';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Pet />, document.getElementById('root'));
registerServiceWorker();
