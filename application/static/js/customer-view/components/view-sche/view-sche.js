import React from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import Row from '../../../shared/row';

export default () => {
    return (
        <div className='page-container' id='view-sche'>
            <h1>View Train Schedule</h1>
            <div className='content'>
                <Row />
                <div className='buttons'>
                    <Link to='schedule-search'><ButtonLink label='Back to Search' colour='gold' /></Link>
                    <Link to='menu'><ButtonLink label='Main Menu' colour='blue' /></Link>
                </div>
            </div>
        </div>
    );
}