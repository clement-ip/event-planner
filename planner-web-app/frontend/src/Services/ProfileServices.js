// Fetch requests for Profile Pages
export default {
    getProfile : profileID => {
        return fetch('http://localhost:5000/profile/' + profileID, {
            credentials : 'include',
        }).then( res => {
            if (res.status !== 401) {
                if (res.status === 500){
                    return res.json().then(({status, msg}) => {
                        return { isAuthenticated : true, msg, data: null, status };
                    });
                }
                else {
                    return res.json().then(({msg, data}) => {
                        return { isAuthenticated: true, msg, data};
                    })
                }
            }
            else {
                return { isAuthenticated : false, message : {
                            msgBody:"Not Authenticated",
                            msgError: true }, data: null
                        };
            }
        })
    },

    editProfile : profileData => {
        return fetch('http://localhost:5000/profile', {
            credentials : 'include',
            method : "post",
            body : JSON.stringify(profileData),
            headers : { 'Content-Type' : 'application/json' }
        })
        .then(res => {
            if (res.status !== 401) {
                if (res.status === 500) {
                    return res.json().then(({status, msg, err}) => {
                        return { isAuthenticated : false, msg,
                                 data : null, status, err
                                };
                    });
                }
                else{
                    return res.json().then(({msg, data}) => {
                        return { isAuthenticated : true, msg, data };
                    });
                }
            }
            else {
                return res.json().then((status, msg, error)=> {
                    return { isAuthenticated : false, message : {
                                msgBody : msg, msgError : true,
                                status, error }, data : null
                    };
                })
            }
        });
    },

    createProfile : createProfileData => {
        return fetch('http://localhost:5000/profile_create', {
            credentials : 'include',
            method : "post",
            body : JSON.stringify(createProfileData),
            headers : { 'Content-Type' : 'application/json' }
        })
        .then(res => {
            if (res.status !== 400) {
                if (res.status === 500) {
                    return res.json().then(({status, msg, error}) => {
                        return { isAuthenticated : false, msg,
                                 data : null, status, error};
                    });
                }
                return res.json().then(({msg}) => {
                    return { isAuthenticated : true, msg };
                });
            }
            else {
                return { isAuthenticated : false, message : {
                            msgBody : "Not Authenticated",
                            msgError : true }, data : null
                        };
            }
        });
    },

    profileDelete : deleteProfileData => {
        return fetch('http://localhost:5000/profile_delete', {
            credentials : 'include',
            method : "post",
            body : JSON.stringify(deleteProfileData),
            headers : { 'Content-Type' : 'application/json' }
        })
        .then(res => {
            if (res.status !== 400) {
                if (res.status === 500) {
                    return res.json().then(({status, msg, error}) =>{
                        return { isAuthenticated : false, msg,
                                 data : null, status, error}
                    });
                }
                return res.json().then(({msg}) => {
                    return { isAuthenticated : true, msg };
                });
            }
            else {
                return { isAuthenticated : false, message : {
                            msgBody : "Not Authenticated",
                            msgError : true }, data : null
                        };
            }
        });
    }
}