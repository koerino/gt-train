import React, { Component } from 'react';

class Row extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: ["Property-a", "Property-b", "Property-c", "Property-d"]
        };
    }
    render() {
        var entries = [];
        this.state.entries.map(function(entry) {
            entries.push(<span key={entry}>{entry}</span>);
        }); 
        return (
            <div className='row'>
                {entries}
            </div>
        );
    }
}
export default Row;