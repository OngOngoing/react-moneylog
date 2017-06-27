import React, { Component } from 'react'
import {Button} from 'semantic-ui-react'

export default class Login extends Component {
    
    render() {
        return (<div>
            {!this.props.loggedIn ? 
            <Button primary onClick={this.onLogin}>Login</Button> 
            :
            <Button primary onClick={this.onLogout}>Logout</Button>
            }</div>)
    }

    onLogin = (event) => {
        this.props.auth().signInAnonymously()
    }

    onLogout = (event) => {
        this.props.auth().signOut()
    }
}