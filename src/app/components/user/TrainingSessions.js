import React, { useCallback, useState, useEffect } from 'react';
import './trainingSessions.scss';

import { ProgressBarSmall } from '../progress-bar';

import { useApi } from '../../services';

const TrainingSessions = ({onReadMore}) => {

    const { findAllSessionsWithUserId } = useApi();
    const [ sessions, setSessions ] = useState();
    const [ page, setPage ] = useState(1);
    const [ error, setError ] = useState(false);

    const user = JSON.parse(localStorage.getItem('authUser'));

    const initFetch = useCallback(
        () => {
            const fetchSessions = async () => {
                const data = await findAllSessionsWithUserId(0, user.user_id);
                setSessions(data);
                console.log(data)
            };
            fetchSessions();
        }, [findAllSessionsWithUserId, user.user_id],
    );

    useEffect(() => {
        initFetch();
        return () => {}
    }, [initFetch]);

    const formatDate = (inputDate) => {
        let date = inputDate.split('T');
        date = date[0].split('-').reverse().join('/');
        return date;
    };

    const getPercentage = (right, total) => {
        const percentage = (parseInt(right))/(parseInt(total))*100;
        console.log(percentage);
        return percentage;
    };
    
    const handleReadMore = (ev, sessionID) => {
        ev.preventDefault();
        if (typeof onReadMore === 'function') {
            onReadMore(sessionID);
        };
    };

    const loadMore = async () => {
        const pageNr = page + 1;
        setPage(pageNr);
        const data = await findAllSessionsWithUserId(pageNr, user.user_id);
        // console.log(data.data.status)
        if (data[0]) {
            const addToSessions = sessions.concat(data);
            setSessions(addToSessions);
        } else if (data.data.status === 400) {
            setError(true);
        };
    };


    return (
        <div className='training-sessions-container'>
            <h2>{user.user_display_name}'s interval training sessions</h2>
            {sessions && sessions.map((session, index) => (
                <div key={index} className='session-container' onClick={(ev) => handleReadMore(ev,session.id)}>
                    <div className='session-block'>
                        <h4>Intervals {session.acf.type_of_training}</h4>
                        <p>{formatDate(session.date)}</p>
                    </div>
                    <div className='session-block-2'>
                        <p>{session.acf.total_right}/{session.acf.total_answers}</p>
                        <ProgressBarSmall completed={getPercentage(session.acf.total_right, session.acf.total_answers)}/>
                    </div>
                </div>
            ))}
            {   error &&
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
                            No more sessions to load.
                        </p>
                    </div>
                </div>
                }
            <button onClick={loadMore} >Load more...</button>
        </div>
    );
};

export default TrainingSessions;