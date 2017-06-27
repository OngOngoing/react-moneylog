import React, { Component } from 'react'
import MoneyTransactionRow from './MoneyTransactionRow'
import NewMoneyTransaction from './NewMoneyTransaction'
import firebase from 'firebase'
import {Divider} from 'semantic-ui-react'

export default class MoneyTransactionList extends Component {
    state = {
        user: null,
        transactions: {},
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser) {
                this.setState({user: firebaseUser})
                firebase.database().ref('users/'+ this.state.user.uid).on('value', snapshot => {
                    if(snapshot.val()) {
                        this.setState({transactions: snapshot.val()})
                    }
                    else {
                        this.setState({transactions: {}})
                    }
                })
            }
            else {
                this.setState({user: null, transactions: {}})
            }
        })
    }


    render() {
        if(!this.state.user || !Object.keys(this.state.transactions)) {
            return false
        }
        const rows = Object.keys(this.state.transactions).map(key => {
            const transaction = this.state.transactions[key]
            transaction.key = key
            return (
                <MoneyTransactionRow key={key} transaction={transaction} uid={this.state.user.uid}/>
            )
            
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
                <div>{this.state.user && <NewMoneyTransaction addEvent={this.addEvent} uid={this.state.user.uid}/>}</div>
            </div>
        )
    }

}