import React, { Component } from 'react';

class Reviews extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var data = this.props.data;
        var trainNo = "";
        var entries = [];
        if (data) data.map(function(entry) {
            trainNo = entry.TrainNumber;
            entries.push(
                <div key={entry.ReviewNumber}>
                    <span className='ratings'>{entry.Rating}</span>
                    <span className='comments'>{entry.Comment}</span>
                </div>
            );
        }); 
        return (
            <div id='review-table'>
                <h1>Reviews of&nbsp;{trainNo}</h1>
                <div className='col-names'>
                    <span className='ratings'>Rating</span>
                    <span className='comments'>Comments</span>
                </div>
                {entries}
            </div>
        );
    }
}
                               
export default Reviews;