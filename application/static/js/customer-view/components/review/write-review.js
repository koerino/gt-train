import React from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link';
import InputBox from '../../../shared/input-box';
import Dropdown from '../../../shared/dropdown';

export default () => {
    return (
        <div className='page-container' id='write-review'>
            <h1>Write Review</h1>
            <div className='content'>
                <InputBox label='Train Number' short='true' />
                <Dropdown label='Rating' short='true' />
                <InputBox label='Comment' long='true' />
                <div className='buttons'>
                    <Link to='review-search'><ButtonLink label='View Reviews' colour='gold' /></Link>
                    <Link to='menu'><ButtonLink label='Back' colour='cyan' /></Link>
                    <Link to='menu'><ButtonLink label='Submit' colour='blue' /></Link>
                </div>
            </div>
        </div>
    );
}