import React from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import InputBox from '../../../shared/input-box';
import Dropdown from '../../../shared/dropdown';

export default () => {
    return (
        <div className='page-container' id='payment-info'>
            <h1>Payment Information</h1>
            <div>
                <div id='payment-add'>
                    <h3>Add Card</h3>
                    <InputBox label='Name on Card' small='true' />
                    <InputBox label='Card Number' small='true' />
                    <InputBox label='CVV' small='true' short='true' />
                    <InputBox label='Exp Date(MM/YY)' small='true' short='true' />
                    <ButtonLink label='Add' colour='gold' />
                </div>
                <div id='vertical-line'></div>
                <div id='payment-delete'>
                    <h3>Delete Card</h3>
                    <Dropdown label='Card Number' />
                    <ButtonLink label='Delete' colour='blue' />
                    <Link to='reserve'><ButtonLink label='Back' colour='cyan' /></Link>
                </div>
            </div>
        </div>
    );
}