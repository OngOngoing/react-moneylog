import React, { Component } from 'react'
import './App.css'
import {Icon} from 'semantic-ui-react'
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
          <Icon color="teal" name='dollar' size='huge' className="App-logo" alt="logo" />
          <h2>Welcome to React-MoneyLog</h2>
          <Login loggedIn={this.state.loggedIn} auth={firebase.auth}/>
        </div>
        <div style={{padding:'20px'}}>
          <MoneyTransactionList/>
        </div>
      </div>
    );
  }

}



export default App;
