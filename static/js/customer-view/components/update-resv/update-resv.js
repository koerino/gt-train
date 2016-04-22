import React, { Component } from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link'; 
import Date from '../../../shared/datepicker';
import moment from 'moment';
import Reservations from '../../../shared/reservations';
import 'whatwg-fetch';

class UpdateResv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resvs: [],
            updatedResvs: [],
            originalCost: 0
        };
        this.sendGetResvReq = this.sendGetResvReq.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setNewDate = this.setNewDate.bind(this);
        this.printUpdatedResv = this.printUpdatedResv.bind(this);
        this.sendUpdateReq = this.sendUpdateReq.bind(this);
    }
    handleChange(field, value) {
        this.setNewDate(field, value);
        this.printUpdatedResv(value);
    }
    setNewDate(field, value) {
        this.setState({[field]: value});
    }
    printUpdatedResv(value) {
        var value = value.toString();
        var date = this.state.updatedResvs[0].DepartureDate;
        var keep = date.slice(16);
        var newDate = value.slice(0, 3) + ", " + value.slice(4, 15);
        this.state.updatedResvs[0].DepartureDate = newDate + keep;
    }
    sendGetResvReq() {
        fetch('/api/update/selected', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                this.state.updatedResvs.push(JSON.parse(JSON.stringify(data[0])));
                this.setState({
                    resvs: data,
                    originalCost: data[0].TotalCost
                });
            })
            .catch(err => console.log(err));
    }
    sendUpdateReq() {
        var newDate = this.state.newDate;
        var today = moment();
        if (newDate.isBefore(today)) this.setState({msg: 'Please select a future date.'});
        else fetch('/api/update/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newDate: this.state.newDate
            })
        }).then(res => res.json())
            .then(data => {
                if (data.msg) this.setState({msg: data.msg})
                else this.context.router.push('update');
            })
            .catch(err => console.log(err));
    }   
    componentDidMount() {
        this.sendGetResvReq();
    }
    render() {
        return (
            <div className='page-container' id='update-resv'>
            <h1>Update Reservation</h1>
            <div className='content'>
                <div>
                    <h5>Current Schedule</h5>
                    <Reservations data={this.state.resvs} hideSelect='true' hideRemove='true' />
                    <div className='flex'>
                        <Date label='New Departure Date' field='newDate' small='true' funct={this.handleChange} />
                        <span className='msg-sm'>{this.state.msg}</span>
                        <Link to='search-schedules'><span className='search'>Search Availability</span></Link>
                    </div>
                </div>
                <div>
                    <h5>Updated Schedule</h5>
                    <Reservations data={this.state.updatedResvs} hideSelect='true' hideRemove='true' />
                    <span>Change Fee &nbsp; 50</span>
                    <span>Updated Total Cost &nbsp; {Number(this.state.originalCost + 50).toFixed(2)}</span>
                </div>
                <div className='buttons'>
                    <Link to='menu'><ButtonLink label='Back' colour='gold' /></Link>
                    <ButtonLink label='Submit' colour='blue' funct={this.sendUpdateReq} />
                </div>
            </div>
        </div>
        );
    }
}

export default UpdateResv;