import React, { Component } from 'react';

class ButtonLink extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='buttonlink'>
                <span className={this.props.colour} onClick={this.props.funct}>{this.props.label}</span>
            </div>
        );
    }
}

export default ButtonLink;