import React from 'react';
import './chordsInfo.scss';
import { useHistory } from 'react-router';

const ChordsInfo = () => {

    let history = useHistory();

    const goBack = () => {
        history.goBack();
    };


    return (
        <div className='chords-info'>
            <h3>Chords training</h3>
            <p>
                Chords training is the next step. 
                With this excercise you'll hear a chord. 
                The goal is to identify the type of chord you've heard.
                 Chords are the layering of several tones played simultaneously. 
                 They are defined by their root note and their quality.
                 It's best to start practicing chords when you've learnt all intervals in harmony and asynchrone. 
                 We recommend you start with triad chords, then simple sevenths and then both. 
                 Triad chords are chords that are built with three notes. Simple seventh chords are built with four notes. 
                 With the chord exercises you'll learn how to identify these chord types:

            </p>

            <ul>
                <li>Minor chords</li>
                <li>Major chords</li>
                <li>Augmented chords</li>
                <li>Diminished chords</li>
                <li>Suspended second chords</li>
                <li>Suspended fourth chords</li>
                <li>Dominant seven chords</li>
                <li>Minor seven chords</li>
                <li>Major seven chords</li>
            </ul>

            <p>
                To get the fastest results it's best to train daily for a short amount of time (20min).
            </p>


            <div className ='back' onClick={goBack}>Back</div>
        </div>
    );
};

export default ChordsInfo;