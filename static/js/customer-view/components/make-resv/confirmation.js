import React, { Component } from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import 'whatwg-fetch';

class Confirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resvID: ""
        };
        this.getID = this.getID.bind(this);
    }
    getID() {
        fetch('/api/resvID', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.setState({resvID: data.resvID}))
            .catch(err => console.log(err));    
    }
    componentDidMount() {
        this.getID();
    }
    render() {
        return (
            <div className='page-container' id='confirmation'>
                <h1>Confirmation</h1>
                <div className='content'>
                    <div><span>Reservation ID</span><span>{this.state.resvID}</span></div>
                    <div>Thank you for your purchase! Please save reservation ID for your record.</div>
                    <Link to='menu'><ButtonLink label='Go Back to Main Menu' colour='blue' /></Link>
                </div>
            </div>
        );
    }
}

export default Confirmation; 