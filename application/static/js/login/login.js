import React from 'react';
import { Link } from 'react-router';
import ButtonLink from '../shared/button-link';
import InputBox from '../shared/input-box';

export default () => {
    return (
        <div className='page-container' id='login'>
            <h1>Login</h1>
            <div className='content'>
                <InputBox label='Username' />
                <InputBox label='Password' />
                <div className='buttons'>
                    <ButtonLink label='Login' colour='gold' />
                    <Link to='registration'><ButtonLink label='Register' colour='blue' /></Link>
                </div>
            </div>
        </div>
    );
}