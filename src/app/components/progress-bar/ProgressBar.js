import React from 'react';
import './progressBar.scss';

const ProgressBar = (props) => {
    const completed = props;

    const fillStyle = {
        height: '100%',
        width: `${completed.completed}%` ,
        backgroundColor: '#FFB94E',
        borderRadius: 'inherit',
        transition: 'width 0.3s ease-in-out',
    };

    return (
        <div className='progressBar'>
            <div style={fillStyle}>
            </div>
        </div>
    );
};

export default ProgressBar;