import React, { Component } from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import InputBox from '../../../shared/input-box';
import 'whatwg-fetch';

class SearchReview extends Component {
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
        var url = `/api/reviews/${this.state.trainNo}`;
        fetch(url, {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                if (data.msg) this.setState({msg: data.msg})
                else {
                    this.context.router.push('reviews')
                }     
            })
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div className='page-container' id='search-review'>
                <h1>View Review</h1>
                <div className='content'>
                    <InputBox label='Train Number' short='true' field='trainNo' funct={this.handleChange} />
                    <span className='msg'>{this.state.msg}</span>
                     <div className='buttons'>
                         <Link to='write-review'><ButtonLink label='Back'  colour='gold' /></Link>
                         <ButtonLink label='Search'  colour='blue'  funct={this.sendSearchReq} />
                    </div>
                </div>
            </div>
        );
    }
}
  
SearchReview.contextTypes = {
    router() {
        router: React.PropTypes.func.isRequired
    }
};

export default SearchReview;