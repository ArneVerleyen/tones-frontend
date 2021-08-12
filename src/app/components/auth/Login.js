import React, { useState } from 'react';
import './login.scss';
import { useAuth } from '../../services';
import { useHistory } from 'react-router';
import * as Routes from '../../routes';

const Login = () => {

    const { signIn } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [ wrongCredentials, setWrongCredentials ] = useState();
    let history =  useHistory();

    const handleLogin = async (ev) => {
        ev.preventDefault();
        const user = await signIn(username, password);
        if (user.status !== 200 ) {
            setWrongCredentials(true);
        };
        if (localStorage.getItem('authUser') !== 'null'){
            history.push(Routes.TRAINING);
        };
    };

    return (
        <div className='login-container'>
            <h1>Login</h1>

            <div>
                <p>E-mail or Username</p>
                <input type='text' placeholder='e-mail' name='email' id='email' onChange={(ev) => setUsername(ev.target.value)} />

                <p>Password</p>
                <input type='password' placeholder='password' name='password' id='password' onChange={(ev) => setPassword(ev.target.value)} />

            </div>

            { wrongCredentials &&
                <div className='wrong'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="70.47" height="108" viewBox="0 0 106 108">
                        <g id="Group_14" data-name="Group 14" transform="translate(478 -1968)">
                            <g id="Ellipse_5" data-name="Ellipse 5" transform="translate(-478 1970)" fill="none" stroke="#470047" strokeWidth="8">
                            <circle cx="53" cy="53" r="53" stroke="none"/>
                            <circle cx="53" cy="53" r="49" fill="none"/>
                            </g>
                            <text id="_" data-name="!" transform="translate(-425 2053)" fill="#470047" fontSize="95" fontFamily="Baskerville"><tspan x="-11.875" y="0">!</tspan></text>
                        </g>
                        </svg>
                        <div className='wrong'>Wrong credentials</div>
                </div>
            }

            <button onClick={handleLogin}>Login</button>


            
        </div>
    );
}

export default Login;