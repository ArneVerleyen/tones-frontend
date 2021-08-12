import React, { useEffect, useCallback, useState } from 'react';
import { useApi } from '../../services';
import { useParams, useHistory } from 'react-router';
import { ProgressBarSmall } from '../progress-bar';
import './sessionDetail.scss';

const ChordSessionDetail = () => {

    const id = useParams();
    const { getChordSessionById } = useApi();
    const [ session, setSession ] = useState();
    let history = useHistory();

    const user = JSON.parse(localStorage.getItem('authUser'));

    const initFetch = useCallback(
        () => {
            const fetchSession = async () => {
                const data = await getChordSessionById(id.id);
                setSession(data);
                console.log(data);
            };
            fetchSession();
        }, [getChordSessionById, id],
    );

    useEffect(() => {
        initFetch();
        return () => {};
    }, [initFetch]);

    const formatDate = (inputDate) => {
        let date = inputDate.split('T');
        date = date[0].split('-').reverse().join('/');
        console.log(typeof session.acf.minor_second_total)
        console.log(session.acf.perfect_octave_total);
        return date;
    };

    const getPercentage = (right, total) => {
        const percentage = (parseInt(right))/(parseInt(total))*100;
        return percentage;
    };

    const getPracticedChords = (session) => {
        let practicedChords = [];
        if (parseInt(session.acf.minor_total) !== 0) {
            practicedChords.push('Minor chords');
        };
        if (parseInt(session.acf.major_total) !== 0) {
            practicedChords.push('Major chords');
        };
        if (parseInt(session.acf.augmented_total) !== 0) {
            practicedChords.push('Augmented chords');
        };
        if (parseInt(session.acf.diminished_total) !== 0) {
            practicedChords.push('Diminished chords');
        };
        if (parseInt(session.acf.sus2_total) !== 0) {
            practicedChords.push('Suspended second chords');
        };
        if (parseInt(session.acf.sus4_total) !== 0) {
            practicedChords.push('Suspended fourth chords');
        };
        if (parseInt(session.acf.dominant_seventh_total) !== 0) {
            practicedChords.push('Dominant seventh chords');
        };
        if (parseInt(session.acf.minor_seventh_total) !== 0) {
            practicedChords.push('Minor seventh chords');
        };
        if (parseInt(session.acf.major_seventh_total) !== 0) {
            practicedChords.push('Major seventh chords');
        };
        
        console.log(practicedChords);

        practicedChords = practicedChords.join(', ');
        return practicedChords;
    };

    const handleBack = () => {
        history.goBack();
    };

    return (
        <div className='session-detail-container'>
            {session &&
                <div>
                    <h2>{user.user_display_name}'s chords training session</h2>
                    <div className='session-detail-inner-container'>
                        <p>Type of training: chords {session.acf.type_of_training}</p>
                        <p>Date: {formatDate(session.date)}</p>
                        <p>Practiced intervals: {getPracticedChords(session)}</p>

                        {
                            parseInt(session.acf.minor_total) > 0 &&
                            <div className='session-progressbar-container'>
                                <p>Minor chords: {session.acf.minor_right}/{session.acf.minor_total}</p>
                                <ProgressBarSmall completed={getPercentage(session.acf.minor_right, session.acf.minor_total)} /> 
                            </div>
                        }
                        {
                            parseInt(session.acf.major_total) > 0 &&
                            <div className='session-progressbar-container'>
                                <p>Major chords: {session.acf.major_right}/{session.acf.major_total}</p>
                                <ProgressBarSmall completed={getPercentage(session.acf.major_right, session.acf.major_total)} /> 
                            </div>
                        }
                        {
                            parseInt(session.acf.minor_third_total) > 0 &&
                            <div className='session-progressbar-container'>
                                <p>Minor Third: {session.acf.minor_third_right}/{session.acf.minor_third_total}</p>
                                <ProgressBarSmall completed={getPercentage(session.acf.minor_third_right, session.acf.minor_third_total)} /> 
                            </div>
                        }
                        {
                            parseInt(session.acf.augmented_total) > 0 &&
                            <div className='session-progressbar-container'>
                                <p>Augmented chords: {session.acf.augmented_right}/{session.acf.augmented_total}</p>
                                <ProgressBarSmall completed={getPercentage(session.acf.augmented_right, session.acf.augmented_total)} /> 
                            </div>
                        }
                        {
                            parseInt(session.acf.diminished_total) > 0 &&
                            <div className='session-progressbar-container'>
                                <p>Diminished chords: {session.acf.diminished_right}/{session.acf.diminished_total}</p>
                                <ProgressBarSmall completed={getPercentage(session.acf.diminished_right, session.acf.diminished_total)} /> 
                            </div>
                        }
                        {
                            parseInt(session.acf.sus2_total) > 0 &&
                            <div className='session-progressbar-container'>
                                <p>Suspended second chords: {session.acf.sus2_right}/{session.acf.sus2_total}</p>
                                <ProgressBarSmall completed={getPercentage(session.acf.sus2_right, session.acf.sus2_total)} /> 
                            </div>
                        }
                        {
                            parseInt(session.acf.sus4_total) > 0 &&
                            <div className='session-progressbar-container'>
                                <p>Suspended fourth chords: {session.acf.sus4_right}/{session.acf.sus4_total}</p>
                                <ProgressBarSmall completed={getPercentage(session.acf.sus4_right, session.acf.sus4_total)} /> 
                            </div>
                        }
                        {
                            parseInt(session.acf.dominant_seventh_total) > 0 &&
                            <div className='session-progressbar-container'>
                                <p>Dominant seventh chords: {session.acf.dominant_seventh_right}/{session.acf.dominant_seventh_total}</p>
                                <ProgressBarSmall completed={getPercentage(session.acf.dominant_seventh_right, session.acf.dominant_seventh_total)} /> 
                            </div>
                        }
                        {
                            parseInt(session.acf.minor_seventh_total) > 0 &&
                            <div className='session-progressbar-container'>
                                <p>Minor seventh chords: {session.acf.minor_seventh_right}/{session.acf.minor_seventh_total}</p>
                                <ProgressBarSmall completed={getPercentage(session.acf.minor_seventh_right, session.acf.minor_seventh_total)} /> 
                            </div>
                        }
                        {
                            parseInt(session.acf.major_seventh_total) > 0 &&
                            <div className='session-progressbar-container'>
                                <p>Major seventh chords: {session.acf.major_seventh_right}/{session.acf.major_seventh_total}</p>
                                <ProgressBarSmall completed={getPercentage(session.acf.major_seventh_right, session.acf.major_seventh_total)} /> 
                            </div>
                        }

                    </div>
                </div>
            }
            <div className='back-btn' onClick={handleBack}>
                Back
            </div>
        </div>
    );
};

export default ChordSessionDetail;