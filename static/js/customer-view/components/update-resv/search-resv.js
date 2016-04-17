import React from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import InputBox from '../../../shared/input-box';

export default () => {
    return (
        <div className='page-container' id='update-resv'>
            <h1>Update Reservation</h1>
            <div className='content'>
                <InputBox label='Reservation ID' />
                <div className='buttons'>
                    <Link to='menu'><ButtonLink label='Back' colour='gold' /></Link>
                    <Link to='update-select'><ButtonLink label='Search' colour='blue' /></Link>{/* to-be-dynamic */}
                </div>
            </div>
        </div>
    );
}