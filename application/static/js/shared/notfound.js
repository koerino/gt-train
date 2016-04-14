import React from 'react';
import { Link } from 'react-router';
import ButtonLink from './button-link';

export default () => {
    return (
        <div id='notfound'>
            <img src={require('../../assets/404.png')}></img>
            <Link to='menu'><ButtonLink label='Back' colour='gold' /></Link>
        </div>
    );
}