import React from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import InputBox from '../../../shared/input-box';

export default () => {
    return (
        <div className='page-container' id='search-sche-a'>
            <h1>View Train Schedule</h1>
            <div className='content'>
                <InputBox label='Train Number' short='true' />
                <div className='buttons'>
                    <Link to='menu'><ButtonLink label='Back' colour='gold' /></Link>
                    <Link to='schedules'><ButtonLink label='Search' colour='blue' /></Link>{/* to-be-dynamic */}
                </div>
            </div>
        </div>
    );
}