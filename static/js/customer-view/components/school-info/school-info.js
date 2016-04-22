import React, { Component } from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import InputBox from '../../../shared/input-box';
import 'whatwg-fetch';

class SchoolInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sEmail: "",
            msg: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendUpdateReq = this.sendUpdateReq.bind(this);
    }
    handleChange(field, value) {
        this.setState({[field]: value});
    }
    sendUpdateReq() {
        fetch('/api/add-school', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sEmail: this.state.sEmail
            })
        }).then(res => res.json())
            .then(data => this.setState({msg: data.msg}))
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div className='page-container' id='school-info'>
                <h1>Add School Info</h1>
                <div className='content'>
                    <InputBox label='School Email Address' field="sEmail" funct={this.handleChange} />
                    <span>Your School Email Address Ends With .edu</span>
                    <span className='msg'>{this.state.msg}</span>
                    <div>
                        <Link to='menu'><ButtonLink label='Back' colour='gold' /></Link>
                        <ButtonLink label='Submit' colour='blue' funct={this.sendUpdateReq} />
                    </div>
                </div>
            </div>
        );    
    }
}

export default SchoolInfo;