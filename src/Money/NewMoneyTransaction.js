import React, { Component } from 'react'

export default class NewMoneyTransaction extends Component {
    state = {
        money: 0,
        type: '+',
        date: new Date(),
        info: '',
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="number" value={this.state.money} onChange={this.handleMoneyChange} min="0.00" step="0.01"/>
                <input type="date" value={this.state.date} onChange={this.handleChange('date')}/>
                <input type="submit" value="Submit" />
            </form>
        )
    }

    handleMoneyChange = (event) => {
        this.setState({money : parseFloat(event.target.value)})
    }
    handleChange = (key) => (event) => {
        this.setState({[key] : (event.target.value)})
        console.log(this.state);
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let transaction = {
            'money': this.state.money,
            'type': this.state.type,
            'date': this.state.date,
            'info': this.state.info,
        }
        this.props.addEvent(transaction)
        this.setState({money: 0, date: new Date(), info:'' })
    }
}