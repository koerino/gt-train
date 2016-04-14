import React from 'react';
import { Link } from 'react-router';
import ButtonLink from '../shared/button-link';
import InputBox from '../shared/input-box';

export default () => {
    return (
        <div className='page-container' id='registration'>
            <h1>New User Registration</h1>
            <div className='content'>
                <InputBox label='Username' />
                <InputBox label='Email Address' />
                <InputBox label='Password' />
                <InputBox label='Confirm Password' />
                <div className='buttons'>
                    <Link to='/'><ButtonLink label='Back' colour='gold' /></Link>
                    <ButtonLink label='Create' colour='blue' />
                </div>
            </div>
        </div>
    );
}