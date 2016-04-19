import React, { Component } from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../../shared/button-link'; 
import Dropdown from '../../../shared/dropdown'; 
import Row from '../../../shared/row'; 

export default () => {
    return (
        <div className='page-container' id='make-resv'>
            <h1>Make Reservation</h1>
            <div className='content'>
                <Row />
                <div className='resv-info'>
                    <div>(Student Discount Status)</div>
                    <div>Total Cost ()</div>
                    <div>
                        <Dropdown label='Use Card' />
                        <span>Add Card</span>
                    </div>
                    <div>Add Another Train</div>
                </div>
                <div className='buttons'>
                    <Link to='menu'><ButtonLink label='Back' colour='gold' /></Link>
                    <ButtonLink label='Reserve' colour='blue' />
                </div>
            </div>
        </div>
    );
}