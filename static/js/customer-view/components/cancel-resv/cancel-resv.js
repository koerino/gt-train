import React, { Component } from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link'; 
import Reservations from '../../../shared/reservations';
import 'whatwg-fetch';

class CancelResv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            resvs: []
        };
        this.sendGetInfoReq = this.sendGetInfoReq.bind(this);
        this.sendGetResvReq = this.sendGetResvReq.bind(this);
        this.sendCancelReq = this.sendCancelReq.bind(this);
    }
    sendGetInfoReq() {
        fetch('/api/cancel/info', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                this.setState({data: data[0]});
                this.sendGetResvReq();
            })
            .catch(err => console.log(err));
    }
    sendGetResvReq() {
        var url = `/api/resvs/${this.state.data.resvID}`;
        fetch(url, {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.setState({resvs: data}))
            .catch(err => console.log(err));
    }
    sendCancelReq() {
        fetch('/api/cancel/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                resvID: this.state.data.resvID
            })
        }).then(res => res.json())
            .then(data => this.setState({msg: data.msg}))
            .catch(err => console.log(err));
    }
    componentDidMount() {
         this.sendGetInfoReq();
    }
    render() {
        return (
            <div className='page-container' id='cancel-resv'>
                <h1>Cancel Reservation</h1>
                <div className='content'>
                    <Reservations data={this.state.resvs} hideSelect='true' hideRemove='true' />
                    <div className='cancel-info'>
                        <span>Total Cost of Reservation &nbsp; {Number(this.state.data.cost).toFixed(2)}</span>
                        <span>Date of Cancellation &nbsp; {this.state.data.date}</span>
                        <span>Amount to be Refunded &nbsp; {Number(this.state.data.refund).toFixed(2)}</span> 
                    </div>
                    <span className='msg'>{this.state.msg}</span>
                    <div className='buttons'>
                        <Link to='menu'><ButtonLink label='Back' colour='gold' /></Link>
                        <ButtonLink label='Submit' colour='blue' funct={this.sendCancelReq} />
                    </div>
                </div>
            </div>
        );  
    }
}

export default CancelResv;