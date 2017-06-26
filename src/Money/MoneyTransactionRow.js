import React, { Component } from 'react'

export default class MoneyTransactionRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.transaction.type}</td>
                <td>{this.props.transaction.money}</td>
                <td>{this.props.transaction.date.toString()}</td>
                <td>{this.props.transaction.info}</td>
            </tr>
        )
    }
}