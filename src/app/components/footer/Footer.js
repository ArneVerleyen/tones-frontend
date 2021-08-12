import React from 'react';
import banner from '../../_static/images/tones.png';
import './footer.scss';
import artevelde from '../../_static/images/ARTEVELDE_hs_logo RGB.svg';

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='image-container'>
                <img src={artevelde} alt='artevelde' />
                <img src={banner} alt='Tones banner' />
            </div>
        </div>
    );
};

export default Footer;