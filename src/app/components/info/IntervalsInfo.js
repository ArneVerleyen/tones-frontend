import React from 'react';
import './intervalsInfo.scss';
import { useHistory } from 'react-router';
import * as Tone from 'tone';
import m2 from '../../_static/icons/intervals/mi2.png';
import M2 from '../../_static/icons/intervals/M2.png';
import mi3 from '../../_static/icons/intervals/mi3.png';
import M3 from '../../_static/icons/intervals/M3.png';
import P4 from '../../_static/icons/intervals/P4.png';
import tritone from '../../_static/icons/intervals/tritone.png';
import P5 from '../../_static/icons/intervals/P5.png';
import mi6 from '../../_static/icons/intervals/mi6.png';
import M6 from '../../_static/icons/intervals/M6.png';
import mi7 from '../../_static/icons/intervals/mi7.png';
import M7 from '../../_static/icons/intervals/M7.png';
import P8 from '../../_static/icons/intervals/P8.png';

const IntervalsInfo = () => {

    let history = useHistory();

    const goBack = () => {
        history.goBack();
    };

    const playInterval = (interval) => {

        let scale = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B', 'C'];

        const now = Tone.now();
        const synth = new Tone.Synth().toDestination();
    
        synth.triggerAttackRelease( 'C4',"4n", now);
        synth.triggerAttackRelease( `${scale[interval]}4`,"2n", now + 0.5);

    }
    const playOctave = (interval) => {

        const now = Tone.now();
        const synth = new Tone.Synth().toDestination();
    
        synth.triggerAttackRelease( 'C4',"4n", now);
        synth.triggerAttackRelease( 'C5',"2n", now + 0.5);

    }



    return (
        <div className='intervals-info'>
            <h3>Intervals training</h3>
            <p>
                Intervals training is the beginning of eartraining. An interval is the difference in pitch between two notes.
                 The smallest interval is a semitone. We name intervals in three ways: the distance, the quality and is it harmonic or melodic.
                 The main intervals used in western music are:
            </p>
            <div>
               
                <img src={m2} onClick={() => playInterval(1)} alt='minor second' />
                <p>1: Minor second</p>

                <img src={M2} onClick={() => playInterval(2)} alt='major second' />
                <p>2: Major second</p>

                <img src={mi3} onClick={() => playInterval(3)} alt='minor third' />
                <p>3: Minor third</p>

                <img src={M3} onClick={() => playInterval(4)} alt='major thirds' />
                <p>4: Major third</p>

                <img src={P4} onClick={() => playInterval(5)} alt='Perfect fourth' />
                <p>5: Perfect fourth</p>

                <img src={tritone} onClick={() => playInterval(6)} alt='Tritone' />
                <p>6: Tritone</p>

                <img src={P5} onClick={() => playInterval(7)} alt='Perfect fifth' />
                <p>7: Perfect fifth</p>

                <img src={mi6} onClick={() => playInterval(8)} alt='Minor sixth' />
                <p>8: Minor sixth</p>

                <img src={M6} onClick={() => playInterval(9)} alt='Major sixth' />
                <p>9: Major sixth</p>

                <img src={mi7} onClick={() => playInterval(10)} alt='Minor seventh' />
                <p>10: Minor seventh</p>

                <img src={M7} onClick={() => playInterval(11)} alt='Major seventh' />
                <p>11: Major seventh</p>

                <img src={P8} onClick={playOctave} alt='Perfect octave' />
                <p>12: Perfect octave</p>
            </div>

            <p>
                Intervals are the foundation of music. The larger an interval is the greater the difference in pitch is and vice versa. 
                By learning all musical intervals you'll start to awaken your ears. Once you know all intervals asynchrone start training them synchrone or in harmony. 
                If you have trouble learning the intervals it may help to sing them too. Intervals training is the first step in eartraining the next one is the triad chords. 
                During this excercise you'll hear a musical interval and then need to identify the interval. The best way to practice is by starting with three intervals: 
                major third, perfect fifth and the octave. Practise daily to progress fast and add intervals from there. 
            </p>

            <div className ='back' onClick={goBack}>Back</div>
        </div>
    );
}

export default IntervalsInfo