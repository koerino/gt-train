import React from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link'; 
import Datepicker from '../../../shared/datepicker';
import Row from '../../../shared/row';

export default () => {
    return (
        <div className='page-container' id='select-resv'>
            <h1>Update Reservation</h1>
            <div className='content'>
                <div>
                    <div>Current Schedule</div>
                    <Row />
                    <div>
                        <Datepicker label='New Departure Date' />
                        <ButtonLink label='Search availability' />
                    </div>
                </div>
                <div>
                    <div>Updated Schedule</div>
                    <Row />
                    <div>Change Fee ()</div>
                    <div>Updated Total Cost</div>
                </div>
                <div className='buttons'>
                    <Link to='menu'><ButtonLink label='Back' colour='gold' /></Link>
                    <ButtonLink label='Submit' colour='blue' />
                </div>
            </div>
        </div>
    );
}