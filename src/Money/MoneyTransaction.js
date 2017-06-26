import React, { Component } from 'react'

export default class MoneyTransaction extends Component {
    render() {
        return <div>{this.props.transaction}</div>
    }
}