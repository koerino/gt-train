import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class Date extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment()
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(date) {
        this.setState({startDate: date});
    }
    render() {
        return (
            <div>
                <span>{this.props.label}</span>
                <DatePicker selected={this.state.startDate} onChange={this.handleChange} />
            </div>
        );
    }
}

export default Date;