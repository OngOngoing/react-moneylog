import React, { Component } from 'react'
import MoneyTransactionRow from './MoneyTransactionRow'
import NewMoneyTransaction from './NewMoneyTransaction'
import firebase from 'firebase'
import {Table, Segment, Statistic, Container, Header} from 'semantic-ui-react'

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

    calculateTotalMoney() {
        return this.formatNumber(Object.keys(this.state.transactions).map(key => {
            const value = this.state.transactions[key].money
            const sign = this.state.transactions[key].type
            return parseFloat(sign+value)
        }).reduce((acc, cur)=> {
            return acc+cur
        }, 0))
    }

    formatNumber(number) {
        return number.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    }


    render() {
        if(!this.state.user || !Object.keys(this.state.transactions)) {
            return false
        }
        const tableHeader = (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={2}>Date</Table.HeaderCell>
                    <Table.HeaderCell width={4}>Info</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Type</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Amount</Table.HeaderCell>
                    <Table.HeaderCell width={1}></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        )

        const rows = Object.keys(this.state.transactions).map(key => {
            const transaction = this.state.transactions[key]
            transaction.key = key
            return (
                <MoneyTransactionRow key={key} transaction={transaction} uid={this.state.user.uid}/>
            )
            
        })
        return (
            <Container>
                <div>{this.state.user && <NewMoneyTransaction addEvent={this.addEvent} uid={this.state.user.uid}/>}</div>
                <Segment raised>
                    <Header as='h2'>Transactions</Header>
                    <Table selectable fixed>
                        {tableHeader}
                        <Table.Body>{rows}</Table.Body>
                    </Table>
                    <Statistic label='Total' value={'$'+ this.calculateTotalMoney()} />
                </Segment>
            </Container>
        )
    }

}