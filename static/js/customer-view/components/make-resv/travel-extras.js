import React from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import InputBox from '../../../shared/input-box';
import QuantityInput from './quantity-input';

export default () => {
    return (
        <div className='page-container' id='travel-extras'>
            <h1>Travel Extras & Passenger Info</h1>
            <div className='content'>
                <QuantityInput label='Number of Baggage' />
                <span>Every passenger can bring up to 4 baggage. <br /><br />2 free of charge, 2 for $30 per bag.</span> 
                <InputBox label='Passenger Name' />
                <div className='buttons'>
                    <Link to='reserve-select'><ButtonLink label='Back' colour='gold' /></Link>
                    <Link to='menu'><ButtonLink label='Main Menu' colour='cyan' /></Link>
                    <ButtonLink label='Next' colour='blue' />
                </div>
            </div>
        </div>
    );
}