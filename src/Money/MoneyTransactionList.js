import React, { Component } from 'react'
import MoneyTransactionRow from './MoneyTransactionRow'
import NewMoneyTransaction from './NewMoneyTransaction'

export default class MoneyTransactionList extends Component {
    state = {
        transactions: [],
    }
    
    render() {
        let rows = []
        this.state.transactions.forEach((transaction, i) => {
            rows.push(<MoneyTransactionRow key={i} transaction={transaction}/>)
        })
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Money</th>
                            <th>Date</th>
                            <th>Info</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
                <div><NewMoneyTransaction addEvent={this.addEvent} /></div>
            </div>
        )
    }

    addEvent = (moneyTransaction) => {
        console.log(moneyTransaction)
        this.setState({ transactions: [...this.state.transactions, moneyTransaction] });
    }
}