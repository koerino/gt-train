import React from 'react';
import ButtonLink from '../../../shared/button-link';
import InputBox from '../../../shared/input-box';

export default () => {
    return (
        <div>
            <h1>View Review</h1>
            <InputBox label='Train Number' />
            <ButtonLink label='Back' />
            <ButtonLink label='Search' />
        </div>
    );
}