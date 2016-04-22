import React, { Component } from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import Schedules from './schedules';
import 'whatwg-fetch';

class ViewSches extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.sendGetReq = this.sendGetReq.bind(this);
    }
    sendGetReq() {
        fetch('/api/get-sches', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                this.setState({data: data});
        })
            .catch(err => console.log(err));
    }
    componentDidMount() {
         this.sendGetReq();
    }
    render() {
        return (
            <div className='page-container' id='schedules'>
                <div className='content'>
                    <Schedules data={this.state.data} />
                    <div className='buttons-b'>
                        <Link to='search-schedules'><ButtonLink label='Back' colour='gold' /></Link>
                        <Link to='menu'><ButtonLink label='Main Menu' colour='blue' /></Link>
                    </div>
                </div>
            </div>
        );    
    }
}

export default ViewSches;