import React from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import Row from '../../../shared/row';

export default () => {
    return (
        <div className='page-container' id='select-sche'>
            <h1>Select Departure</h1>
            <div className='content'>
                <Row />
                <div className='buttons'>
                    <Link to='reserve-search'><ButtonLink label='Back' colour='gold' /></Link>
                    <Link to='menu'><ButtonLink label='Main Menu' colour='cyan' /></Link>
                    <Link to='reserve-extras'><ButtonLink label='Next' colour='blue' /></Link>
                </div>
            </div>
        </div>
    );
}