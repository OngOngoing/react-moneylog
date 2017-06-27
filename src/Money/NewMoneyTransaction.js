import React, { Component } from 'react'
import {Button, Input, Label, Dropdown, Select} from 'semantic-ui-react'
import firebase from 'firebase'

export default class NewMoneyTransaction extends Component {
    state = {
        money: 0,
        type: '+',
        date: new Date(),
        info: '',
    }

    render() {
        const typeOptions = [
            { key: '+', text: 'Income', value: '+' },
            { key: '-', text: 'Outcome', value: '-' },
        ]
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Input labelPosition='right' type='number' value={this.state.money} onChange={this.handleMoneyChange} min="0.00" step="0.01" placeholder='Amount'>
                        <Label basic>$</Label>
                        <input />
                        <Select value={this.state.type} onChange={this.handleChange('type')} compact options={typeOptions}/>
                    </Input>
                    <input type="date" value={this.state.date} onChange={this.handleChange('date')}/>
                    <input type="text" value={this.state.info} onChange={this.handleChange('info')}/>
                    <Button primary>Submit</Button>
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

    handleChange = (key) => (event, data) => {
        if(event.target.value) {
            this.setState({[key] : (event.target.value)})
        }
        else if (data.value) {
            this.setState({[key] : (data.value)})
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        //this.props.addEvent(transaction)
        this.writeDataToFirebase(this.state.money, this.state.type, this.state.date.toJSON(), this.state.info)
        this.setState({money: 0, date: new Date(), info:'' })
    }
}