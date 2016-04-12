import React, { Component } from 'react';

class ButtonLink extends Component {
    render() {
        return (
            <div>
                <a>{this.props.label}</a>
            </div>
        );
    }
}

export default ButtonLink;