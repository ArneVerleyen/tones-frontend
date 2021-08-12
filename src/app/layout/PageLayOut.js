import React from 'react';
import {Header, /*Footer*/} from '../components';

const PageLayOut = ({children}) => {
    return (
        <div className='page'>
            <Header/>
            <main className='page-main'>
                {children}
            </main>
        </div>
    );
};

export default PageLayOut;