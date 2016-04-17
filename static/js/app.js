import React from 'react';
import { Component } from 'react';

export default class App extends Component {
    render() {
        return (
            <div className='mega-container'>{this.props.children}</div>
        );
    }
}