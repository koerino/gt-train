import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import classNames from 'classnames';
import 'whatwg-fetch';

class Dropdown extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var classes = classNames({
            'dropdown': true,
            'short': this.props.short
        });
        return (
            <div className={classes}>
                <span>{this.props.label}</span>
                <Select loadOptions={getStations} />
            </div>
        );
    }
}

const getStations = (input) => {
    return fetch('/api/stations', {
        method: 'GET'
    }).then(res => res.json())
        .then(data => {
            return {options: data};    
        })
        .catch(err => console.log(err));    
}

export default Dropdown;