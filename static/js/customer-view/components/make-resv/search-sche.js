import React, { Component } from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import Dropdown from '../../../shared/dropdown';
import Date from '../../../shared/datepicker';
import moment from 'moment';
import 'whatwg-fetch';

class SearchSche extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dep: "",
            arr: "",
            date: moment()
        };
        this.handleChange = this.handleChange.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.sendSearchReq = this.sendSearchReq.bind(this);
    }
    getOptions() {
        fetch('/api/stations', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.setState({stations: data}))
            .catch(err => console.log(err));
    }
    handleChange(field, value) {
        this.setState({[field]: value});
    }
    sendSearchReq() {
        if (!this.state.dep || !this.state.arr) this.setState({msg: "Please select your itinerary."});
        if (this.state.dep === this.state.arr) this.setState({msg: "Please select different stations."});
        if (this.state.date.isBefore(moment())) this.setState({msg: "Please select a future date."});
        else {
            var url = `/api/departures/${this.state.dep}/${this.state.arr}/${this.state.date.format('ddd, DD MMM YYYY')}`;
            fetch(url, {
                method: 'GET',
            }).then(res => res.json())
                .then(data => {
                    if (data.msg) this.setState({msg: data.msg});
                    else this.context.router.push('reserve-select');
                })
                .catch(err => console.log(err));
        }
    }
    componentDidMount() {
        this.getOptions();
    }
    render() {
        return (
            <div className='page-container' id='search-sche-b'>
                <h1>Search Train</h1>
                <div className='content'>
                    <Dropdown label='Departs From' field='dep' options={this.state.stations} value={this.state.dep} funct={this.handleChange} />
                    <Dropdown label='Arrives At' field='arr' options={this.state.stations} value={this.state.arr} funct={this.handleChange} />
                    <Date label='Departure Date' field='date' funct={this.handleChange} />
                    <span className='msg'>{this.state.msg}</span>
                    <div className='buttons'>
                        <Link to='menu'><ButtonLink label='Back' colour='gold' /></Link>
                        <ButtonLink label='Find Trains' colour='blue' funct={this.sendSearchReq} />
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