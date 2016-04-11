import React from 'react';
import ButtonLink from '../../../shared/button-link';

export default () => {
    return (
        <div>
            <h1>Confirmation</h1>
            <div><span>Reservation ID</span><span>(RID)</span></div>
            <div>Thank you for your purchase! Please save reservation ID for your record.</div>
            <ButtonLink label='Go Back to Main Menu' />
        </div>
    );
}