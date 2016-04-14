import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import classNames from 'classnames';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [
                {value: 'one', label: 'test option one'},
                {value: 'two', label: 'test option two'},
                {value: 'three', label: 'test option three'}
            ]
        };
    }
    render() {
        var classes = classNames({
            'dropdown': true,
            'short': this.props.short
        });
        return (
            <div className={classes}>
                <span>{this.props.label}</span>
                <Select value='' options={this.state.options} />
            </div>
        );
    }
}

export default Dropdown;