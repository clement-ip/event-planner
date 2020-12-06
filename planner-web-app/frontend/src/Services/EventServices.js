const API_ADDR = process.env.NODE_ENV === 'production' ?
                    process.env.REACT_APP_API_ADDR_PRODUCTION :
                    process.env.REACT_APP_API_ADDR_DEV;

export default {
    getAllEvents : () => {
        // return fetch('http://35.247.19.51/getAllEvents', {
        return fetch(`${API_ADDR}/getAllEvents`, {
            credentials : 'include'
        })
            .then(res => {
                if(res.status !== 401) {
                    if (res.status === 500)
                        return res.json().then(({ message }) => {
                        return { isAuthenticated : true, message, data : null};
                        });
                    else
                        return res.json().then(({ message, eventsData }) => {
                            return { isAuthenticated: true, message, eventsData};
                        });
                }
                else
                    return { isAuthenticated : false, message : { msgBody : "Not Authenticated", msgError : true}, data : null};
            });
    },
    saveEvent : eventData => {
        // return fetch('http://35.247.19.51/saveEvent', {
        return fetch(`${API_ADDR}/saveEvent`, {
            credentials : 'include',
            method : 'post',
            body : JSON.stringify(eventData),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
            .then(res => {
                if(res.status !== 401)
                    return res.json().then(({ message }) => {
                        return { isAuthenticated : true, message };
                    });
                else
                    return { isAuthenticated : false, message : { msgBody : "Not Authenticated", msgError : true}};
            });
    },
    getSingleEvent : eventID => {
        // return fetch('http://35.247.19.51/getSingleEvent/' + eventID, {
        return fetch(`${API_ADDR}/getSingleEvent/${eventID}`, {
            credentials : 'include',
        })
            .then(res => {
                if(res.status !== 401) {
                    if (res.status === 500)
                        return res.json().then(({ message }) => {
                        return { isAuthenticated : true, message, data : null};
                        });
                    else
                        return res.json().then(({ message, eventData }) => {
                            return { isAuthenticated: true, message, eventData};
                        });
                }
                else
                    return { isAuthenticated : false, message : { msgBody : "Not Authenticated", msgError : true}, data : null};
            });
    },
    deleteEvent : eventID => {
        // return fetch('http://35.247.19.51/deleteEvent', {
        return fetch(`${API_ADDR}/deleteEvent`, {
            credentials : 'include',
            method : 'DELETE',
            body : JSON.stringify(eventID),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
            .then(res => {
                if(res.status !== 401)
                    return res.json().then(({ message }) => {
                        return { isAuthenticated : true, message };
                    });
                else
                    return { isAuthenticated : false, message : { msgBody : "Not Authenticated", msgError : true}};
            });
    },
    editEvent : eventData => {
        // return fetch('http://35.247.19.51/editEvent', {
        return fetch(`${API_ADDR}/editEvent`, {
            credentials : 'include',
            method : 'put',
            body : JSON.stringify(eventData),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
            .then(res => {
                if(res.status !== 401)
                    return res.json().then(({ message }) => {
                        return { isAuthenticated : true, message };
                    });
                else
                    return { isAuthenticated : false, message : { msgBody : "Not Authenticated", msgError : true}};
            });
    },
    searchEvent : eventName => {
        // return fetch('http://35.247.19.51/search/' + eventName, {
        return fetch(`${API_ADDR}/search/${eventName}`, {
            credentials : 'include',
        })
            .then(res => {
                if(res.status !== 401){
                    return res.json().then(({ message, data}) => {
                        return { isAuthenticated : true, message, data };
                    });
                }
                else
                    return { isAuthenticated : false, message : { msgBody : "Not Authenticated", msgError : true}};
            });
    },

    addAttendeeToEvent : body =>{
        return fetch('http://localhost:5000/addAttendeeToEvent', {
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
