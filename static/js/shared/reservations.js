import React, { Component } from 'react';

class Reservations extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var data = this.props.data;
        var entries = [];
        if (data) data.map(function(entry) {
            entries.push(
                <div key={entry.ReservationID+entry.TrainNumber} className='resv-row'>
                    <span className={this.props.hideSelect ? 'resv-col-hidden' : 'resv-col-short'}><input name='select-resv' type='radio' value={entry.TrainNumber} onChange={this.props.select} /></span>
                    <span className='resv-col-short'>{entry.TrainNumber}</span>
                    <span className='resv-col-long'>{entry.DepartureDate}</span>
                    <span className='resv-col'>{entry.DepartsFrom}</span>
                    <span className='resv-col'>{entry.ArrivesAt}</span>
                    <span className='resv-col-short'>{entry.Class}</span>
                    <span className='resv-col-short'>{Number(entry.TotalCost).toFixed(2)}</span>
                    <span className='resv-col-short'>{entry.NumberOfBaggages}</span>
                    <span className='resv-col'>{entry.PassengeName}</span>
                    <span className={this.props.hideRemove ? 'resv-col-hidden' : 'resv-col-short'}><input name='remove-resv' type='radio' value={entry.TrainNumber+","+entry.DepartureDate} onChange={this.props.remove} /></span>
                </div>
            );
        }.bind(this)); 
        return (
            <div id='resvs-table'>
                <div className='col-names'>
                    <span className={this.props.hideSelect ? 'resv-col-hidden' : 'resv-col-short'} >Select</span>
                    <span className='resv-col-short'>Train</span>
                    <span className='resv-col-long'>Departure</span>
                    <span className='resv-col'>Departs From</span>
                    <span className='resv-col'>Arrives At</span>
                    <span className='resv-col-short'>Class</span>
                    <span className='resv-col-short'>Price</span>
                    <span className='resv-col-short'>Baggage</span>
                    <span className='resv-col'>Passenger</span>
                    <span className = {this.props.hideRemove ? 'resv-col-hidden' : 'resv-col-short'}>Remove</span>
                </div>
                {entries}
            </div>
        );
    }
}
                               
export default Reservations;