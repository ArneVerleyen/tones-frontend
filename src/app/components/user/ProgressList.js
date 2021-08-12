import React from 'react';
import {Link} from 'react-router-dom';
import './progressList.scss';
import * as Routes from '../../routes';

const Training = () => {
    return (
        <div className='training-container' >
            <Link to={Routes.INTERVALS_PROGRESS_LIST} >Intervals progress</Link>
            <Link to={Routes.CHORDS_PROGRESS_LIST} >Chords progress</Link>
        </div>
    );
};

export default Training;