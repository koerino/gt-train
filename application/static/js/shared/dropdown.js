import React, { Component } from 'react';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: ['test1', 'test2', 'test3']
        };
    }
    render() {
        var dropdown = [];
        for (var i = 0; i < this.state.options.length; i++) {
            let option = this.state.options[i];
            dropdown.push(<option key={option} value={option}>{option}</option>);
        }
        dropdown.sort();
        return (
            <div>
                <span>{this.props.label}</span><select>{dropdown}</select>
            </div>
        );
    }
}

export default Dropdown;