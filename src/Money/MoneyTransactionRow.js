import React, { Component } from 'react'
import {Button, Table} from 'semantic-ui-react'
import firebase from 'firebase'

export default class MoneyTransactionRow extends Component {
    render() {
        const isPositive = this.props.transaction.type === '+'
        const amountType = this.props.transaction.type === '+' ? "Income" : "Outcome"
        return (
            <Table.Row negative={!isPositive} positive={isPositive}>
                <Table.Cell>{this.props.transaction.date.toString()}</Table.Cell>
                <Table.Cell>{this.props.transaction.info}</Table.Cell>
                <Table.Cell>{amountType}</Table.Cell>
                <Table.Cell textAlign="right"><b>$ {this.formatNumber(this.props.transaction.money)}</b></Table.Cell>
                <Table.Cell><Button negative size="mini" onClick={this.handleRemove}>Remove</Button></Table.Cell>
            </Table.Row>
        )
    }

    formatNumber(number) {
        return number.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    }
    handleRemove = (event) => {
        const key = this.props.transaction.key
        firebase.database().ref('users/' + this.props.uid).child(this.props.transaction.key).remove()
        console.log(`transaction ${key} removed`)
    }
}