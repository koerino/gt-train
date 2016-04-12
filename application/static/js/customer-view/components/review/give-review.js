import React from 'react';
import ButtonLink from '../../../shared/button-link';
import InputBox from '../../../shared/input-box';
import Dropdown from '../../../shared/dropdown';

export default () => {
    return (
        <div>
            <h1>Give Review</h1>
            <InputBox label='Train Number' />
            <Dropdown label='Rating' />
            <InputBox label='Comment' />
            <ButtonLink label='Submit' />
        </div>
    );
}