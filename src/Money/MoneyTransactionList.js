import React, { Component } from 'react'
import MoneyTransaction from './MoneyTransaction'
import NewMoneyTransaction from './NewMoneyTransaction'

export default class MoneyTransactionList extends Component {
    state = {
        transactions: [],
    }
    
    render() {
        let transactions = this.state.transactions.map( (transaction, index) => {
            return <li key={index}><MoneyTransaction transaction={transaction}/></li>
        })
        return (
            <div>
                <ul>{transactions}</ul>
                <div><NewMoneyTransaction addEvent={this.addEvent} /></div>
            </div>
        )
    }

    addEvent = (moneyTransaction) => {
        this.setState({ transactions: [...this.state.transactions, moneyTransaction] });
    }
}