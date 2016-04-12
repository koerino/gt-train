import React from 'react';
import ButtonLink from '../../../shared/button-link';
import Dropdown from '../../../shared/dropdown';
import Date from '../../../shared/datepicker';

export default () => {
    return (
        <div>
            <h1>Search Train</h1>
            <Dropdown label='Departs From' />
            <Dropdown label='Arrives At' />
            <Date label='Departure Date' />
            <ButtonLink label='Find Trains' />
        </div>
    );
}