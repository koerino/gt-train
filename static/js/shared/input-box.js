import React, { Component } from 'react';
import classNames from 'classnames';

class InputBox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var classes = classNames({
            'inputbox': true,
            'small': this.props.small,
            'short': this.props.short,
            'long': this.props.long
        });
        return (
            <div className={classes}>
                <span>{this.props.label}</span>
                <input type={this.props.type} onChange={e => this.props.funct(this.props.field, e.target.value)} />
            </div>
        );
    }
}

export default InputBox;