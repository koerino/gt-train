import React, { Component } from 'react';

class Departures extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    handleChange(trainNo, duration, priceClass) {
        this.setState({
            trainNo: trainNo,
            duration: duration,
            priceClass: priceClass
        });
    }
    onChange(trainNo, duration, priceClass) {
        this.handleChange(trainNo, duration, priceClass);
    }
    render() {
        var data = this.props.data; 
        var entries = [];
        if (data) data.map(function(entry) {
            entries.push(
                <div key={entry.TrainNumber+entry.Duration}>
                    <span className='dep-col'>{entry.TrainNumber}</span>
                    <span className='dep-col-lg'>{entry.Duration}</span>
                    <span className='dep-col'><input name='dep' type='radio'  value={entry.TrainNumber+",First"+","+entry.Duration} onChange={this.props.select} /><span>{entry.firstClassPrice}</span></span>
                    <span className='dep-col'><input name='dep' type='radio' value={entry.TrainNumber+",Second"+","+entry.Duration} onChange={this.props.select} /><span>{entry.secondClassPrice}</span></span>
                </div>
            );
        }.bind(this)); 
        return (
            <div id='dep-table'>
                <div className='col-names'>
                    <span className='dep-col'>TrainNumber</span>
                    <span className='dep-col-lg'>Duration</span>
                    <span className='dep-col'>1st Class Price</span>
                    <span className='dep-col'>2nd Class Price</span>
                </div>
                <div>
                    {entries}
                </div>
            </div>
        );
    }
}
                               
export default Departures;