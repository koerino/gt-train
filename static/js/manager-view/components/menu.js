import React from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../shared/button-link';

export default () => {
    return (
        <div className='page-container menu'>
            <h1>Welcome!</h1>
            <div className='content'>
                <Link to='revenue'><span>View Revenue Report</span></Link>
                <Link to='popular-routes'><span>View Popular Route Report</span></Link>
                <div id='btn'>
                    <Link to='/'><ButtonLink label='Log Out' colour='blue' /></Link>
                </div>
            </div>
        </div>
    );
}