import React from 'react';
import ButtonLink from '../../../shared/button-link';
import InputBox from '../../../shared/input-box';

export default () => {
    return (
        <div>
            <h1>Add School Info</h1>
            <InputBox label='School Email Address' />
            <div>Your School Email Address Ends With .edu</div>
            <ButtonLink label='Back' />
            <ButtonLink label='Submit' />
        </div>
    );
}