import React from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../shared/button-link';

export default () => {
    return (
        <div className='page-container menu'>
            <h1>Hello, (User)</h1>
            <div className='content'>
                <Link to='schedule-search'><span>View Train Schedules</span></Link>
                <Link to='reserve-search'><span>Make a Reservation</span></Link>
                <Link to='update-search'><span>Change Reservation</span></Link>
                <Link to='cancel-search'><span>Cancel Reservation</span></Link>
                <Link to='write-review'><span>Write and View Reviews</span></Link>
                <Link to='school-info'><span>Add School Information (Student Discount)</span></Link>
                <div id='btn'>
                    <Link to='/'><ButtonLink label='Log Out' colour='blue' /></Link>
                </div>
            </div>
        </div>
    );
}