import React, { Component } from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import Dropdown from '../../../shared/dropdown';
import Date from '../../../shared/datepicker';
import 'whatwg-fetch';

export default () => {
    return (
        <div className='page-container' id='search-sche-b'>
            <h1>Search Train</h1>
            <div className='content'>
                <Dropdown label='Departs From' />
                <Dropdown label='Arrives At' />
                <Date label='Departure Date' />
                <div className='buttons'>
                    <Link to='menu'><ButtonLink label='Back' colour='gold' /></Link>
                    <ButtonLink label='Find Trains' colour='blue' />
                </div>
            </div>
        </div>
    );
}