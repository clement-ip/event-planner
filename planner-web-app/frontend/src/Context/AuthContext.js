import React, {createContext, useState, useEffect} from 'react';
import AuthServices from '../Services/AuthServices';

/*
    Uses the context API to set global state for Authentication
    Used to validate if a user is authenticated
*/

// returns a context api provider and consumer. Any component wrapped around provider has access
// to AuthContext global state
export const AuthContext = createContext();

// Children are the components which will be wrapped 
export default ({ children }) => {
    // states
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        AuthServices.isAuthenticated().then(data => {
            console.log(data)
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        })
    }, [])

    return (
        <div>
            { !isLoaded ? <h1>Loading</h1> :
            <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated}}>
                { children }
            </AuthContext.Provider>}
        </div>
    )
}