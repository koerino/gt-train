import React, {Component} from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import InputBox from '../../../shared/input-box';
import Dropdown from '../../../shared/dropdown';
import 'whatwg-fetch';

class WriteReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainNo: "",
            rating: "",
            comment: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.submitReview = this.submitReview.bind(this);
    }
    handleChange(field, value) {
        this.setState({[field]: value});
    }
    getOptions() {
        fetch('/api/ratings', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.setState({ratingOptions: data}))
            .catch(err => console.log(err));
    }
    submitReview() {
        if (!this.state.trainNo || !this.state.rating) this.setState({msg: "Please enter the train number and rating."});
        else {
            fetch('/api/reviews/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    trainNo: this.state.trainNo,
                    rating: this.state.rating,
                    comment: this.state.comment
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.msg) this.setState({msg: data.msg});
                })
                .catch(err => console.log(err));        
        }
    }
    componentDidMount() {
        this.getOptions();
    }
    render() {
            return (
            <div className='page-container' id='write-review'>
                <h1>Write Review</h1>
                <div className='content'>
                    <InputBox label='Train Number' short='true' field='trainNo' funct={this.handleChange} />
                    <Dropdown label='Rating' short='true' options={this.state.ratingOptions} field='rating' value={this.state.rating} funct={this.handleChange} />
                    <InputBox label='Comment' long='true' field='comment' funct={this.handleChange} />
                    <div className='buttons'>
                        <Link to='search-reviews'><ButtonLink label='View Reviews' colour='gold' /></Link>
                        <Link to='menu'><ButtonLink label='Back' colour='cyan' /></Link>
                        <ButtonLink label='Submit' colour='blue' funct={this.submitReview} />
                    </div>
                    <span className='msg'>{this.state.msg}</span>
                </div>
            </div>
        );
    }
}

export default WriteReview;