import React from 'react';
import ButtonLink from '../../../shared/button-link';
import InputBox from '../../../shared/input-box';
import Dropdown from '../../../shared/dropdown';

export default () => {
    return (
        <div>
            <h1>Payment Information</h1>
            <div>
                <h3>Add Card</h3>
                <InputBox label='Name on Card' />
                <InputBox label='Card Number' />
                <InputBox label='CVV' />
                <InputBox label='Expiration Date(MM/YY)' />
                <ButtonLink label='Add' />
            </div>
            <div>
                <h3>Delete Card</h3>
                <Dropdown label='Card Number' />            
                <ButtonLink label='Delete' />
            </div>
        </div>
    );
}