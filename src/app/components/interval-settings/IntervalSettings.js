import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import * as ROUTES from '../../routes';

import './intervalSettings.scss';

const IntervalSettings = (props) => {

    const typeOfTraining = props;

    const [intervalSettings, setIntervalSettings] = useState([
        false, false, false, true, false, false, true, false, false, false, false, true, true, false
    ]);

    let history = useHistory();

    const [orderError, setOrderError] = useState(false);
    const [intervalError, setIntervalError] = useState(false);

    const toggle = (interval) => {
        let tempSettings = [...intervalSettings];
        tempSettings[interval] = !tempSettings[interval];
        setIntervalSettings(tempSettings);
    };

    const start = () => {

       let settings = {
        m2: intervalSettings[0],
        M2:intervalSettings[1],
        m3: intervalSettings[2],
        M3: intervalSettings[3],
        P4: intervalSettings[4],
        tritone: intervalSettings[5],
        P5: intervalSettings[6],
        m6: intervalSettings[7],
        M6: intervalSettings[8],
        m7: intervalSettings[9],
        M7: intervalSettings[10],
        P8: intervalSettings[11],
        ascending: intervalSettings[12],
        descending: intervalSettings[13],
        typeOfTraining: typeOfTraining.typeOfTraining
        };

        let count = 0;

        for(let i = 0; i < 12 ; i++) {
            if (intervalSettings[i] ) count++;
        };

        if (!settings.ascending && !settings.descending) {
            setOrderError(true);
        } else if (settings.ascending | settings.descending) {
            setOrderError(false);
        };
        if (count <= 2) {
            setIntervalError(true);
        } else if (count > 2){
            setIntervalError(false);
        };

        if (settings.ascending && count > 2 | settings.descending && count > 2) {
            localStorage.setItem('settings', JSON.stringify(settings));
            if (typeOfTraining.typeOfTraining === "asynchrone") {
                history.push(ROUTES.INTERVALS);
            } else if (typeOfTraining.typeOfTraining === 'synchrone') {
                history.push(ROUTES.INTERVALS_SYNCHRONIC);
            };
        };
    };

    return (
        <div className="interval-settings-container">
            <div className="row" >
                {
                    intervalSettings[0]
                    ?   
                    <div className='active' onClick={() => toggle(0)}>
                        <p>minor second</p>
                        <p>m2</p>
                        <p>1(semitone)</p>
                    </div>
                    :   
                    <div onClick={() => toggle(0)}>
                        <p>minor second</p>
                        <p>m2</p>
                        <p>1(semitone)</p>
                    </div>
                }
                {
                    intervalSettings[1]
                    ?   
                    <div className='active' onClick={() => toggle(1)}>
                        <p>major second</p>
                        <p>M2</p>
                        <p>2(semitone)</p>
                    </div>
                    :   
                    <div onClick={() => toggle(1)}>
                        <p>major second</p>
                        <p>M2</p>
                        <p>2(semitone)</p>
                    </div>
                }

            </div>
            <div className="row" >
                {
                    intervalSettings[2]
                    ?   
                    <div className='active' onClick={() => toggle(2)}>
                        <p>minor third</p>
                        <p>m3</p>
                        <p>3(semitone)</p>
                    </div>
                    :   
                    <div onClick={() => toggle(2)}>
                        <p>minor third</p>
                        <p>m3</p>
                        <p>3(semitone)</p>
                    </div>
                }
                {
                    intervalSettings[3]
                    ?   
                    <div className='active' onClick={() => toggle(3)}>
                        <p>major third</p>
                        <p>M3</p>
                        <p>4(semitone)</p>
                    </div>
                    :   
                    <div onClick={() => toggle(3)}>
                        <p>major third</p>
                        <p>M3</p>
                        <p>4(semitone)</p>
                    </div>
                }
            </div>
            <div className="row" >
                {
                    intervalSettings[4]
                    ?   
                    <div className='active' onClick={() => toggle(4)}>
                        <p>perfect fourth</p>
                        <p>P4</p>
                        <p>5(semitone)</p>
                    </div>
                    :   
                    <div onClick={() => toggle(4)}>
                        <p>perfect fourth</p>
                        <p>P4</p>
                        <p>5(semitone)</p>
                    </div>
                }
                {
                    intervalSettings[5]
                    ?   
                    <div className='active' onClick={() => toggle(5)}>
                        <p>Tritone</p>
                        <p>d5/A4</p>
                        <p>6(semitone)</p>
                    </div>
                    :   
                    <div onClick={() => toggle(5)}>
                        <p>Tritone</p>
                        <p>d5/A4</p>
                        <p>6(semitone)</p>
                    </div>
                }
            </div>
            <div className="row" >
                {
                    intervalSettings[6]
                    ?   
                    <div className='active' onClick={() => toggle(6)}>
                        <p>perfect fifth</p>
                        <p>P5</p>
                        <p>7(semitone)</p>
                    </div>
                    :   
                    <div onClick={() => toggle(6)}>
                        <p>perfect fifth</p>
                        <p>P5</p>
                        <p>7(semitone)</p>  
                    </div>
                }
                {
                    intervalSettings[7]
                    ?   
                    <div className='active' onClick={() => toggle(7)}>
                        <p>minor sixth</p>
                        <p>m6</p>
                        <p>8(semitone)</p>
                    </div>
                    :   
                    <div onClick={() => toggle(7)}>
                        <p>minor sixth</p>
                        <p>m6</p>
                        <p>8(semitone)</p>
                    </div>
                }
            </div>
            <div className="row" >
                {
                    intervalSettings[8]
                    ?   
                    <div className='active' onClick={() => toggle(8)}>
                        <p>major sixth</p>
                        <p>M6</p>
                        <p>9(semitone)</p>
                    </div>
                    :   
                    <div onClick={() => toggle(8)}>
                        <p>major sixth</p>
                        <p>M6</p>
                        <p>9(semitone)</p>
                    </div>
                }
                {
                    intervalSettings[9]
                    ?   
                    <div className='active' onClick={() => toggle(9)}>
                        <p>minor seventh</p>
                        <p>m7</p>
                        <p>10(semitone)</p>
                    </div>
                    :   
                    <div onClick={() => toggle(9)}>
                        <p>minor seventh</p>
                        <p>m7</p>
                        <p>10(semitone)</p>
                    </div>
                }
            </div>
            <div className="row" >
            {
                    intervalSettings[10]
                    ?   
                    <div className='active' onClick={() => toggle(10)}>
                        <p>major seventh</p>
                        <p>M7</p>
                        <p>11(semitone)</p>
                    </div>
                    :   
                    <div onClick={() => toggle(10)}>
                        <p>major seventh</p>
                        <p>M7</p>
                        <p>11(semitone)</p>
                    </div>
                }
                {
                    intervalSettings[11]
                    ?   
                    <div className='active' onClick={() => toggle(11)}>
                        <p>perfect octave</p>
                        <p>P8</p>
                        <p>12(semitone)</p>
                    </div>
                    :   
                    <div onClick={() => toggle(11)}>
                        <p>perfect octave</p>
                        <p>P8</p>
                        <p>12(semitone)</p>
                    </div>
                }
            </div>
            <div className="row" >
            {
                    intervalSettings[12]
                    ?   
                    <div className='active' onClick={() => toggle(12)}>
                        <p>Ascending</p>
                    </div>
                    :   
                    <div onClick={() => toggle(12)}>
                        <p>Ascending</p>
                    </div>
                }
                {
                    intervalSettings[13]
                    ?   
                    <div className='active' onClick={() => toggle(13)}>
                        <p>Descending</p>
                    </div>
                    :   
                    <div onClick={() => toggle(13)}>
                        <p>Descending</p>
                    </div>
                }
            </div>
            <div className='link'>
                <h3><Link to={ROUTES.INTERVALS_INFO}>More info about intervals</Link></h3>
            </div>
            <div className='link'>
                <h3 onClick={start}>Start training</h3>
            </div>
            {orderError && 
                <div className="error">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="106" height="108" viewBox="0 0 106 108">
                        <g id="Group_14" data-name="Group 14" transform="translate(478 -1968)">
                            <g id="Ellipse_5" data-name="Ellipse 5" transform="translate(-478 1970)" fill="none" stroke="#470047" strokeWidth="8">
                            <circle cx="53" cy="53" r="53" stroke="none"/>
                            <circle cx="53" cy="53" r="49" fill="none"/>
                            </g>
                            <text id="_" data-name="!" transform="translate(-425 2053)" fill="#470047" fontSize="95" fontFamily="Baskerville"><tspan x="-11.875" y="0">!</tspan></text>
                        </g>
                        </svg>
                        <p>
                            Select if you want the intervals Ascending, Descending or both.
                        </p>
                    </div>
                </div>
            }
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
                            Select at least two intervals.
                        </p>
                    </div>
                </div>
            }
        </div>
    );
};

export default IntervalSettings;