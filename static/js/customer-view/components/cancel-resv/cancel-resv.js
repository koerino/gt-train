import React from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link'; 
import Row from '../../../shared/row'; 

export default () => {
    return (
        <div className='page-container' id='cancel-resv'>
            <h1>Cancel Reservation</h1>
            <div className='content'>
                <Row />
                <div className='cancel-info'>
                    <span>Total Cost of Reservation ()</span>
                    <span>Date of Cancellation ()</span>
                    <span>Amount to be Refunded ()</span>
                </div>
                <div className='buttons'>
                    <Link to='menu'><ButtonLink label='Back' colour='gold' /></Link>
                    <ButtonLink label='Submit' colour='blue' />
                </div>
            </div>
        </div>
    );
}