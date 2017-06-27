import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
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
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <MuiThemeProvider>
          <MoneyTransactionList/>
        </MuiThemeProvider>
      </div>
    );
  }

}



export default App;
