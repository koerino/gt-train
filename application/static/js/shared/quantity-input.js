import React, { Component } from 'react';

class QuantityInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0
        };
         this.increment = this.increment.bind(this);
         this.decrement = this.decrement.bind(this);
    }
    increment() {
        this.setState({quantity: this.state.quantity + 1});
    }
    decrement() {
        if (this.state.quantity > 0) {
            this.setState({quantity: this.state.quantity - 1});
        }
    }
    render() {
        return (
            <div>
                <span>{this.props.label}</span>
                <span>{this.state.quantity}</span>
                <div>
                    <i className="fa fa-plus-square-o" onClick={this.increment}></i>
                    <i className="fa fa-minus-square-o" onClick={this.decrement}></i>
                </div>
            </div>
        );
    }
}

export default QuantityInput;