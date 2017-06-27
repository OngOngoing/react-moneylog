import React, { Component } from 'react'
import firebase from 'firebase'

export default class NewMoneyTransaction extends Component {
    state = {
        money: 0,
        type: '+',
        date: new Date(),
        info: '',
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input pattern="^[+-]?" value={this.state.type} onChange={this.handleChange('type')}/>
                    <input type="number" value={this.state.money} onChange={this.handleMoneyChange} min="0.00" step="0.01"/>
                    <input type="date" value={this.state.date} onChange={this.handleChange('date')}/>
                    <input type="text" value={this.state.info} onChange={this.handleChange('info')}/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }

    writeDataToFirebase(money, type, date, info) {
        let transactionData = {
            'money': money,
            'type': type,
            'date' : date,
            'info': info
        }
        firebase.database().ref('users/' + this.props.uid).push(transactionData)
    }

    handleMoneyChange = (event) => {
        this.setState({money : parseFloat(event.target.value)})
    }
    handleChange = (key) => (event) => {
        this.setState({[key] : (event.target.value)})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        //this.props.addEvent(transaction)
        this.writeDataToFirebase(this.state.money, this.state.type, this.state.date.toJSON(), this.state.info)
        this.setState({money: 0, date: new Date(), info:'' })
    }
}