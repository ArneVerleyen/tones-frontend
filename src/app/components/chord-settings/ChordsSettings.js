import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import * as ROUTES from '../../routes';

import './triadSettings.scss';

const ChordsSettings = (props) => {

    const typeOfTraining = 'All chords';

    const [intervalSettings, setIntervalSettings] = useState([
        true, true, true, true, true, true, true, true, true
    ]);

    let history = useHistory();

    const [intervalError, setIntervalError] = useState(false);

    const toggle = (interval) => {
        let tempSettings = [...intervalSettings];
        tempSettings[interval] = !tempSettings[interval];
        setIntervalSettings(tempSettings);
    };

    const start = () => {

       let settings = {
        minor: intervalSettings[0],
        major:intervalSettings[1],
        augmented: intervalSettings[2],
        diminished: intervalSettings[3],
        sus2: intervalSettings[4],
        sus4: intervalSettings[5],
        dominant_seventh: intervalSettings[6],
        minor_seventh:intervalSettings[7],
        major_seventh: intervalSettings[8],
        typeOfTraining: typeOfTraining
        };

        let count = 0;

        for(let i = 0; i < 12 ; i++) {
            if (intervalSettings[i] ) count++;
        };

        if (count <= 1) {
            setIntervalError(true);
        } else if (count > 1){
            setIntervalError(false);
        };

        if (count > 1) {
            localStorage.setItem('settings', JSON.stringify(settings));
            history.push(ROUTES.CHORDS);
        };
    };

    return (
        <div className="triad-settings-container">
            <div className="row" >
                {
                    intervalSettings[0]
                    ?   
                    <div className='active' onClick={() => toggle(0)}>
                        <p>Minor chords</p>
                    </div>
                    :   
                    <div onClick={() => toggle(0)}>
                        <p>Minor chords</p>
                    </div>
                }
                {
                    intervalSettings[1]
                    ?   
                    <div className='active' onClick={() => toggle(1)}>
                        <p>Major chords</p>
                    </div>
                    :   
                    <div onClick={() => toggle(1)}>
                        <p>Major chords</p>
                    </div>
                }

            </div>
            <div className="row" >
                {
                    intervalSettings[2]
                    ?   
                    <div className='active' onClick={() => toggle(2)}>
                        <p>Augmented chords</p>
                    </div>
                    :   
                    <div onClick={() => toggle(2)}>
                        <p>Augmented chords</p>
                    </div>
                }
                {
                    intervalSettings[3]
                    ?   
                    <div className='active' onClick={() => toggle(3)}>
                        <p>Diminished chords</p>
                    </div>
                    :   
                    <div onClick={() => toggle(3)}>
                        <p>Diminished chords</p>
                    </div>
                }
            </div>
            <div className="row" >
                {
                    intervalSettings[4]
                    ?   
                    <div className='active' onClick={() => toggle(4)}>
                        <p>Suspended second chords</p>
                    </div>
                    :   
                    <div onClick={() => toggle(4)}>
                        <p>Suspended second chords</p>
                    </div>
                }
                {
                    intervalSettings[5]
                    ?   
                    <div className='active' onClick={() => toggle(5)}>
                        <p>Suspended fourth chords</p>
                    </div>
                    :   
                    <div onClick={() => toggle(5)}>
                        <p>Suspended fourth chords</p>
                    </div>
                }
            </div>
            <div className="row" >
                {
                    intervalSettings[6]
                    ?   
                    <div className='active' onClick={() => toggle(6)}>
                        <p>Dominant seventh chords</p>
                    </div>
                    :   
                    <div onClick={() => toggle(6)}>
                        <p>Dominant seventh chords</p>
                    </div>
                }
                {
                    intervalSettings[7]
                    ?   
                    <div className='active' onClick={() => toggle(7)}>
                        <p>Minor seventh chords</p>
                    </div>
                    :   
                    <div onClick={() => toggle(7)}>
                        <p>Minor seventh chords</p>
                    </div>
                }

            </div>
            <div className="row" >
                {
                    intervalSettings[8]
                    ?   
                    <div className='active' onClick={() => toggle(8)}>
                        <p>Major seventh chords</p>
                    </div>
                    :   
                    <div onClick={() => toggle(8)}>
                        <p>Major seventh chords</p>
                    </div>
                }
            </div>

            <div className='link'>
                <h3><Link to={ROUTES.CHORDS_INFO}>More info about chords</Link></h3>
            </div>
            <div className='link'>
                <h3 onClick={start}>Start training</h3>
            </div>
            {intervalError && 
                <div className="error">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="70.47" height="108" viewBox="0 0 106 108">
                        <g id="Group_14" data-name="Group 14" transform="translate(478 -1968)">
                            <g id="Ellipse_5" data-name="Ellipse 5" transform="translate(-478 1970)" fill="none" stroke="#470047" strokeWidth="8">
                            <circle cx="53" cy="53" r="53" stroke="none"/>
                            <circle cx="53" cy="53" r="49" fill="none"/>
                            </g>
                            <text id="_" data-name="!" transform="translate(-425 2053)" fill="#470047" fontSize="95" fontFamily="Baskerville"><tspan x="-11.875" y="0">!</tspan></text>
                        </g>
                        </svg>
                        <p>
                            Select at least two chords.
                        </p>
                    </div>
                </div>
            }
        </div>
    );
};

export default ChordsSettings;