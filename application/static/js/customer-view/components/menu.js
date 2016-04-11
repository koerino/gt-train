import React from 'react';
import ButtonLink from '../../shared/button-link';

export default () => {
    return (
        <div>
            <h1>Hello, (User)</h1>
            <a>View Train Schedules</a>
            <a>Make a Reservation</a>
            <a>Update a Reservation</a>
            <a>Cancel a Reservation</a>
            <a>Give Review</a>
            <a>Add School Information (Discount)</a>
            <ButtonLink label='Log Out' />
        </div>
    );
}