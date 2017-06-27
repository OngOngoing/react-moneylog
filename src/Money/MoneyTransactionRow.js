import React, { Component } from 'react'
import {Button} from 'semantic-ui-react'
import firebase from 'firebase'

export default class MoneyTransactionRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.transaction.type}</td>
                <td>{this.props.transaction.money}</td>
                <td>{this.props.transaction.date.toString()}</td>
                <td>{this.props.transaction.info}</td>
                <td><Button negative size="mini" onClick={this.handleRemove}>Remove</Button></td>
            </tr>
        )
    }

    handleRemove = (event) => {
        const key = this.props.transaction.key
        firebase.database().ref('users/' + this.props.uid).child(this.props.transaction.key).remove()
        console.log(`transaction ${key} removed`)
    }
}