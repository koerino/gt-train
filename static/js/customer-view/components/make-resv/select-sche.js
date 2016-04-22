import React, { Component } from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import Departures from './departures';
import 'whatwg-fetch';

class SelectDep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendGetReq = this.sendGetReq.bind(this);
        this.sendSelectReq = this.sendSelectReq.bind(this);
    }
    sendGetReq() {
        fetch('/api/get-deps', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                this.setState({data: data});
            })
            .catch(err => console.log(err));
    }
    componentWillMount() {
        this.sendGetReq();
    }
    handleChange(trainNo, duration, priceClass) {
        this.setState({
            trainNo: trainNo,
            duration: duration,
            priceClass: priceClass
        });
    }
    sendSelectReq() {
        var val = document.querySelector('input[name="dep"]:checked').value;
        var i = val.indexOf(",");
        var j = val.lastIndexOf(",");
        var trainNo = val.substring(0, i);
        var priceClass = val.substring(i+1, j);
        var depTime = val.substring(j+1, j+9);
        fetch('/api/reserve/select', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trainNo: trainNo,
                priceClass: priceClass,
                depTime: depTime
            })
        }).catch(err => console.log(err));
    }
    render() {
        return (
            <div className='page-container' id='select-dep'>
                <div className='content'>
                    <Departures data={this.state.data} funct={this.handleChange} select={this.sendSelectReq} />
                    <div className='buttons-b'>
                        <Link to='reserve-search'><ButtonLink label='Back' colour='gold' /></Link>
                        <Link to='menu'><ButtonLink label='Main Menu' colour='cyan' /></Link>
                        <Link to='reserve-extras'><ButtonLink label='Next' colour='blue' /></Link>
                    </div>
                </div>
            </div>
        );    
    }
}

export default SelectDep;