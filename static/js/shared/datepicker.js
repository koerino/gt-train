import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';

class Date extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment()
        };
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    handleChange(date) {
        this.setState({startDate: date});
    }
    onChange(date) {
        this.handleChange(date);
        this.props.funct(this.props.field, date);
    }
    render() {
        var classes = classNames({
            'datepicker': true,
            'small': this.props.small,
        });
        return (
            <div className={classes}>
                <span>{this.props.label}</span>
                <DatePicker selected={this.state.startDate} onChange={this.onChange} />
            </div>
        );
    }
}

export default Date;