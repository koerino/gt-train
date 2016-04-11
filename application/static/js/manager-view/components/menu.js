import React from 'react';
import ButtonLink from '../../shared/button-link';

export default () => {
    return (
        <div>
            <h1>Hello, (User)</h1>
            <a>View Revenue Report</a>
            <a>View Popular Route Report</a>
            <ButtonLink label='Log Out' />
        </div>
    );
}