import React, {Component} from 'react';

class InputBox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
            <span>{ this.props.label }</span><input />
            </div>
        );
    }
}

export default InputBox;