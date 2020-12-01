export default {
    commentList : eventID => {
        return fetch('http://localhost:5000/comment/' + eventID, {
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
        return fetch('http://localhost:5000/comment', {
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
        return fetch('http://localhost:5000/comment/' + commentID, {
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
    }
}