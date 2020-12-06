const API_ADDR = process.env.NODE_ENV === 'production' ?
                    process.env.REACT_APP_API_ADDR_PRODUCTION :
                    process.env.REACT_APP_API_ADDR_DEV;

export default {
    commentList : eventID => {
        // return fetch('http://35.247.19.51/comment/' + eventID, {
        return fetch(`${API_ADDR}/comment/${eventID}`, {
            credentials : 'include'
        })
            .then(res => {
                if(res.status !== 401) {
                    if (res.status === 500)
                        return res.json().then(({ message }) => {
                           return { isAuthenticated : true, message, data : null};
                        });
                    else
                        return res.json().then(({ message, data }) => {
                            return { isAuthenticated: true, message, data};
                        });
                }
                else
                    return { isAuthenticated : false, message : { msgBody : "Not Authenticated", msgError : true}, data : null};
            });
    },
    createComment : commentData => {
        // return fetch('http://35.247.19.51/comment', {
        return fetch(`${API_ADDR}/comment`, {
            credentials : 'include',
            method : "post",
            body : JSON.stringify(commentData),
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
    deleteComment : commentID => {
        // return fetch('http://35.247.19.51/comment/' + commentID, {
        return fetch(`${API_ADDR}/comment/${commentID}`, {
            credentials : 'include',
            method : "delete",
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
    replyList : topLevelID => {
        // return fetch('http://35.247.19.51/comment/' + topLevelID + '/replies', {
        return fetch(`${API_ADDR}/comment/${topLevelID}/replies`, {
            credentials : 'include'
        })
            .then(res => {
                if(res.status !== 401) {
                    if (res.status === 500)
                        return res.json().then(({ message }) => {
                           return { isAuthenticated : true, message, data : null};
                        });
                    else
                        return res.json().then(({ message, data }) => {
                            return { isAuthenticated: true, message, data};
                        });
                }
                else
                    return { isAuthenticated : false, message : { msgBody : "Not Authenticated", msgError : true}, data : null};
            });
    }
}
