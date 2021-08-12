import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
// import './intervals.scss';
import * as Tone from 'tone';
// import  {StartAudioContext} from 'startaudiocontext';
import play from '../../_static/icons/play.svg';
import soundIcon from '../../_static/icons/sound-icon.svg';
import {wrongTheme, rightTheme, normalTheme} from './themes';
import {ThemeProvider} from 'styled-components';
import {GlobalStyles} from './GlobalStyles';
import * as ROUTES from '../../routes';
import { ProgressBar } from '../progress-bar';

const Intervals = () => {

    let history = useHistory();

    let settings = JSON.parse(localStorage.getItem('settings'));

    if (settings === null) {
        history.push(ROUTES.INTERVAL_SETTINGS);
    };

    const [ musicalInterval, setMusicalInterval ] = useState(0);
    const [ intervalOctave, setIntervalOctave ] = useState(4);  
    const [ tone, setTone ] = useState(1);
    const [ firstNote, setFirstNote ] = useState('E4');
    const [ secondNote, setSecondNote ] = useState('E4');
    const [ order, setOrder ] = useState(0);
    const [ score, setScore ] = useState({
        m2: {right: 0, total: 0},
        M2: {right: 0, total: 0},
        m3: {right: 0, total: 0},
        M3: {right: 0, total: 0},
        P4: {right: 0, total: 0},
        tritone: {right: 0, total: 0},
        P5: {right: 0, total: 0},
        m6: {right: 0, total: 0},
        M6: {right: 0, total: 0},
        m7: {right: 0, total: 0},
        M7: {right: 0, total: 0},
        P8: {right: 0, total: 0},
        typeOfTraining: settings.typeOfTraining,
    });


    const [ answers, setAnswers ] = useState({right: 0, wrong: 0});

    const [background, setBackground] = useState(normalTheme);

    // Use memo hook so array doesn't reredener because of useCallback hook dependency
    let practiseIntervals = useMemo(() => {
        const getPractiseIntervals = () => {
            let practiseIntervals = [];
            if (settings.m2) {practiseIntervals.push('m2')};
            if (settings.M2) {practiseIntervals.push('M2')};
            if (settings.m3) {practiseIntervals.push('m3')};
            if (settings.M3) {practiseIntervals.push('M3')};
            if (settings.P4) {practiseIntervals.push('P4')};
            if (settings.tritone) {practiseIntervals.push('tritone')};
            if (settings.P5) {practiseIntervals.push('P5')};
            if (settings.m6) {practiseIntervals.push('m6')};
            if (settings.M6) {practiseIntervals.push('M6')};
            if (settings.m7) {practiseIntervals.push('m7')};
            if (settings.M7) {practiseIntervals.push('M7')};
            if (settings.P8) {practiseIntervals.push('P8')};
    
            return practiseIntervals;
        }
        return getPractiseIntervals();
    }, [settings.M2, settings.M3, settings.M6, settings.M7, settings.P4, settings.P5, settings.P8, settings.m2, settings.m3, settings.m6, settings.m7, settings.tritone]);

    let practiseIntervalsLength = practiseIntervals.length;

    // Get random interval, octave, asc/desc order and note.

    const getRandomInterval = () => {
        const random = Math.floor((Math.random() * practiseIntervalsLength) + 1);
        setMusicalInterval(random);
    };

    const getRandomTone = () => {
        const random = Math.floor((Math.random() * 12) + 1);
        setTone(random);
    };

    const getRandomOctave = () => {
        const random = Math.floor((Math.random() * 4) + 2);
        setIntervalOctave(random);
    };

    const getRandomOrder = () => {
        if (settings.descending && settings.ascending) {
            let random = Math.floor((Math.random() * 2) + 1);
            setOrder(random);
        };
    };

    if (musicalInterval === 0) {
        getRandomInterval();
        getRandomTone();
        getRandomOctave();
        getRandomOrder();
    };

    const getNormalBackground = useCallback(() => {
        setBackground(normalTheme);
    },[]);
    
    const handlePlay = useCallback(() => {

        // array containing all intervals for each note (without accounting for octaves).

        const allIntervals = [
            ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B', 'C'],
            ['Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db'],
            ['D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'C#', 'D'],
            ['Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb'],
            ['E', 'F', 'F#', 'G', 'Ab', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
            ['F', 'F#', 'G', 'Ab', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F'],
            ['Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb'],
            ['G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G'],
            ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'],
            ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A'],
            ['Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb'],
            ['B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'],
        ];

        let referenceNote;
        let questionNote;

        referenceNote = allIntervals[tone - 1][0] + intervalOctave.toString();

        // Calculate correct interval from reference note.

        if (practiseIntervals[musicalInterval - 1] === 'm2') {
            console.log('m2');
            questionNote = allIntervals[tone - 1][1] + intervalOctave.toString();
            if (allIntervals[tone - 1][0] === 'B') {
                questionNote = allIntervals[tone - 1][1] + (intervalOctave + 1).toString();
            };
        } else if (practiseIntervals[musicalInterval - 1] === 'M2') {
            console.log('M2');
            questionNote = allIntervals[tone - 1][2] + intervalOctave.toString();
            if (allIntervals[tone - 1][0] === 'B'|| allIntervals[tone - 1][0] === 'Bb') {
                questionNote = allIntervals[tone - 1][2] + (intervalOctave + 1).toString();
            };
        } else if (practiseIntervals[musicalInterval - 1] === 'm3') {
            console.log('m3');
            questionNote = allIntervals[tone - 1][3] + intervalOctave.toString();
            if (allIntervals[tone - 1][0] === 'B'|| allIntervals[tone - 1][0] === 'Bb' || allIntervals[tone - 1][0] === 'A') {
                questionNote = allIntervals[tone - 1][3] + (intervalOctave + 1).toString();
            };
        } else if (practiseIntervals[musicalInterval - 1] === 'M3') {
            console.log('M3');
            questionNote = allIntervals[tone - 1][4] + intervalOctave.toString();
            if (allIntervals[tone - 1][0] === 'B'|| allIntervals[tone - 1][0] === 'Bb' || allIntervals[tone - 1][0] === 'A' || allIntervals[tone - 1][0] === 'Ab') {
                questionNote = allIntervals[tone - 1][4] + (intervalOctave + 1).toString();
            };
        } else if (practiseIntervals[musicalInterval - 1] === 'P4') {
            console.log('P4');
            questionNote = allIntervals[tone - 1][5] + intervalOctave.toString();
            if (allIntervals[tone - 1][0] === 'B'|| allIntervals[tone - 1][0] === 'Bb' || allIntervals[tone - 1][0] === 'A' || allIntervals[tone - 1][0] === 'Ab' || allIntervals[tone - 1][0] === 'G') {
                questionNote = allIntervals[tone - 1][5] + (intervalOctave + 1).toString();
            };
        } else if (practiseIntervals[musicalInterval - 1] === 'tritone') {
            console.log('tritone');
            questionNote = allIntervals[tone - 1][6] + intervalOctave.toString();
            if (allIntervals[tone - 1][0] === 'B'|| allIntervals[tone - 1][0] === 'Bb' || allIntervals[tone - 1][0] === 'A' || allIntervals[tone - 1][0] === 'Ab' || allIntervals[tone - 1][0] === 'G' || allIntervals[tone - 1][0] === 'Gb') {
                questionNote = allIntervals[tone - 1][6] + (intervalOctave + 1).toString();
            };
        } else if (practiseIntervals[musicalInterval - 1] === 'P5') {
            console.log('P5');
            questionNote = allIntervals[tone - 1][7] + intervalOctave.toString();
            if (allIntervals[tone - 1][0] === 'B'|| allIntervals[tone - 1][0] === 'Bb' || allIntervals[tone - 1][0] === 'A' || allIntervals[tone - 1][0] === 'Ab' || allIntervals[tone - 1][0] === 'G' || allIntervals[tone - 1][0] === 'Gb' || allIntervals[tone - 1][0] === 'F') {
                questionNote = allIntervals[tone - 1][7] + (intervalOctave + 1).toString();
            };
        } else if (practiseIntervals[musicalInterval - 1] === 'm6') {
            console.log('m6');
            questionNote = allIntervals[tone - 1][8] + intervalOctave.toString();
            if (allIntervals[tone - 1][0] === 'B'|| allIntervals[tone - 1][0] === 'Bb' || allIntervals[tone - 1][0] === 'A' || allIntervals[tone - 1][0] === 'Ab' || allIntervals[tone - 1][0] === 'G' || allIntervals[tone - 1][0] === 'Gb' || allIntervals[tone - 1][0] === 'F' || allIntervals[tone - 1][0] === 'E') {
                questionNote = allIntervals[tone - 1][8] + (intervalOctave + 1).toString();
            };
        } else if (practiseIntervals[musicalInterval - 1] === 'M6') {
            console.log('M6');
            questionNote = allIntervals[tone - 1][9] + intervalOctave.toString();
            if (allIntervals[tone - 1][0] === 'B'|| allIntervals[tone - 1][0] === 'Bb' || allIntervals[tone - 1][0] === 'A' || allIntervals[tone - 1][0] === 'Ab' || allIntervals[tone - 1][0] === 'G' || allIntervals[tone - 1][0] === 'Gb' || allIntervals[tone - 1][0] === 'F' || allIntervals[tone - 1][0] === 'E' || allIntervals[tone - 1][0] === 'Eb') {
                questionNote = allIntervals[tone - 1][9] + (intervalOctave + 1).toString();
            };
        } else if (practiseIntervals[musicalInterval - 1] === 'm7') {
            console.log('m7');
            questionNote = allIntervals[tone - 1][10] + intervalOctave.toString();
            if (allIntervals[tone - 1][0] === 'B'|| allIntervals[tone - 1][0] === 'Bb' || allIntervals[tone - 1][0] === 'A' || allIntervals[tone - 1][0] === 'Ab' || allIntervals[tone - 1][0] === 'G' || allIntervals[tone - 1][0] === 'Gb' || allIntervals[tone - 1][0] === 'F' || allIntervals[tone - 1][0] === 'E' || allIntervals[tone - 1][0] === 'Eb' || allIntervals[tone - 1][0] === 'D') {
                questionNote = allIntervals[tone - 1][10] + (intervalOctave + 1).toString();
            };
        } else if (practiseIntervals[musicalInterval - 1] === 'M7') {
            console.log('M7');
            questionNote = allIntervals[tone - 1][11] + intervalOctave.toString();
            if (allIntervals[tone - 1][0] === 'B'|| allIntervals[tone - 1][0] === 'Bb' || allIntervals[tone - 1][0] === 'A' || allIntervals[tone - 1][0] === 'Ab' || allIntervals[tone - 1][0] === 'G' || allIntervals[tone - 1][0] === 'Gb' || allIntervals[tone - 1][0] === 'F' || allIntervals[tone - 1][0] === 'E' || allIntervals[tone - 1][0] === 'Eb' || allIntervals[tone - 1][0] === 'D' || allIntervals[tone - 1][0] === 'Db') {
                questionNote = allIntervals[tone - 1][11] + (intervalOctave + 1).toString();
            };
        } else if (practiseIntervals[musicalInterval - 1] === 'P8') {
            console.log('P8');
            questionNote = allIntervals[tone - 1][0] + (intervalOctave + 1).toString();
            referenceNote = allIntervals[tone -1][0] + intervalOctave.toString();
        } ; 

        setFirstNote(referenceNote);
        setSecondNote(questionNote);

        Tone.start();
        const now = Tone.now();
        const synth = new Tone.Synth().toDestination();

        if (settings.typeOfTraining === "asynchrone") {
            if (settings.ascending && settings.descending && order === 1) {
                synth.triggerAttackRelease(referenceNote, "4n", now);
                synth.triggerAttackRelease(questionNote, "2n", now + 0.5);
            } else if (settings.ascending && settings.descending && order === 2) {
                synth.triggerAttackRelease(questionNote, "4n", now);
                synth.triggerAttackRelease(referenceNote, "2n", now + 0.5);
            } else if (settings.ascending) {
                synth.triggerAttackRelease(referenceNote, "4n", now);
                synth.triggerAttackRelease(questionNote, "2n", now + 0.5);
            } else if (settings.descending) {
                synth.triggerAttackRelease(questionNote, "4n", now);
                synth.triggerAttackRelease(referenceNote, "2n", now + 0.5);
            };
        } else if (settings.typeOfTraining === "synchrone") {
            if (settings.ascending && settings.descending && order === 1) {
                const synth2 = new Tone.Synth().toDestination();
                synth.triggerAttackRelease(referenceNote, "2n", now);
                synth2.triggerAttackRelease(questionNote, "2n", now);
            } else if (settings.ascending && settings.descending && order === 2) {
                const synth2 = new Tone.Synth().toDestination();
                synth.triggerAttackRelease(questionNote, "2n", now);
                synth2.triggerAttackRelease(referenceNote, "2n", now);
            } else if (settings.ascending) {
                const synth2 = new Tone.Synth().toDestination();
                synth.triggerAttackRelease(referenceNote, "2n", now);
                synth2.triggerAttackRelease(questionNote, "2n", now);
            } else if (settings.descending) {
                const synth2 = new Tone.Synth().toDestination();
                synth.triggerAttackRelease(questionNote, "2n", now);
                synth2.triggerAttackRelease(referenceNote, "2n", now);
            };
        }
        
    }, [intervalOctave, musicalInterval, order, practiseIntervals, settings.ascending, settings.descending, settings.typeOfTraining, tone]);

    useEffect(() => {
        handlePlay();
    }, [musicalInterval, handlePlay]);

    useEffect(() => {
        setTimeout(() => {getNormalBackground()}, 1000);
    }, [background, getNormalBackground]);

    // Play each note seperate

    const playReferenceNote = () => {
        Tone.start();
        const now = Tone.now();
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease(firstNote, "4n", now);
    };

    const playQuestionNote = () => {
        Tone.start();
        const now = Tone.now();
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease(secondNote, "4n", now);
    };

    // Keep track of which interval you guess right and which one you geuss wrong.

    const scoreRight = () => {
        if (practiseIntervals[musicalInterval - 1] === 'm2') {
            let updatedScore = {...score, m2 : {right: score.m2.right + 1, total: score.m2.total + 1}};
            setScore(updatedScore);
        } else if (practiseIntervals[musicalInterval - 1] === 'M2') {
            let updatedScore = {...score, M2 : {right: score.M2.right + 1, total: score.M2.total + 1}};
            setScore(updatedScore);
        } else if (practiseIntervals[musicalInterval - 1] === 'm3') {
            let updatedScore = {...score, m3 : {right: score.m3.right + 1, total: score.m3.total + 1}};
            setScore(updatedScore);
        } else if (practiseIntervals[musicalInterval - 1] === 'M3') {
            let updatedScore = {...score, M3 : {right: score.M3.right + 1, total: score.M3.total + 1}};
            setScore(updatedScore);
        } else if (practiseIntervals[musicalInterval - 1] === 'P4') {
            let updatedScore = {...score, P4 : {right: score.P4.right + 1, total: score.P4.total + 1}};
            setScore(updatedScore);
        } else if (practiseIntervals[musicalInterval - 1] === 'tritone') {
            let updatedScore = {...score, tritone : {right: score.tritone.right + 1, total: score.tritone.total + 1}};
            setScore(updatedScore);
        } else if (practiseIntervals[musicalInterval - 1] === 'P5') {
            let updatedScore = {...score, P5 : {right: score.P5.right + 1, total: score.P5.total + 1}};
            setScore(updatedScore);
        } else if (practiseIntervals[musicalInterval - 1] === 'm6') {
            let updatedScore = {...score, m6 : {right: score.m6.right + 1, total: score.m6.total + 1}};
            setScore(updatedScore);
        } else if (practiseIntervals[musicalInterval - 1] === 'M6') {
            let updatedScore = {...score, M6 : {right: score.M6.right + 1, total: score.M6.total + 1}};
            setScore(updatedScore);
        } else if (practiseIntervals[musicalInterval - 1] === 'm7') {
            let updatedScore = {...score, m7 : {right: score.m7.right + 1, total: score.m7.total + 1}};
            setScore(updatedScore);
        } else if (practiseIntervals[musicalInterval - 1] === 'M7') {
            let updatedScore = {...score, M7 : {right: score.M7.right + 1, total: score.M7.total + 1}};
            setScore(updatedScore);
        } else if (practiseIntervals[musicalInterval - 1] === 'P8') {
            let updatedScore = {...score, P8 : {right: score.P8.right + 1, total: score.P8.total + 1}};
            setScore(updatedScore);
        };
    };

    const scoreWrong = () => {
        if (practiseIntervals[musicalInterval - 1] === 'm2') {
            let updatedScore = {...score, m2 : {right: score.m2.right, total: score.m2.total + 1}};
            setScore(updatedScore);
        } else if (practiseIntervals[musicalInterval - 1] === 'M2') {
            let updatedScore = {...score, M2 : {right: score.M2.right, total: score.M2.total + 1}};
            setScore(updatedScore);
        } else if (practiseIntervals[musicalInterval - 1] === 'm3') {
            let updatedScore = {...score, m3 : {right: score.m3.right, total: score.m3.total + 1}};
            setScore(updatedScore);
        } else if (practiseIntervals[musicalInterval - 1] === 'M3') {
            let updatedScore = {...score, M3 : {right: score.M3.right, total: score.M3.total + 1}};
            setScore(updatedScore);
        } else if (practiseIntervals[musicalInterval - 1] === 'P4') {
            let updatedScore = {...score, P4 : {right: score.P4.right, total: score.P4.total + 1}};
            setScore(updatedScore);
        } else if (practiseIntervals[musicalInterval - 1] === 'tritone') {
            let updatedScore = {...score, tritone : {right: score.tritone.right, total: score.tritone.total + 1}};
            setScore(updatedScore);
        } else if (practiseIntervals[musicalInterval - 1] === 'P5') {
            let updatedScore = {...score, P5 : {right: score.P5.right, total: score.P5.total + 1}};
            setScore(updatedScore);
        } else if (practiseIntervals[musicalInterval - 1] === 'm6') {
            let updatedScore = {...score, m6 : {right: score.m6.right, total: score.m6.total + 1}};
            setScore(updatedScore);
        } else if (practiseIntervals[musicalInterval - 1] === 'M6') {
            let updatedScore = {...score, M6 : {right: score.M6.right, total: score.M6.total + 1}};
            setScore(updatedScore);
        } else if (practiseIntervals[musicalInterval - 1] === 'm7') {
            let updatedScore = {...score, m7 : {right: score.m7.right, total: score.m7.total + 1}};
            setScore(updatedScore);
        } else if (practiseIntervals[musicalInterval - 1] === 'M7') {
            let updatedScore = {...score, M7 : {right: score.M7.right, total: score.M7.total + 1}};
            setScore(updatedScore);
        } else if (practiseIntervals[musicalInterval - 1] === 'P8') {
            let updatedScore = {...score, P8 : {right: score.P8.right, total: score.P8.total + 1}};
            setScore(updatedScore);
        }
    };

    // Functions that check if interval is correct.

    const minorSecond = () => {
        if (practiseIntervals[musicalInterval - 1] === 'm2') {
            getRandomInterval();
            getRandomTone();
            getRandomOctave();
            getRandomOrder();
            setBackground(rightTheme);
            scoreRight();
            const rightAnswer =  answers.right + 1;
            setAnswers({right: rightAnswer, wrong: answers.wrong});
        } else {
            setBackground(wrongTheme);
            scoreWrong();
            const wrongAnswer =  answers.wrong + 1;
            setAnswers({right: answers.right, wrong: wrongAnswer});
        }
    };

    const majorSecond = () => {
        if (practiseIntervals[musicalInterval - 1] === 'M2') {
            getRandomInterval();
            getRandomTone();
            getRandomOctave();
            getRandomOrder();
            setBackground(rightTheme);
            scoreRight();
            const rightAnswer =  answers.right + 1;
            setAnswers({right: rightAnswer, wrong: answers.wrong});
        } else {
            setBackground(wrongTheme);
            scoreWrong();
            const wrongAnswer =  answers.wrong + 1;
            setAnswers({right: answers.right, wrong: wrongAnswer});
        }
    };

    const minorThird = () => {
        if (practiseIntervals[musicalInterval - 1] === 'm3') {
            getRandomInterval();
            getRandomTone();
            getRandomOctave();
            getRandomOrder();
            setBackground(rightTheme);
            scoreRight();
            const rightAnswer =  answers.right + 1;
            setAnswers({right: rightAnswer, wrong: answers.wrong});
        } else {
            setBackground(wrongTheme);
            scoreWrong();
            const wrongAnswer =  answers.wrong + 1;
            setAnswers({right: answers.right, wrong: wrongAnswer});
        }
    };

    const majorThird = () => {
        if (practiseIntervals[musicalInterval - 1] === 'M3') {
            getRandomInterval();
            getRandomTone();
            getRandomOctave();
            getRandomOrder();
            scoreRight();
            const rightAnswer =  answers.right + 1;
            setAnswers({right: rightAnswer, wrong: answers.wrong});
            setBackground(rightTheme);
        } else {
            setBackground(wrongTheme);
            scoreWrong();
            const wrongAnswer =  answers.wrong + 1;
            setAnswers({right: answers.right, wrong: wrongAnswer});
        }
    };

    const perfectFourth = () => {
        if (practiseIntervals[musicalInterval - 1] === 'P4') {
            getRandomInterval();
            getRandomTone();
            getRandomOctave();
            getRandomOrder();
            scoreRight();
            setBackground(rightTheme);
            const rightAnswer =  answers.right + 1;
            setAnswers({right: rightAnswer, wrong: answers.wrong});
        } else {
            setBackground(wrongTheme);
            scoreWrong();
            const wrongAnswer =  answers.wrong + 1;
            setAnswers({right: answers.right, wrong: wrongAnswer});
        }
    };

    const tritone = () => {
        if (practiseIntervals[musicalInterval - 1] === 'tritone') {
            getRandomInterval();
            getRandomTone();
            getRandomOctave();
            getRandomOrder();
            scoreRight();
            setBackground(rightTheme);
            const rightAnswer =  answers.right + 1;
            setAnswers({right: rightAnswer, wrong: answers.wrong});
        } else {
            setBackground(wrongTheme);
            scoreWrong();
            const wrongAnswer =  answers.wrong + 1;
            setAnswers({right: answers.right, wrong: wrongAnswer});
        }
    };

    const fifth = () => {
        if (practiseIntervals[musicalInterval - 1] === 'P5') {
            getRandomInterval();
            getRandomTone();
            getRandomOctave();
            getRandomOrder();
            scoreRight();
            setBackground(rightTheme);
            const rightAnswer =  answers.right + 1;
            setAnswers({right: rightAnswer, wrong: answers.wrong});
        } else {
            setBackground(wrongTheme);
            scoreWrong();
            const wrongAnswer =  answers.wrong + 1;
            setAnswers({right: answers.right, wrong: wrongAnswer});
        }
    };

    const minorSixth = () => {
        if (practiseIntervals[musicalInterval - 1] === 'm6') {
            getRandomInterval();
            getRandomTone();
            getRandomOctave();
            getRandomOrder();
            scoreRight();
            setBackground(rightTheme);
            const rightAnswer =  answers.right + 1;
            setAnswers({right: rightAnswer, wrong: answers.wrong});
        } else {
            setBackground(wrongTheme);
            scoreWrong();
            const wrongAnswer =  answers.wrong + 1;
            setAnswers({right: answers.right, wrong: wrongAnswer});
        }
    };

    const majorSixth = () => {
        if (practiseIntervals[musicalInterval - 1] === 'M6') {
            getRandomInterval();
            getRandomTone();
            getRandomOctave();
            getRandomOrder();
            scoreRight();
            setBackground(rightTheme);
            const rightAnswer =  answers.right + 1;
            setAnswers({right: rightAnswer, wrong: answers.wrong});
        } else {
            setBackground(wrongTheme);
            scoreWrong();
            const wrongAnswer =  answers.wrong + 1;
            setAnswers({right: answers.right, wrong: wrongAnswer});
        }
    };

    const minorSeventh = () => {
        if (practiseIntervals[musicalInterval - 1] === 'm7') {
            getRandomInterval();
            getRandomTone();
            getRandomOctave();
            getRandomOrder();
            scoreRight();
            setBackground(rightTheme);
            const rightAnswer =  answers.right + 1;
            setAnswers({right: rightAnswer, wrong: answers.wrong});
        } else {
            setBackground(wrongTheme);
            scoreWrong();
            const wrongAnswer =  answers.wrong + 1;
            setAnswers({right: answers.right, wrong: wrongAnswer});
        }
    };

    const majorSeventh = () => {
        if (practiseIntervals[musicalInterval - 1] === 'M7') {
            getRandomInterval();
            getRandomTone();
            getRandomOctave();
            getRandomOrder();
            scoreRight();
            setBackground(rightTheme);
            const rightAnswer =  answers.right + 1;
            setAnswers({right: rightAnswer, wrong: answers.wrong});
        } else {
            setBackground(wrongTheme);
            scoreWrong();
            const wrongAnswer =  answers.wrong + 1;
            setAnswers({right: answers.right, wrong: wrongAnswer});
        }
    };

    const octave = () => {
        if (practiseIntervals[musicalInterval - 1] === 'P8') {
            getRandomInterval();
            getRandomTone();
            getRandomOctave();
            getRandomOrder();
            scoreRight();
            setBackground(rightTheme);
            const rightAnswer =  answers.right + 1;
            setAnswers({right: rightAnswer, wrong: answers.wrong});
        } else {
            setBackground(wrongTheme);
            scoreWrong();
            const wrongAnswer =  answers.wrong + 1;
            setAnswers({right: answers.right, wrong: wrongAnswer});
        };
    };

    const endSession = () => {
        localStorage.setItem('score', JSON.stringify({...score, ...answers}));
        console.log({...score, ...answers});
        history.push(ROUTES.INTERVALS_END_SESSION);
    };

    return  (
        <ThemeProvider theme={background}>
            <GlobalStyles/>
            <div className='intervals-container wrong'>
                <div className='played-notes'>
                    <div className='played-note' onClick={playReferenceNote} >
                        <h3>Reference note</h3>
                        <div>
                            <img src={soundIcon} alt='Sound icon' />
                        </div>
                    </div>
                    <div className='played-note' onClick={playQuestionNote} >
                        <h3>Question note</h3>
                        <div>
                            <img src={soundIcon} alt='Sound icon' />
                        </div>
                    </div>
                </div>
                <div className='play' onClick={handlePlay}>
                    <p>Play interval</p>
                    <img src={play} alt='playbutton' />
                </div>
                <div className='score'>
                    <div>
                        {answers.right}/{answers.wrong + answers.right}
                    </div>
                    <div>
                        <ProgressBar key={1} completed={(answers.right/(answers.wrong + answers.right))*100} />
                    </div>
                </div>
                <div className='answer-container'>
                    {
                        settings.m2 &&
                        <div onClick={minorSecond}>
                            <p>Minor Second</p>
                        </div>
                    }

                    {
                        settings.M2 &&
                        <div onClick={majorSecond}>
                            <p>Major Second</p>
                        </div>
                    }
                    {
                        settings.m3 &&
                        <div onClick={minorThird}>
                            <p>Minor Third</p>
                        </div>
                    }
                    {
                        settings.M3 &&
                        <div onClick={majorThird}>
                            <p>Major Third</p>
                        </div>
                    }
                    {
                        settings.P4 &&
                        <div onClick={perfectFourth}>
                            <p>Perfect Fourth</p>
                        </div>
                    }
                    {
                        settings.tritone &&
                        <div onClick={tritone}>
                            <p>Tritone</p>
                        </div>
                    }
                    {
                        settings.P5 &&
                        <div onClick={fifth}>
                            <p>Perfect Fifth</p>
                        </div>
                    }
                    {
                        settings.m6 &&
                        <div onClick={minorSixth}>
                            <p>Minor Sixth</p>
                        </div>
                    }
                    {
                        settings.M6 &&
                        <div onClick={majorSixth}>
                            <p>Major Sixth</p>
                        </div>
                    }
                    {
                        settings.m7 &&
                        <div onClick={minorSeventh}>
                            <p>Minor Seventh</p>
                        </div>
                    }
                    {
                        settings.M7 &&
                        <div onClick={majorSeventh}>
                            <p>Major Seventh</p>
                        </div>
                    }
                    {
                        settings.P8 &&
                        <div onClick={octave}>
                            <p>Octave</p>
                        </div>
                    } 
                </div>

                <div className='intervals-footer'>
                    <div className='icons-container'>
                        <Link to={ROUTES.INTERVALS_INFO}>                            
                            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="108" viewBox="0 0 38 108">
                                <text id="_" data-name="?" transform="translate(19 85)" fill="#ffb94e" fontSize="95" fontFamily="Baskerville"><tspan x="-18.81" y="0">?</tspan></text>
                            </svg>
                        </Link>

                        <Link to={ROUTES.INTERVAL_SETTINGS}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="58.234" height="60.832" viewBox="0 0 58.234 60.832">
                                <path id="cog-solid" d="M76.134,45.824l-5.225-3.017a23.624,23.624,0,0,0,0-8.61l5.225-3.017a1.482,1.482,0,0,0,.675-1.717,30.545,30.545,0,0,0-6.709-11.6,1.476,1.476,0,0,0-1.815-.282L63.06,20.6a23.146,23.146,0,0,0-7.457-4.3V10.27a1.469,1.469,0,0,0-1.153-1.435,30.832,30.832,0,0,0-13.393,0A1.469,1.469,0,0,0,39.9,10.27V16.3a23.876,23.876,0,0,0-7.457,4.3l-5.212-3.017a1.457,1.457,0,0,0-1.815.282,30.362,30.362,0,0,0-6.709,11.6,1.467,1.467,0,0,0,.675,1.717l5.225,3.017a23.624,23.624,0,0,0,0,8.61l-5.225,3.017a1.482,1.482,0,0,0-.675,1.717,30.545,30.545,0,0,0,6.709,11.6,1.476,1.476,0,0,0,1.815.282l5.225-3.017a23.146,23.146,0,0,0,7.457,4.3V66.76a1.469,1.469,0,0,0,1.153,1.435,30.832,30.832,0,0,0,13.393,0,1.469,1.469,0,0,0,1.153-1.435V60.726a23.876,23.876,0,0,0,7.457-4.3L68.3,59.438a1.457,1.457,0,0,0,1.815-.282,30.362,30.362,0,0,0,6.709-11.6A1.515,1.515,0,0,0,76.134,45.824Zm-28.38,2.49A9.812,9.812,0,1,1,57.566,38.5,9.825,9.825,0,0,1,47.754,48.314Z" transform="translate(-18.644 -8.099)" fill="#ffb94e"/>
                            </svg>
                        </Link>
                    </div>
                    <div onClick={endSession} className='end-session'>
                        <p>End session</p>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Intervals;