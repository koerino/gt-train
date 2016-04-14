import React, { Component } from 'react';

class ButtonLink extends Component {
    render() {
        return (
            <div className='buttonlink'>
                <span className={this.props.colour}>{this.props.label}</span>
            </div>
        );
    }
}

export default ButtonLink;