import React, { Component } from 'react'

export default class NewMoneyTransaction extends Component {
    state = {
        money: 0,
        type: '+',
        date: new Date(),
        info: '...',
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="number" value={this.state.money} onChange={this.handleChange} min="0.00" step="0.01"/>
                <input type="submit" value="Submit" />
            </form>
        )
    }

    handleChange = (event) => {
        this.setState({money : parseFloat(event.target.value)})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.addEvent(this.state.money)
        this.setState({money: 0})
    }
}