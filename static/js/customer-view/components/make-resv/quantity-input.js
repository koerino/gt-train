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
        if (this.state.quantity < 4) {
            this.setState({quantity: this.state.quantity + 1});
        }
    }
    decrement() {
        if (this.state.quantity > 0) {
            this.setState({quantity: this.state.quantity - 1});
        }
    }
    render() {
        return (
            <div>
                <span>
                    {this.props.label}                     
                    <i className="fa fa-minus-square-o" onClick={this.decrement}></i>
                    {this.state.quantity}
                    <i className="fa fa-plus-square-o" onClick={this.increment}></i>     
                </span>
            </div>
        );
    }
}

export default QuantityInput;