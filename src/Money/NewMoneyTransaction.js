import React, { Component } from 'react'
import {Button, Label, Select, Modal, Icon, Form, TextArea} from 'semantic-ui-react'
import firebase from 'firebase'
import moment from 'moment'
import Datetime from 'react-datetime'

export default class NewMoneyTransaction extends Component {
    state = {
        open: false,
        money: 0,
        type: '+',
        date: new Date(),
        info: '',
        moment: moment()
    }

    show = (dimmer) => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })

    render() {
        const { open, dimmer } = this.state
        const typeOptions = [
            { key: '+', text: 'Income', value: '+' },
            { key: '-', text: 'Outcome', value: '-' },
        ]
        return (
            <div>
                <Button onClick={this.show('blurring')}>Add New Transaction</Button>

                <Modal dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header>Add New Transaction</Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Input size="massive" labelPosition='right' type='number' value={this.state.money} onChange={this.handleMoneyChange} min="0.00" step="0.01" placeholder='Amount'>
                                    <Label basic>$</Label>
                                    <input />
                                    <Select value={this.state.type} onChange={this.handleChange('type')} compact options={typeOptions}/>
                                </Form.Input>
                                <Form.Input><Datetime value={this.state.date} onChange={this.handleDatetimeChange}/></Form.Input>
                                <Form.Field control={TextArea} label="About" placeholder="Buy Ben&Jerry Strawberry Cheesecake Flavor" value={this.state.info} onChange={this.handleChange('info')} />
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='green' onClick={this.handleSubmit}>
                                <Icon name='checkmark' /> Submit
                            </Button>
                        </Modal.Actions>
                </Modal>
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

    handleDatetimeChange = (moment) => {
        this.setState({date : moment})
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
        this.close()
    }
}