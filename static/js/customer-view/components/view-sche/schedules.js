import React, { Component } from 'react';

class Schedules extends Component {
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
                <div key={entry.TrainNumber+entry.Name}>
                    <span className='sche-cols'>{entry.ArrivalTime}</span>
                    <span className='sche-cols'>{entry.DepartureTime}</span>
                    <span className='sche-cols'>{entry.Name}</span>
                </div>
            );
        }); 
        return (
            <div id='sches-table'>
                <h1>Schedule of&nbsp;{trainNo}</h1>
                <div className='col-names'>
                    <span className='sche-cols'>Arrival Time</span>
                    <span className='sche-cols'>Departure Time</span>
                    <span className='sche-cols'>Station</span>
                </div>
                {entries}
            </div>
        );
    }
}
                               
export default Schedules;