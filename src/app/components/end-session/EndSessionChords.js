import React from 'react';
import { useHistory } from 'react-router';
import * as Routes from '../../routes';
import { ProgressBarSmall } from '../progress-bar';
import './endSession.scss';

import { useApi } from '../../services';

const EndSessionChords = () => {

    const { storeChordSession } = useApi();

    const score = JSON.parse(localStorage.getItem('score'));
    const user = JSON.parse(localStorage.getItem('authUser'));
    const settings = JSON.parse(localStorage.getItem('settings'));

    let history = useHistory();

    const handleSave = () => {
        let body = {
            status: 'publish',
            title: user.user_display_name+'chord:'+ Date.now(),
            fields: {
                minor_right: score.minor.right,
                minor_total: score.minor.total,
                major_right: score.major.right,
                major_total: score.major.total,
                augmented_right: score.augmented.right,
                augmented_total: score.augmented.total,
                diminished_right: score.diminished.right,
                diminished_total: score.diminished.total,
                sus2_right: score.sus2.right,
                sus2_total: score.sus2.total,
                sus4_right: score.sus4.right,
                sus4_total: score.sus4.total,
                dominant_seventh_right: score.dominant_seventh.right,
                dominant_seventh_total: score.dominant_seventh.total,
                major_seventh_right: score.major_seventh.right,
                major_seventh_total: score.major_seventh.total,
                minor_seventh_right: score.minor_seventh.right,
                minor_seventh_total: score.minor_seventh.total,
                user_id: user.user_id,
                total_right: score.right,
                total_answers: score.right + score.wrong,
                type_of_training: settings.typeOfTraining
            }
        };

        storeChordSession(body, user.token);

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
                    score.minor.total !== 0 &&                 
                    <div className='interval-score'>
                        <p>Minor chords: {score.minor.right}/{score.minor.total}</p>
                        <ProgressBarSmall completed={(score.minor.right/score.minor.total)*100} />
                    </div>
                }
                {
                    score.major.total !== 0 &&                 
                    <div className='interval-score'>
                        <p>Major chords: {score.major.right}/{score.major.total}</p>
                        <ProgressBarSmall completed={(score.major.right/score.major.total)*100} />
                    </div>
                }
               {
                    score.augmented.total !== 0 &&                 
                    <div className='interval-score'>
                        <p>Augmented chords: {score.augmented.right}/{score.augmented.total}</p>
                        <ProgressBarSmall completed={(score.augmented.right/score.augmented.total)*100} />
                    </div>
                }
                {
                    score.diminished.total !== 0 &&                 
                    <div className='interval-score'>
                        <p>Diminished chords: {score.diminished.right}/{score.diminished.total}</p>
                        <ProgressBarSmall completed={(score.diminished.right/score.diminished.total)*100} />
                    </div>
                }
                {
                    score.sus2.total !== 0 &&                 
                    <div className='interval-score'>
                        <p>Suspended second chords: {score.sus2.right}/{score.sus2.total}</p>
                        <ProgressBarSmall completed={(score.sus2.right/score.sus2.total)*100} />
                    </div>
                }
                {
                    score.sus4.total !== 0 &&                 
                    <div className='interval-score'>
                        <p>Suspended fourth chords: {score.sus4.right}/{score.sus4.total}</p>
                        <ProgressBarSmall completed={(score.sus4.right/score.sus4.total)*100} />
                    </div>
                }
                {
                    score.dominant_seventh.total !== 0 &&                 
                    <div className='interval-score'>
                        <p>Dominant seventh chords: {score.dominant_seventh.right}/{score.dominant_seventh.total}</p>
                        <ProgressBarSmall completed={(score.dominant_seventh.right/score.dominant_seventh.total)*100} />
                    </div>
                }
                {
                    score.minor_seventh.total !== 0 &&                 
                    <div className='interval-score'>
                        <p>Minor seventh chords: {score.minor_seventh.right}/{score.minor_seventh.total}</p>
                        <ProgressBarSmall completed={(score.minor_seventh.right/score.minor_seventh.total)*100} />
                    </div>
                }
                {
                    score.major_seventh.total !== 0 &&                 
                    <div className='interval-score'>
                        <p>Major seventh chords: {score.major_seventh.right}/{score.major_seventh.total}</p>
                        <ProgressBarSmall completed={(score.major_seventh.right/score.major_seventh.total)*100} />
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

export default EndSessionChords;
