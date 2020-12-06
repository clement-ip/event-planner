export default {
    join : data => {
        // return fetch(`https://api.eyeson.team/rooms/?user[name]=${data.user}&id=${data.eventID}&options[exit_url]=${data.exit_url}`, {
        return fetch(`${process.env.REACT_APP_EYES_ON_API}/?user[name]=${data.user}&id=${data.eventID}&options[exit_url]=${data.exit_url}`, {
            method : 'POST',
            headers : {
                // Authorization : '***REMOVED***'
                Authorization : `${process.env.REACT_APP_EYES_ON_API_AUTH}`
            }
        })
        .then(res => res.json());
    },
    get : data => {
        return fetch(`https://api.eyeson.team/rooms/${data.sessionAccessKey}?user[name]=${data.user}`, {
            method : 'GET',
            headers : {
                Authorization : '***REMOVED***'
            }
        })
        .then(res => res.json());
    }
}