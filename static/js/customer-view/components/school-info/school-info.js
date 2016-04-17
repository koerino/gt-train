import React from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import InputBox from '../../../shared/input-box';

export default () => {
    return (
        <div className='page-container' id='school-info'>
            <h1>Add School Info</h1>
            <div className='content'>
                <InputBox label='School Email Address' />
                <span>Your School Email Address Ends With .edu</span>
                <div>
                    <Link to='menu'><ButtonLink label='Back' colour='gold' /></Link>
                    <Link to='menu'><ButtonLink label='Submit' colour='blue' /></Link>
                </div>
            </div>
        </div>
    );
}