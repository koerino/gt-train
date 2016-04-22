import React, { Component } from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import InputBox from '../../../shared/input-box';
import 'whatwg-fetch';

class SearchResv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resvID: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendUpdateReq = this.sendUpdateReq.bind(this);
    }
    handleChange(field, value) {
        this.setState({[field]: value});
    }
    sendUpdateReq() {
        if (!this.state.resvID) this.setState({msg: "Please enter a reservation ID."});
        else {
            fetch('/api/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    resvID: this.state.resvID
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.msg) this.setState({msg: data.msg})
                    else {
                        this.context.router.push('update-select')
                    }     
                })
                .catch(err => console.log(err));
        }
    }
    render() {
        return (
            <div className='page-container' id='search-resv-b'>
                <h1>Update Reservation</h1>
                <div className='content'>
                    <InputBox label='Reservation ID' short='true' field='resvID' funct={this.handleChange} />
                    <span className='msg'>{this.state.msg}</span>
                     <div className='buttons'>
                         <Link to='menu'><ButtonLink label='Back'  colour='gold' /></Link>
                         <ButtonLink label='Search'  colour='blue'  funct={this.sendUpdateReq} />
                    </div>
                </div>
            </div>
        );
    }
}
  
SearchResv.contextTypes = {
    router() {
        router: React.PropTypes.func.isRequired
    }
};

export default SearchResv;