import React, { Component } from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import Reviews from './reviews';
import 'whatwg-fetch';

class SearchReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.sendGetReq = this.sendGetReq.bind(this);
    }
    handleChange(field, value) {
        this.setState({[field]: value});
    }
    sendGetReq() {
        fetch('/api/get-reviews', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.setState({data: data}))
            .catch(err => console.log(err));
    }
    componentDidMount() {
        return this.sendGetReq();
    }
    render() {
        return (
            <div className='page-container' id='reviews'>
                <div className='content'>
                    <Reviews data={this.state.data} />
                    <div className='buttons-b'>
                        <Link to='search-reviews'><ButtonLink label='Back' colour='gold' /></Link>
                        <Link to='menu'><ButtonLink label='Main Menu' colour='cyan' /></Link>
                        <Link to='write-review'><ButtonLink label='Write a Review' colour='blue' /></Link>
                    </div>
                </div>
            </div>
        );    
    }
}

export default SearchReview;