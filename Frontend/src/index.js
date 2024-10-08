import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './App.css';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import { Mystore } from './DataStore/Store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Mystore}>
 <Router>
    <App />
  </Router>
  </Provider>
 
);


reportWebVitals();
