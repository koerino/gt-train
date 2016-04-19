import React from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import InputBox from '../../../shared/input-box';

export default () => {
    return (
        <div className='page-container' id='cancel-resv'>
            <h1>Cancel Reservation</h1>
            <div className='content'>
                <InputBox label='Reservation ID' />
                <div className='buttons'>
                    <Link to='menu'><ButtonLink label='Back' colour='gold' /></Link>
                    <ButtonLink label='Search' colour='blue' />
                </div>
            </div>
        </div>
    );
}