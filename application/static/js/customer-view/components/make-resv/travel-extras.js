import React from 'react';
import ButtonLink from '../../../shared/button-link';
import InputBox from '../../../shared/input-box';
import QuantityInput from '../../../shared/quantity-input';

export default () => {
    return (
        <div>
            <h1>Travel Extras & Passenger Info</h1>
            <QuantityInput label='Number of Baggage' />
            <span>Every passenger can bring up to 4 baggage. 2 free of charge, 2 for $30 per bag</span> 
            <InputBox label='Passenger Name' />
            <ButtonLink label='Back' />
            <ButtonLink label='Next' />
        </div>
    );
}