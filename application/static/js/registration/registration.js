import React from 'react';
import ButtonLink from '../shared/button-link';
import InputBox from '../shared/input-box';

export default () => {
    return (
        <div>
            <h1>New User Registration</h1>
            <InputBox label='Username' />
            <InputBox label='Email Address' />
            <InputBox label='Password' />
            <InputBox label='Confirm Password' />
            <ButtonLink label='Create' />
        </div>
    );
}