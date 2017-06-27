import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import MoneyTransactionList from './Money/MoneyTransactionList'
import Login from './Auth/Login'
import firebase from 'firebase'

class App extends Component {
  state = {
    loggedIn: false,
    user: {},
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
        this.setState({loggedIn : true, user: firebaseUser})
      }
      else {
        this.setState({loggedIn : false, user: firebaseUser})
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React-MoneyLog</h2>
        </div>
        <Login loggedIn={this.state.loggedIn} auth={firebase.auth}/>
        <MoneyTransactionList/>
      </div>
    );
  }

}



export default App;
