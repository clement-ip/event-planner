// Fetch requests to server endpoints

export default {
    login : user => {
        return fetch('http://35.247.19.51/login', {
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
        return fetch('http://35.247.19.51/register', {
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
        return fetch('http://35.247.19.51/logout', {
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
        return fetch('http://35.247.19.51/authenticated', {
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
