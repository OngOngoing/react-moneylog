import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyDxwm3gQ0XDazc21Tb_K11Ho2smSGiCA9k",
    authDomain: "react-moneylog.firebaseapp.com",
    databaseURL: "https://react-moneylog.firebaseio.com",
    projectId: "react-moneylog",
    storageBucket: "react-moneylog.appspot.com",
    messagingSenderId: "239861337687"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
