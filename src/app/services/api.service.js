import { default as React, useContext, createContext } from 'react';

// import { apiConfig } from '../config';

const ApiContext = createContext();
const useApi = () => useContext(ApiContext);

const ApiProvider = ({children}) => {
    const BASE_URL = 'http://178.62.244.184';

    console.log(BASE_URL)

    const findAllSessions = async (query = null) => {
        let url = `${BASE_URL}/wp-json/wp/v2/session`;
        if (query !== 0) {
            url = url + `/?page=${query}`;
        };
        const response = await fetch(url);
        return response.json();
    };

    const findAllSessionsWithUserId = async (query = null, userId) => {
        let url = `${BASE_URL}/wp-json/wp/v2/session/?user_id=${userId}`;
        if (query !== 0) {
            url = url + `&page=${query}`;
        };
        const response = await fetch(url);
        console.log(response)
        return response.json();
    };

    const storeSession = async (body, token) => {
        const options = {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer'+ token
          },
          body: JSON.stringify(body)
        };
    
        let url = `${BASE_URL}/wp-json/wp/v2/session`;
        const response = await fetch(url, options);
        return response.json();
    };

    const getSessionById = async (sessionId) => {
        let url = `${BASE_URL}/wp-json/wp/v2/session/${sessionId}`;
        const response = await fetch(url);
        return response.json();
    };

    // Chords

    const storeChordSession = async (body, token) => {
        const options = {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer'+ token
          },
          body: JSON.stringify(body)
        };
    
        let url = `${BASE_URL}/wp-json/wp/v2/chord_session`;
        const response = await fetch(url, options);
        return response.json();
    };

    const findAllChordSessionsWithUserId = async (query = null, userId) => {
        let url = `${BASE_URL}/wp-json/wp/v2/chord_session/?user_id=${userId}`;
        if (query !== 0) {
            url = url + `&page=${query}`;
        };
        const response = await fetch(url);
        return response.json();
    };

    const getChordSessionById = async (sessionId) => {
        let url = `${BASE_URL}/wp-json/wp/v2/chord_session/${sessionId}`;
        const response = await fetch(url);
        return response.json();
    };

    return (
        <ApiContext.Provider value={{
            findAllSessions,
            storeSession,
            findAllSessionsWithUserId,
            getSessionById,
            storeChordSession,
            findAllChordSessionsWithUserId,
            getChordSessionById
        }}>
            {children}
        </ApiContext.Provider>
    );
};

export {
    ApiContext,
    ApiProvider,
    useApi
};