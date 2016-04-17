import React, { Component } from 'react';
import { Link } from 'react-router';
import ButtonLink from '../shared/button-link';
import InputBox from '../shared/input-box';
import 'whatwg-fetch';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            pwd: "",
            msg: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendLoginReq = this.sendLoginReq.bind(this);
    }
    handleChange(field, value) {
        this.setState({[field]: value});
    }
    sendLoginReq() {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                pwd: this.state.pwd
            })
        }).then(res => res.json())
            .then(data => {
                if (data.msg) this.setState({msg: data.msg});
                else this.context.router.push('menu');  
            })
            .catch(err => console.log(err));
    }
    render() {
        return (
        <div className='page-container' id='login'>
            <h1>Login</h1>
            <div className='content'>
                <InputBox label='Username' field='username' funct={this.handleChange} />
                <InputBox label='Password' field='pwd' type='password' funct={this.handleChange} />
                <span>{this.state.msg}</span>
                <div className='buttons'>
                    <ButtonLink label='Login' colour='gold' funct={this.sendLoginReq} />
                    <Link to='registration'><ButtonLink label='Register' colour='blue' /></Link>
                </div>
            </div>
        </div>
        );
    }
}

Login.contextTypes = {
    router() {
        router: React.PropTypes.func.isRequired
    }
};

export default Login;