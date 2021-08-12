import React, { useState } from 'react';
import './register.scss';
import { useAuth } from '../../services';
import { useHistory } from 'react-router';
import * as Routes from '../../routes';

const Register = () => {

    const { signUp } = useAuth();
    const [body, setBody] = useState({
        username: '',
        password: '',
        email: '',
        role: 'user'
    });

    let history = useHistory();

    const register = async (ev) => {
        ev.preventDefault();
        const user = await signUp(body);

        if (user) {
            history.push(Routes.TRAINING);
        };
    };

    const handleInputChange = (ev) => {
        setBody({
          ...body,
          [ev.target.name]: ev.target.value
        });
    };

    return (
        <div className='register-container'>
            <h1>Register</h1>

            <div>
                <p>E-mail</p>
                <input type='text' placeholder='e-mail' name='email' id='email' onChange={handleInputChange} />

                <p>Username</p>
                <input type='text' placeholder='username' name='username' id='firstname' onChange={handleInputChange} />

                {/*
                <p>Lastname</p>
                <input type='text' placeholder='lastname' name='lastname' id='lastname' onChange={handleInputChange} />
                */}

                <p>Password</p>
                <input type='password' placeholder='password' name='password' id='password' onChange={handleInputChange} />

            </div>

            <button onClick={register} >Register</button>
            
        </div>
    );
}

export default Register;