import React from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import Row from '../../../shared/row';

export default () => {
    return (
        <div className='page-container' id='reviews'>
            <h1>Reviews of (Train)</h1>
            <div className='content'>
                <Row />
                <div className='buttons'>
                    <Link to='review-search'><ButtonLink label='Back' colour='gold' /></Link>
                    <Link to='menu'><ButtonLink label='Main Menu' colour='cyan' /></Link>
                    <Link to='write-review'><ButtonLink label='Write a Review' colour='blue' /></Link>
                </div>
            </div>
        </div>
    );
}