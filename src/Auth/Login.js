import React, { Component } from 'react'

export default class Login extends Component {
    
    render() {
        return (<div>
            {!this.props.loggedIn ? 
            <button onClick={this.onLogin}>Login</button> 
            :
            <button onClick={this.onLogout}>Logout</button>
            }</div>)
    }

    onLogin = (event) => {
        this.props.auth().signInAnonymously()
    }

    onLogout = (event) => {
        this.props.auth().signOut()
    }
}