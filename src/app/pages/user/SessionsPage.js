import React from 'react';
import { TrainingSessions } from '../../components';
import * as Routes from '../../routes';
import { useHistory } from 'react-router';

const SessionsPage = () => {

    let history = useHistory();

    const handleReadMore = (sessionID) => {
        history.push(`${Routes.USER_SESSION_DETAIL.replace(':id', sessionID)}`)
    };

    return (
        <div>
            <TrainingSessions onReadMore={handleReadMore} />
        </div>
    );
};

export default SessionsPage;