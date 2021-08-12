import React from 'react';
import {Footer, Header, /*Footer*/} from '../components';

const FooterLayOut = ({children}) => {
    return (
        <div className='page'>
            <Header/>
            <main className='page-main'>
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default FooterLayOut;