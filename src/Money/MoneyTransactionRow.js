import React, { Component } from 'react'
import {Button, Table} from 'semantic-ui-react'
import firebase from 'firebase'

export default class MoneyTransactionRow extends Component {
    render() {
        const isPositive = this.props.transaction.type == '+'
        const amountType = this.props.transaction.type == '+' ? "Income" : "Outcome"
        return (
            <Table.Row negative={!isPositive} positive={isPositive}>
                <Table.Cell>{this.props.transaction.date.toString()}</Table.Cell>
                <Table.Cell>{this.props.transaction.info}</Table.Cell>
                <Table.Cell>{amountType}</Table.Cell>
                <Table.Cell>{this.props.transaction.money}</Table.Cell>
                <Table.Cell><Button negative size="mini" onClick={this.handleRemove}>Remove</Button></Table.Cell>
            </Table.Row>
        )
    }

    handleRemove = (event) => {
        const key = this.props.transaction.key
        firebase.database().ref('users/' + this.props.uid).child(this.props.transaction.key).remove()
        console.log(`transaction ${key} removed`)
    }
}