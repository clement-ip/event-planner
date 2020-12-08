// Fetch requests for Profile Pages
const API_ADDR = process.env.NODE_ENV === 'production' ?
                    process.env.REACT_APP_API_ADDR_PRODUCTION :
                    process.env.REACT_APP_API_ADDR_DEV;

export default {
    getProfile : profileID => {
        // return fetch('http://35.247.19.51/profile/' + profileID, {
        return fetch(`${API_ADDR}/profile/${profileID}`, {
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
        // return fetch('http://35.247.19.51/profile', {
        return fetch(`${API_ADDR}/profile`, {
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
                    return res.json().then(({msg, data, status}) => {
                        return { isAuthenticated : true, msg, data, status };
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
        // return fetch('http://35.247.19.51/profile_create', {
        return fetch(`${API_ADDR}/profile_create`, {
            credentials : 'include',
            method : "post",
            body : JSON.stringify(createProfileData),
            headers : { 'Content-Type' : 'application/json' }
        })
        .then(res => {
            if (res.status !== 400) {
                if (res.status === 500) {
                    return res.json().then(({status, msg, error}) => {
                        return { isAuthenticated : false,
                                 message : { msgBody : error,
                                    status : status,
                                    extra_msg : msg,
                                    msgError : true,
                                 }, data : null,
                                };
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
        // return fetch('http://35.247.19.51/profile_delete', {
        return fetch(`${API_ADDR}/profile_delete`, {
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
    },

    addEventToUserProfile : body =>{
        // return fetch('http://35.247.19.51/addEventToUser', {
        return fetch(`${API_ADDR}/addEventToUser`, {
            credentials : 'include',
            method : "put",
            body : JSON.stringify(body),
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
                        return res.json().then(({msg, data, status}) => {
                            return { isAuthenticated : true, msg, data, status };
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

    addEventToHostProfile : body =>{
        console.log("HOST EVENT", body)
        // return fetch('http://35.247.19.51/addEventToHost', {
        return fetch(`${API_ADDR}/addEventToHost`, {
            credentials : 'include',
            method : "put",
            body : JSON.stringify(body),
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
                        return res.json().then(({msg, data, status}) => {
                            return { isAuthenticated : true, msg, data, status };
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

    deleteEventFromAttendeesHost : body =>{
        // return fetch('http://35.247.19.51/deleteEventFromAttendees', {
        return fetch(`${API_ADDR}/deleteEventFromAttendees`, {
            credentials : 'include',
            method : "put",
            body : JSON.stringify(body),
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
                        return res.json().then(({msg, data, status}) => {
                            return { isAuthenticated : true, msg, data, status };
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
}
