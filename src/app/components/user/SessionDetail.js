import React, { useEffect, useCallback, useState } from 'react';
import { useApi } from '../../services';
import { useParams, useHistory } from 'react-router';
import { ProgressBarSmall } from '../progress-bar';
import './sessionDetail.scss';

const SessionDetail = () => {

    const id = useParams();
    const { getSessionById } = useApi();
    const [ session, setSession ] = useState();
    let history = useHistory();

    const user = JSON.parse(localStorage.getItem('authUser'));

    const initFetch = useCallback(
        () => {
            const fetchSession = async () => {
                const data = await getSessionById(id.id);
                setSession(data);
                console.log(data)
            };
            fetchSession();
        }, [getSessionById, id],
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

    const getPracticedIntervals = (session) => {
        let practicedIntervals = [];
        if (session.acf.minor_second_total !== "0") {
            practicedIntervals.push('Minor Second');
        };
        if (session.acf.major_second_total !== "0") {
            practicedIntervals.push('Major Second');
        };
        if (session.acf.minor_third_total !== "0") {
            practicedIntervals.push('Minor Third');
        };
        if (session.acf.major_third_total !== "0") {
            practicedIntervals.push('Major Third');
        };
        if (session.acf.perfect_fourth_total !== "0") {
            practicedIntervals.push('Perfect Fourth');
        };
        if (session.acf.tritone_total !== "0") {
            practicedIntervals.push('Tritone');
        };
        if (session.acf.perfect_fifth_total !== "0") {
            practicedIntervals.push('Perfect Fifth');
        };
        if (session.acf.minor_sixth_total !== "0") {
            practicedIntervals.push('Minor Sixth');
        };
        if (session.acf.major_sixth_total !== "0") {
            practicedIntervals.push('Major Sixth');
        };
        if (session.acf.minor_seventh_total !== "0") {
            practicedIntervals.push('Minor Seventh');
        };
        if (session.acf.major_seventh_total !== "0") {
            practicedIntervals.push('Major Seventh');
        };
        if (session.acf.perfect_octave_total !== "0") {
            practicedIntervals.push('Perfect Octave');
        };

        practicedIntervals = practicedIntervals.join(', ');
        return practicedIntervals;
    };

    const handleBack = () => {
        history.goBack();
    };

    return (
        <div className='session-detail-container'>
            {session &&
                <div>
                    <h2>{user.user_display_name}'s Training Session</h2>
                    <div className='session-detail-inner-container'>
                        <p>Type of training: intervals {session.acf.type_of_training}</p>
                        <p>Date: {formatDate(session.date)}</p>
                        <p>Interval order: {session.acf.interval_order}</p>
                        <p>Practiced intervals: {getPracticedIntervals(session)}</p>

                        {
                            parseInt(session.acf.minor_second_total) > 0 &&
                            <div className='session-progressbar-container'>
                                <p>Minor Second: {session.acf.minor_second_right}/{session.acf.minor_second_total}</p>
                                <ProgressBarSmall completed={getPercentage(session.acf.minor_second_right, session.acf.minor_second_total)} /> 
                            </div>
                        }
                        {
                            parseInt(session.acf.major_second_total) > 0 &&
                            <div className='session-progressbar-container'>
                                <p>Major Second: {session.acf.major_second_right}/{session.acf.major_second_total}</p>
                                <ProgressBarSmall completed={getPercentage(session.acf.major_second_right, session.acf.major_second_total)} /> 
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
                            parseInt(session.acf.major_third_total) > 0 &&
                            <div className='session-progressbar-container'>
                                <p>Major Third: {session.acf.major_third_right}/{session.acf.major_third_total}</p>
                                <ProgressBarSmall completed={getPercentage(session.acf.major_third_right, session.acf.major_third_total)} /> 
                            </div>
                        }
                        {
                            parseInt(session.acf.perfect_fourth_total) > 0 &&
                            <div className='session-progressbar-container'>
                                <p>Perfect fourth: {session.acf.perfect_fourth_right}/{session.acf.perfect_fourth_total}</p>
                                <ProgressBarSmall completed={getPercentage(session.acf.perfect_fourth_right, session.acf.perfect_fourth_total)} /> 
                            </div>
                        }
                        {
                            parseInt(session.acf.tritone_total) > 0 &&
                            <div className='session-progressbar-container'>
                                <p>Tritone: {session.acf.tritone_right}/{session.acf.tritone_total}</p>
                                <ProgressBarSmall completed={getPercentage(session.acf.tritone_right, session.acf.tritone_total)} /> 
                            </div>
                        }
                        {
                            parseInt(session.acf.perfect_fifth_total) > 0 &&
                            <div className='session-progressbar-container'>
                                <p>Perfect Fifth: {session.acf.perfect_fifth_right}/{session.acf.perfect_fifth_total}</p>
                                <ProgressBarSmall completed={getPercentage(session.acf.perfect_fifth_right, session.acf.perfect_fifth_total)} /> 
                            </div>
                        }
                        {
                            parseInt(session.acf.minor_sixth_total) > 0 &&
                            <div className='session-progressbar-container'>
                                <p>Minor Sixth: {session.acf.minor_sixth_right}/{session.acf.minor_sixth_total}</p>
                                <ProgressBarSmall completed={getPercentage(session.acf.minor_sixth_right, session.acf.minor_sixth_total)} /> 
                            </div>
                        }
                        {
                            parseInt(session.acf.major_sixth_total) > 0 &&
                            <div className='session-progressbar-container'>
                                <p>Major Sixth: {session.acf.major_sixth_right}/{session.acf.major_sixth_total}</p>
                                <ProgressBarSmall completed={getPercentage(session.acf.major_sixth_right, session.acf.major_sixth_total)} /> 
                            </div>
                        }
                        {
                            parseInt(session.acf.minor_seventh_total) > 0 &&
                            <div className='session-progressbar-container'>
                                <p>Minor Seventh: {session.acf.minor_seventh_right}/{session.acf.minor_seventh_total}</p>
                                <ProgressBarSmall completed={getPercentage(session.acf.minor_seventh_right, session.acf.minor_seventh_total)} /> 
                            </div>
                        }
                        {
                            parseInt(session.acf.major_seventh_total) > 0 &&
                            <div className='session-progressbar-container'>
                                <p>Major Seventh: {session.acf.major_seventh_right}/{session.acf.major_seventh_total}</p>
                                <ProgressBarSmall completed={getPercentage(session.acf.major_seventh_right, session.acf.major_seventh_total)} /> 
                            </div>
                        }
                        {
                            parseInt(session.acf.perfect_octave_total) > 0 &&
                            <div className='session-progressbar-container'>
                                <p>Perfect Octave: {session.acf.perfect_octave_right}/{session.acf.perfect_octave_total}</p>
                                <ProgressBarSmall completed={getPercentage(session.acf.perfect_octave_right, session.acf.perfect_octave_total)} /> 
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

export default SessionDetail