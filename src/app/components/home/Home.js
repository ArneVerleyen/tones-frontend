import React from 'react';
import {Link} from 'react-router-dom';
import * as Routes from '../../routes';
import img from '../../_static/images/header.png';

import './home.scss';

const Home = () => {
    return (
        <div className='home-container'>
            <div className='header-image-container'>
                <img src={img} alt='Header'/> 
            </div>
            <div className='header-container'>
                <div className='welcome-container'>
                    <h1>Welcome to Tones!</h1>
                    <p>
                        Tones is a progressive web app developed for musicians and music 
                        enthousiasts that want to train their hearing. By following our training path 
                        you'll awaken your hearing and learn to play by ear rather than by repeating scales.
                    </p>
                    <a href='#read-more'>learn more...</a>
                    
                </div>

            </div>
            <Link to={Routes.TRAINING} className='link-btn' >Start training</Link>

            <p id='read-more'>
                The advantages of eartraining for musciscians are that you'll learn to connect what you're hearing to music theory.
                This helps you intrepret music. Eartraining is essential for developping a better music perception, memory, understanding and discrimination.
                Tones provides a simple solution to help you train and track your progress. With the next exercises you can start eartraining.
            </p>
            <ul>
                <li><Link to={Routes.INTERVALS_INFO}>Intervals training asynchrone:</Link> With this excercise you'll learn to identify all musical intervals. You'll hear two notes and have to identify the interval between them.</li>
                <li><Link to={Routes.INTERVALS_INFO}>Intervals training synchrone:</Link> During this excercise the interval notes will be played in harmony the rest is the same as the intervals excercise.</li>
                <li><Link to={Routes.CHORDS_INFO}>Triad chords training:</Link> In this excercise you'll learn to identify triad chords. The excercise plays a chord and you'll have to identify the chord type.</li>
                <li><Link to={Routes.CHORDS_INFO}>Simple seventh chords training:</Link> This excercise is the same as the last one but with simple seven chords.</li>
                <li><Link to={Routes.CHORDS_INFO}>All chords:</Link> In this excercise you can select all triad and simple second chords to train with.</li>
            </ul>
            <p>
                By making an account you can easily track your progress.
            </p>
            <Link className='link-btn' to={Routes.AUTH_SIGN_UP}>Register</Link>
        </div>
    );
}

export default Home;