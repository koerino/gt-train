import React, { Component } from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import InputBox from '../../../shared/input-box';
import QuantityInput from './quantity-input';
import 'whatwg-fetch';

class TravelExtras extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baggage: 0,
            passenger: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendSubmitReq = this.sendSubmitReq.bind(this);
    }
    handleChange(field, value) {
        this.setState({[field]: value});
    }
    sendSubmitReq() {
        if (!this.state.passenger) this.setState({msg: "Please enter the name of the passenger."});
        else {
            fetch('/api/reserve/extras', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    baggage: this.state.baggage,
                    passenger: this.state.passenger
                })
            }).then(res => this.context.router.push('reserve'))
                .catch(err => console.log(err));
        }
    }
    render() {
        return (
            <div className='page-container' id='travel-extras'>
                <h1>Travel Extras & Passenger Info</h1>
                <div className='content'>
                    <QuantityInput label='Number of Baggage' field='baggage' funct={this.handleChange} />
                    <span>Every passenger can bring up to 4 baggage. <br /><br />2 free of charge, 2 for $30 per bag.</span> 
                    <InputBox label='Passenger Name' field='passenger' funct={this.handleChange} />
                    <span>{this.state.msg}</span>
                    <div className='buttons'>
                        <Link to='reserve-select'><ButtonLink label='Back' colour='gold' /></Link>
                        <Link to='menu'><ButtonLink label='Main Menu' colour='cyan' /></Link>
                        <ButtonLink label='Next' colour='blue' funct={this.sendSubmitReq} />
                    </div>
                </div>
            </div>
        );
    }
}

TravelExtras.contextTypes = {
    router() {
        router: React.PropTypes.func.isRequired
    }
};

export default TravelExtras;