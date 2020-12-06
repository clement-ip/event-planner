// Fetch requests to server endpoints

const API_ADDR = process.env.NODE_ENV === 'production' ?
                    process.env.REACT_APP_API_ADDR_PRODUCTION :
                    process.env.REACT_APP_API_ADDR_DEV;

export default {
    login : user => {
        // return fetch('http://35.247.19.51/login', {
        return fetch(`${API_ADDR}/login`, {
            credentials : 'include',
            method : "post",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
            .then(res => {
                if(res.status !== 401)
                    return res.json().then(data => data);
                else
                    return { isAuthenticated : false, user : { email : "" }};
            });
    },
    register : user => {
        // return fetch('http://35.247.19.51/register', {
        return fetch(`${API_ADDR}/register`, {
            method : "post",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => data);
    },
    logout : () => {
        // return fetch('http://35.247.19.51/logout', {
        return fetch(`${API_ADDR}/logout`, {
            credentials : 'include'
        })
            .then(res => {
                if(res.status !== 401)
                    return res.json().then(data => data);
                else
                    return { user: { email : "" }, success : false };
            })
    },
    isAuthenticated : () => {
        // return fetch('http://35.247.19.51/authenticated', {
        return fetch(`${API_ADDR}/authenticated`, {
            credentials : 'include'
        })
            .then(res => {
                if(res.status !== 401)
                    return res.json().then(data => data);
                else
                    return { isAuthenticated : false, user : { email : ""}};
            });
    }
}
