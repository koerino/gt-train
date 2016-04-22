import React, { Component } from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import InputBox from '../../../shared/input-box';
import 'whatwg-fetch';

class SearchSche extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainNo: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendSearchReq = this.sendSearchReq.bind(this);
    }
    handleChange(field, value) {
        this.setState({[field]: value});
    }
    sendSearchReq() {
        if (!this.state.trainNo) this.setState({msg: "Please enter a train number."});
        else {
            var url = `/api/schedules/${this.state.trainNo}`;
            fetch(url, {
                method: 'GET'
            }).then(res => res.json())
                .then(data => {
                    if (data.msg) this.setState({msg: data.msg});
                    else {
                        this.context.router.push('schedules');
                    }     
                })
                .catch(err => console.log(err));
        }
    }
    render() {
        return (
            <div className='page-container' id='search-sche-a'>
                <h1>View Train Schedule</h1>
                <div className='content'>
                    <InputBox label='Train Number' short='true' field='trainNo' funct={this.handleChange} />
                    <span className='msg'>{this.state.msg}</span>
                    <div className='buttons'>
                        <Link to='menu'><ButtonLink label='Back' colour='gold' /></Link>
                        <ButtonLink label='Search' colour='blue' funct={this.sendSearchReq} />
                    </div>
                </div>
            </div>
        );    
    }
}
  
SearchSche.contextTypes = {
    router() {
        router: React.PropTypes.func.isRequired
    }
};

export default SearchSche;