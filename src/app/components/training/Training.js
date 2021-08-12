import React from 'react';
import {Link} from 'react-router-dom';
import './training.scss';
import * as Routes from '../../routes';

const Training = () => {
    return (
        <div className='training-container' >
            <Link to={Routes.INTERVAL_SETTINGS} >Intervals training</Link>
            <Link to={Routes.INTERVALS_SYNCHRONIC_SETTINGS} >Intervals in harmony training</Link>
            <Link to={Routes.TRIADS_SETTINGS} >Triad chord training</Link>
            <Link to={Routes.SEVENTHS_SETTINGS} >Simple seventh chord training</Link>
            <Link to={Routes.CHORDS_SETTINGS} >All chords training</Link>
        </div>
    );
};

export default Training;