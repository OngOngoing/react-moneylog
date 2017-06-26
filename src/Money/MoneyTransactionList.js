import React, { Component } from 'react'
import MoneyTransactionRow from './MoneyTransactionRow'
import NewMoneyTransaction from './NewMoneyTransaction'
import firebase from 'firebase'

export default class MoneyTransactionList extends Component {
    state = {
        transactions: [],
    }

    componentDidMount() {
        firebase.database().ref('user/db').on('value', snapshot => {
            this.setState({transactions: snapshot.val()})
        })
    }
    
    render() {
        let rows = []
        Object.keys(this.state.transactions).map(key => {
            const transaction = this.state.transactions[key];
            rows.push(<MoneyTransactionRow key={key} transaction={transaction}/>)
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
        this.setState({ transactions: [...this.state.transactions, moneyTransaction] });
    }
}