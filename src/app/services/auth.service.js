import React, {createContext, useContext, useState} from 'react';
import { apiConfig } from '../config';
import * as jwt from 'jsonwebtoken';


const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {

    const BASE_URL = 'http://178.62.244.184';

    const verifyUserFromLocalStorage = () => {
        if (JSON.parse(localStorage.getItem('mern:authUser'))) {
          try {
            const token = JSON.parse(localStorage.getItem('mern:authUser')).token;
            if (!token) {
              throw new Error('Token is not present on localstorage!');
            }
            const decoded = jwt.verify(token, 'nmd');
            if (!decoded) {
              throw new Error('Couldn\'t decode the token!');
            }
    
            if (decoded.exp > Date.now()) {
              throw new Error('Token is expired!')
            }
            return JSON.parse(localStorage.getItem('mern:authUser'));
          } catch (error) {
            return null;
          }
        }
        return null;
    }

    const [currentUser, setCurrentUser] = useState(verifyUserFromLocalStorage);

    const signIn = async (username, password) => {
        const url =`${BASE_URL}/wp-json/jwt-auth/v1/token`;

        const body = {
            username,
            password
        };

        const headers = {
            'Content-Type': 'application/json',
            'Accept':'*'
        };

        const options = {
            method: 'POST',
            mode:'cors',
            headers: headers,
            body: JSON.stringify(body),
        };

        const response = await fetch(`${url}`, options);
        const user = await response.json();
        
        if (response.status === 200) {
            localStorage.setItem('authUser', JSON.stringify(user));
            setCurrentUser(user);
        };
    
        return user;

    }

    const signUp = async (body) => {
        let url = `${BASE_URL}/wp-json/wp/v2/users/register`;

        const headers = {
            'Content-Type': 'application/json',
            'Accept':'*'
        };

        const options = {
            method: 'POST',
            mode:'cors',
            headers: headers,
            body: JSON.stringify(body),
        };

        const response = await fetch(`${url}`, options);
        const user = await response.json();
    
        signIn(body.username, body.password);
    
        return user;
      }

    const logout = async () => {
        localStorage.setItem('authUser', null);
        return true;
    }

    return (
        <AuthContext.Provider value={{currentUser, signIn, logout, signUp}} >
            {children}
        </AuthContext.Provider>
    );
}

export {
    AuthContext,
    AuthProvider,
    useAuth
}