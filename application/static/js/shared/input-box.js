import React, { Component } from 'react';
import classNames from 'classnames';

class InputBox extends Component {
    render() {
        var classes = classNames({
            'inputbox': true,
            'small': this.props.small,
            'short': this.props.short,
            'long': this.props.long
        });
        return (
            <div className={classes}>
                <span>{this.props.label}</span><input />
            </div>
        );
    }
}

export default InputBox;