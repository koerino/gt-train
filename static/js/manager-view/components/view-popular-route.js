import React from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../shared/button-link';
import Row from '../../shared/row';

export default () => {
    return (
        <div className='page-container' id='popular-routes'>
            <h1>Popular Routes Report</h1>
            <div className='content'>
                <Row />
                <Link to='admin'><ButtonLink label='Back' colour='blue' /></Link>
            </div>
        </div>
    );
}