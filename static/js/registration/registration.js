import React, { Component } from 'react';
import { Link } from 'react-router';
import ButtonLink from '../shared/button-link';
import InputBox from '../shared/input-box';
import 'whatwg-fetch';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            pwd: "",
            cpwd: "",
            email: "",
            msg: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendRegReq = this.sendRegReq.bind(this);
    }
    handleChange(field, value) {
        this.setState({[field]: value});
    }
    sendRegReq() {
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                pwd: this.state.pwd,
                cpwd: this.state.cpwd,
                email: this.state.email
            })
        }).then(res => res.json())
            .then(data => this.setState({msg: data.msg}))
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div className='page-container' id='registration'>
                <h1>New User Registration</h1>
                <div className='content'>
                    <InputBox label='Username' field='username' funct={this.handleChange} />
                    <InputBox label='Email Address' field="email" funct={this.handleChange} />
                    <InputBox label='Password' field="pwd" type='password' funct={this.handleChange} />
                    <InputBox label='Confirm Password' field='cpwd' type='password' funct={this.handleChange} />
                    <span className='msg'>{this.state.msg}</span>
                    <div className='buttons'>
                        <Link to='/'><ButtonLink label='Back' colour='gold' /></Link>
                        <ButtonLink label='Create' colour='blue' funct={this.sendRegReq} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Registration;