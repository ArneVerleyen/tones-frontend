import React, { Fragment } from 'react';
import { useHistory } from 'react-router';
import { ChordTrainingSessions } from '../../components';
import * as Routes from '../../routes';
const ChordTrainingSessionsPage = () => {

    let history = useHistory();

    const handleReadMore = (sessionID) => {
        history.push(`${Routes.CHORDS_PROGRESS_DETAIL.replace(':id', sessionID)}`)
    };
    
    return (
        <Fragment>
            <ChordTrainingSessions onReadMore={handleReadMore} />
        </Fragment>
    );
};

export default ChordTrainingSessionsPage;