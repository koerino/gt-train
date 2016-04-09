import React from 'react';

const ButtonLink = ({className, funct}) => ({
    type: 'a',
    props: {
        className: className,
        function: funct
    }
});

export default ButtonLink;