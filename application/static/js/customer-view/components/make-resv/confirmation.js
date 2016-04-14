import React from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';

export default () => {
    return (
        <div className='page-container' id='confirmation'>
            <h1>Confirmation</h1>
            <div className='content'>
                <div><span>Reservation ID</span><span>(RID)</span></div>
                <div>Thank you for your purchase! Please save reservation ID for your record.</div>
                <Link to='menu'><ButtonLink label='Go Back to Main Menu' colour='blue' /></Link>
            </div>
        </div>
    );
}