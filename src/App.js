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
    transactions: []
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
        this.setState({loggedIn : true, user: firebaseUser})
        //this.setState({transactions: this.loadTransactionsFromDatabase()})
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
          <h2>Welcome to React</h2>
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

  loadTransactionsFromDatabase() {
    firebase.database().ref('users/'+ this.state.user.uid).on('value', snapshot => {
      console.log(snapshot.val())
      return snapshot.val()
    })
  }

}



export default App;
