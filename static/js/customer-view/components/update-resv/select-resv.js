import React from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import Row from '../../../shared/row';

export default () => {
    return (
        <div className='page-container' id='select-resv'>
            <h1>Update Reservation</h1>
            <div className='content'>
                <Row />
                <div className='buttons'>
                    <Link to='update-search'><ButtonLink label='Back' colour='gold' /></Link>
                    <Link to='menu'><ButtonLink label='Main Menu' colour='cyan' /></Link>
                    <Link to='update'><ButtonLink label='Next' colour='blue' /></Link>
                </div>
            </div>
        </div>
    );
}