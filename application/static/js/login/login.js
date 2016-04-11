import React from 'react';
import ButtonLink from '../shared/button-link';
import InputBox from '../shared/input-box';

export default () => {
    return (
        <div>
            <h1>Login</h1>
            <InputBox label='Username' />
            <InputBox label='Password' />
            <ButtonLink label='Login' />
            <ButtonLink label='Register' />
        </div>
    );
}