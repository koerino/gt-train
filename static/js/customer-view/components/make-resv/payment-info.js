import React, { Component } from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import InputBox from '../../../shared/input-box';
import Dropdown from '../../../shared/dropdown';
import moment from 'moment';
import 'whatwg-fetch';

class PaymentInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            nameOnCard: "",
            cardNo: "",
            CVV: "",
            expDate: "",
            toBeDeleted: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.sendAddReq = this.sendAddReq.bind(this);
        this.sendDeleteReq = this.sendDeleteReq.bind(this);
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
    sendAddReq() {
        var exp = moment(this.state.expDate, "YYYY/MM");
        var today = moment().format('YYYY/MM');
        if (!this.state.nameOnCard || !this.state.cardNo || !this.state.CVV || !this.state.expDate) this.setState({msg: "Please complete all the fields."});
        else if (exp.isBefore(today)) this.setState({msg: "Please use an unexpired card."});
        else {
            fetch('/api/cards/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nameOnCard: this.state.nameOnCard,
                    cardNo: this.state.cardNo,
                    CVV: this.state.CVV,
                    expDate: this.state.expDate
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.msg) this.setState({msg: data.msg});
                    else this.context.router.push('reserve');
                })
                .catch(err => console.log(err));
        }
    }
    sendDeleteReq() {
        if (!this.state.toBeDeleted) this.setState({msg: "Please select the card to be removed."});
        else {
            fetch('/api/cards/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    card: this.state.toBeDeleted
                })
            }).then(res => this.context.router.push('reserve'))
                .catch(err => console.log(err));
        }    
    }
    componentDidMount() {
        this.getOptions();
    }
    render() {
        return (
            <div className='page-container' id='payment-info'>
                <h1>Payment Information</h1>
                <div>
                    <div id='payment-add'>
                        <h3>Add Card</h3>
                        <InputBox label='Name on Card' small='true' field='nameOnCard' funct={this.handleChange} />
                        <InputBox label='Card Number' small='true' field='cardNo' funct={this.handleChange} />
                        <InputBox label='CVV' small='true' short='true' field='CVV' funct={this.handleChange} />
                        <InputBox label='Exp Date(YYYY/MM)' small='true' short='true' field='expDate' funct={this.handleChange} />
                        <ButtonLink label='Add' colour='gold' funct={this.sendAddReq} />
                    </div>
                    <div id='vertical-line'></div>
                    <div id='payment-delete'>
                        <h3>Delete Card</h3>
                        <Dropdown label='Card Number' short='true' field='toBeDeleted' options={this.state.cards} value={this.state.toBeDeleted} funct={this.handleChange} />
                        <ButtonLink label='Delete' colour='blue' funct={this.sendDeleteReq} />
                        <Link to='reserve'><ButtonLink label='Back' colour='cyan' /></Link>
                        <div className='msg'>{this.state.msg}</div>
                    </div>
                </div>
            </div>
        );    
    }
}

PaymentInfo.contextTypes = {
    router() {
        router: React.PropTypes.func.isRequired
    }
};

export default PaymentInfo;