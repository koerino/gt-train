import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import classNames from 'classnames';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(val) {
        this.setState({value: val});
        this.props.funct(this.props.field, val);
    }
    render() {
        var classes = classNames({
            'dropdown': true,
            'short': this.props.short
        });
        return (
            <div className={classes}>
                <span>{this.props.label}</span>
                <Select value={this.props.value} options={this.props.options} onChange={this.onChange} />
            </div>
        );
    }
}

export default Dropdown;