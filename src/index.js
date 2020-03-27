import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/App';
import * as serviceWorker from './components/serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() 
serviceWorker.unregister();