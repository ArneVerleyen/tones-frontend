import React from 'react';
import './progressBarSmall.scss';

const ProgressBarSmall = (props) => {
    const completed = props;

    const fillStyle = {
        height: '100%',
        width: `${completed.completed}%` ,
        backgroundColor: '#FFB94E',
        borderRadius: 'inherit',
        transition: 'width 0.3s ease-in-out',
    };

    return (
        <div className='progressBarSmall'>
            <div style={fillStyle}>
            </div>
        </div>
    );
};

export default ProgressBarSmall;