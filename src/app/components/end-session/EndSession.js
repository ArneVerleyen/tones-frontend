import React, {useState} from 'react';
import { useHistory, Link } from 'react-router';
import * as Routes from '../../routes';
import { ProgressBarSmall } from '../progress-bar';
import './endSession.scss';

import { useApi } from '../../services';

const EndSession = () => {

    const [ logged, setLogged ] = useState(true);

    const { storeSession } = useApi();

    const score = JSON.parse(localStorage.getItem('score'));
    const user = JSON.parse(localStorage.getItem('authUser'));
    const settings = JSON.parse(localStorage.getItem('settings'));

    let IntervalsOrder;
    if (settings.ascending && settings.descending) {
        IntervalsOrder = "Ascending/Descending";
    } else if (settings.ascending && !settings.descending) {
        IntervalsOrder = "Ascending";
    } else if (settings.descending && !settings.ascending) {
        IntervalsOrder = "Descending";
    };

    if (localStorage.getItem('authUser') === 'null'){
       console.log('elo')
    };

    let history = useHistory();

    const handleSave = () => {
        let body = {
            status: 'publish',
            title: user.user_display_name + Date.now(),
            fields: {
                minor_second_right: score.m2.right,
                minor_second_total: score.m2.total,
                major_second_right: score.M2.right,
                major_second_total: score.M2.total,
                minor_third_right: score.m3.right,
                minor_third_total: score.m3.total,
                major_third_right: score.M3.right,
                major_third_total: score.M3.total,
                perfect_fourth_right: score.P4.right,
                perfect_fourth_total: score.P4.total,
                tritone_right: score.tritone.right,
                tritone_total: score.tritone.total,
                perfect_fifth_right: score.P5.right,
                perfect_fifth_total: score.P5.total,
                minor_sixth_right: score.m6.right,
                minor_sixth_total: score.m6.total,
                major_sixth_right: score.M6.right,
                major_sixth_total: score.M6.total,
                minor_seventh_right: score.m7.right,
                minor_seventh_total: score.m7.total,
                major_seventh_right: score.M7.right,
                major_seventh_total: score.M7.total,
                perfect_octave_right: score.P8.right,
                perfect_octave_total: score.P8.total,
                type_of_training: score.typeOfTraining,
                user_id: user.user_id,
                total_right: score.right,
                total_answers: score.right + score.wrong,
                interval_order: IntervalsOrder
            }
        };

        storeSession(body, user.token);

        // change to user profile overview.
        history.push(Routes.TRAINING);
    };

    const goRegister = () => {
        history.push(Routes.AUTH_SIGN_UP);
    };

    return (
        <div className='end-session-container'>
           <h1>Training score:</h1>

           <div className='interval-score-container'>
                {
                    score.m2.total !== 0 &&                 
                    <div className='interval-score'>
                        <p>Minor second: {score.m2.right}/{score.m2.total}</p>
                        <ProgressBarSmall completed={(score.m2.right/score.m2.total)*100} />
                    </div>
                }
                {
                    score.M2.total !== 0 &&                 
                    <div className='interval-score'>
                        <p>Major second: {score.M2.right}/{score.M2.total}</p>
                        <ProgressBarSmall completed={(score.M2.right/score.M2.total)*100} />
                    </div>
                }
               {
                    score.m3.total !== 0 &&                 
                    <div className='interval-score'>
                        <p>Minor third: {score.m3.right}/{score.m3.total}</p>
                        <ProgressBarSmall completed={(score.m3.right/score.m3.total)*100} />
                    </div>
                }
                {
                    score.M3.total !== 0 &&                 
                    <div className='interval-score'>
                        <p>Major third: {score.M3.right}/{score.M3.total}</p>
                        <ProgressBarSmall completed={(score.M3.right/score.M3.total)*100} />
                    </div>
                }
                {
                    score.P4.total !== 0 &&                 
                    <div className='interval-score'>
                        <p>Perfect fourth: {score.P4.right}/{score.P4.total}</p>
                        <ProgressBarSmall completed={(score.P4.right/score.P4.total)*100} />
                    </div>
                }
                {
                    score.tritone.total !== 0 &&                 
                    <div className='interval-score'>
                        <p>Tritone: {score.tritone.right}/{score.tritone.total}</p>
                        <ProgressBarSmall completed={(score.tritone.right/score.tritone.total)*100} />
                    </div>
                }
                {
                    score.P5.total !== 0 &&                 
                    <div className='interval-score'>
                        <p>Perfect fifth: {score.P5.right}/{score.P5.total}</p>
                        <ProgressBarSmall completed={(score.P5.right/score.P5.total)*100} />
                    </div>
                }
                {
                    score.m6.total !== 0 &&                 
                    <div className='interval-score'>
                        <p>Minor sixth: {score.m6.right}/{score.m6.total}</p>
                        <ProgressBarSmall completed={(score.m6.right/score.m6.total)*100} />
                    </div>
                }
                {
                    score.M6.total !== 0 &&                 
                    <div className='interval-score'>
                        <p>Major sixth: {score.M6.right}/{score.M6.total}</p>
                        <ProgressBarSmall completed={(score.M6.right/score.M6.total)*100} />
                    </div>
                }
                {
                    score.m7.total !== 0 &&                 
                    <div className='interval-score'>
                        <p>Minor seventh: {score.m7.right}/{score.m7.total}</p>
                        <ProgressBarSmall completed={(score.m7.right/score.m7.total)*100} />
                    </div>
                }
                {
                    score.M7.total !== 0 &&                 
                    <div className='interval-score'>
                        <p>Major seventh: {score.M7.right}/{score.M7.total}</p>
                        <ProgressBarSmall completed={(score.M7.right/score.M7.total)*100} />
                    </div>
                }
                {
                    score.P8.total !== 0 &&                 
                    <div className='interval-score'>
                        <p>Perfect octave: {score.P8.right}/{score.P8.total}</p>
                        <ProgressBarSmall completed={(score.P8.right/score.P8.total)*100} />
                    </div>
                }
            </div>


        {
            localStorage.getItem('authUser') !== 'null' &&
            <div onClick={handleSave} className='save'>
                <p>Save session</p>
            </div> 
        }   

        {
            localStorage.getItem('authUser') === 'null' &&
            <div onClick={goRegister} className='save'>
                <p>Register</p>
            </div> 
        }   

        </div>
    );
};

export default EndSession;
