import React, { Component } from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import Reservations from '../../../shared/reservations';
import 'whatwg-fetch';

class SelectResv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resvID: "",
            resvs: [],
            msg: ""
        }
        this.sendGetInfoReq = this.sendGetInfoReq.bind(this);
        this.sendGetResvReq = this.sendGetResvReq.bind(this);
        this.sendSelectReq = this.sendSelectReq.bind(this);
    }
    sendGetInfoReq() {
        fetch('/api/update/info', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
               var resvID = data.resvID;
               this.sendGetResvReq(resvID);
            })
            .catch(err => console.log(err)); 
    }
    sendGetResvReq(resvID) {
        var url = `/api/resvs/${resvID}`;
        fetch(url, {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.setState({resvs: data}))
            .catch(err => console.log(err));
    }
    sendSelectReq() {
        var trainNo = document.querySelector('input[name="select-resv"]:checked').value;
        fetch('/api/update/select', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trainNo: trainNo
            })
        }).then(res => res.json())
            .then(data => {
                if (data.msg) this.setState({msg: data.msg}); 
                else this.context.router.push('update');
            })
            .catch(err => console.log(err));
    }
    componentDidMount() {
         this.sendGetInfoReq();
    }
    render() {
        return (
            <div className='page-container' id='cancel-resv'>
                <h1>Update Reservation</h1>
                <div className='content'>
                    <Reservations data={this.state.resvs} hideRemove='true' select={this.sendSelectReq} />
                    <span className='msg'>{this.state.msg}</span>
                    <div className='buttons'>
                        <Link to='update-search'><ButtonLink label='Back' colour='gold' /></Link>
                        <Link to='menu'><ButtonLink label='Main Menu' colour='cyan' /></Link>
                    </div>
                </div>
            </div>
        );  
    }
}

SelectResv.contextTypes = {
    router() {
        router: React.PropTypes.func.isRequired
    }
};
 
export default SelectResv;