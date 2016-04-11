import React from 'react';
import ButtonLink from '../../../shared/button-link';
import InputBox from '../../../shared/input-box';

export default () => {
    return (
        <div>
            <h1>Update Reservation</h1>
            <InputBox label='Reservation ID' />
            <ButtonLink label='Search' />
            <ButtonLink label='Back' />
        </div>
    );
}