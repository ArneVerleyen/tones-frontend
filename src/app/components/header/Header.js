import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router';
import * as Routes from '../../routes';
import { useAuth } from '../../services';

import desktopHeader from '../../_static/images/tones.png';

import './header.scss';

import hamburger from '../../_static/icons/hamburger.svg';
import logo from '../../_static/images/tones_app.png';
import close from '../../_static/icons/close.svg';

const Header = () => {

    const [open, setOpen] = useState(false);
    const toggleTrue = () => setOpen(true);
    const toggleFalse = () => setOpen(false);

    let history = useHistory();

    const { logout } = useAuth();

    const handleLogout = async () => {
        logout();
        history.push(Routes.LANDING);
    };

    let user = JSON.parse(localStorage.getItem('authUser'));

    return (
        <header className='header-container'>
            <div className='header-inner-container'>
                <Link to={Routes.HOME}>
                    <img src={logo} className='a-logo' alt='Tones logo' />
                </Link>
                <div id='hide'>
                    {!open &&
                        <button onClick={toggleTrue}>
                            <img src={hamburger} alt='click here'/>
                        </button>
                    }
                    {open &&
                        <div>
                            <button onClick={toggleFalse}>
                                <img src={close} alt='click here' />
                            </button>
                        </div>
                    }
                </div>
                <div id='desktop-links'>
                    <ul>
                    <Link onClick={toggleFalse} to={Routes.TRAINING}>Training</Link>
                    {!user && <Link onClick={toggleFalse} to={Routes.AUTH_SIGN_IN}>Login</Link>}
                    {!user && <Link onClick={toggleFalse} to={Routes.AUTH_SIGN_UP}>Register</Link>}
                    {user && <Link onClick={toggleFalse} to={Routes.USER_SESSIONS}>Progress</Link>}
                    {user && <button  onClick={handleLogout}>Logout</button>}
                    </ul>
                </div>

            </div>
            <div id='desktop-header'>
                <Link to={Routes.HOME}>
                    <img src={desktopHeader} className='a-logo' alt='Tones logo' />
                </Link>
                alo
            </div>
            {open &&
                <div className='nav-links'>
                    <Link to={Routes.TRAINING}>Training</Link>

                    {!user && <Link to={Routes.AUTH_SIGN_IN}>Login</Link>}
                    {!user && <Link to={Routes.AUTH_SIGN_UP}>Register</Link>}
                    {user && <Link to={Routes.USER_SESSIONS}>Progress</Link>}
                    {user && <button onClick={handleLogout}>Logout</button>}

                </div>
            }
        </header>
    );
};

export default Header;

