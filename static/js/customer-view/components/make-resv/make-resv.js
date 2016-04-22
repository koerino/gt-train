import React, { Component } from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link'; 
import Dropdown from '../../../shared/dropdown'; 
import Reservations from '../../../shared/reservations';
import 'whatwg-fetch';

class MakeResv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            resvs: [],
            card: "",
            discount: "",
            cost: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.sendGetResvReq = this.sendGetResvReq.bind(this);
        this.sendSubmitReq = this.sendSubmitReq.bind(this);
        this.sendRemoveReq = this.sendRemoveReq.bind(this);
        this.addMoreTrains = this.addMoreTrains.bind(this);
    }
    handleChange(field, value) {
        this.setState({[field]: value});
    }
    getOptions() {
        fetch('/api/cards', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.setState({cards: data}))
            .catch(err => console.log(err));    
    }
    sendGetResvReq() {
        fetch('/api/reserve/info', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                if (data[0]['Student'] === 1) this.setState({discount: "Student Discount Applied"});
                this.setState({cost: this.state.cost + data[0]['TotalCost']});
                this.setState({resvs: data});
            })
            .catch(err => console.log(err));
    }
    sendSubmitReq() {
        if (!this.state.card) this.setState({msg: "Please select a card for payment."})
        else {
            fetch('/api/reserve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cardNo: this.state.card
                })
            }).then(res => this.context.router.push('reserve-confirmation'))
                .catch(err => console.log(err));
        }
    }
    sendRemoveReq() {
        var val = document.querySelector('input[name="remove-resv"]:checked').value;
        var i = val.indexOf(",");
        var trainNo = val.substring(0, i);
        var dep = val.substring(i+1);
        fetch('/api/reserve/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trainNo: trainNo,
                dep: dep
            })
        }).then(res => {
                this.setState({msg: "Reservation removed."});
                this.context.router.push('reserve');
            })
            .catch(err => console.log(err));   
    }
    addMoreTrains() {
        fetch('/api/reserve/add', {
            method: 'POST'
        }).then(res => res.json())
            .then(data => {
                if (data.err) this.setState({msg: data.err});
                else {
                    this.context.router.push('reserve-search');
                }
            })
            .catch(err => console.log(err));
    }
    componentDidMount() {
        this.sendGetResvReq();
        this.getOptions();
    }
    render() {
        return (
            <div>
                <div className='page-container' id='make-resv'>
                    <h1>Make Reservation</h1>
                    <div>
                        <Reservations data={this.state.resvs} hideSelect='true' remove={this.sendRemoveReq} />
                        <span>Total Cost &nbsp; {Number(this.state.cost).toFixed(2)}</span>
                        <span>{this.state.msg}</span>
                        <span className='link' onClick={this.addMoreTrains}>Add Another Train</span>
                        <span className='link'><Link to='reserve-payment'>Add Card</Link></span>
                    </div>
                    <div>
                        <span>{ this.state.discount }</span>
                    </div>
                    <div className='dropdown'>
                        <Dropdown label='Use Card' short='true' field='card' options={this.state.cards} value={this.state.card} funct={this.handleChange} />
                    </div>
                    <div className='buttons'>
                            <Link to='reserve-extras'><ButtonLink label='Back' colour='gold' /></Link>
                            <Link to='menu'><ButtonLink label='Main Menu' colour='cyan' /></Link>
                            <ButtonLink label='Reserve' colour='blue' funct={this.sendSubmitReq} />
                    </div>
                </div>
            </div>
        );
    }
}

MakeResv.contextTypes = {
    router() {
        router: React.PropTypes.func.isRequired
    }
};

export default MakeResv;