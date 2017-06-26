import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MoneyTransactionList from './Money/MoneyTransactionList'
import Login from './Auth/Login'

class App extends Component {
  /* global firebase */
  state = {
    loggedIn: false
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      console.log(firebaseUser)
      if(firebaseUser) {
        this.setState({loggedIn : true})
      }
      else {
        this.setState({loggedIn : false})
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Login auth={firebase.auth} loggedIn={this.state.loggedIn}/>
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
