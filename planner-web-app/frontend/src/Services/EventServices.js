export default {
    getAllEvents : () => {
        return fetch('http://localhost:5000/getAllEvents', {
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
        return fetch('http://localhost:5000/saveEvent', {
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
        return fetch('http://localhost:5000/getSingleEvent/' + eventID, {
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
        return fetch('http://localhost:5000/deleteEvent', {
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
    }
}