export default {
    join : data => {
        return fetch(`https://api.eyeson.team/rooms/?user[name]=${data.user}&id=${data.eventID}&options[exit_url]=${data.exit_url}`, {
            method : 'POST',
            headers : {
                Authorization : '***REMOVED***'
            }
        })
        .then(res => res.json());
        // .then(data => console.log(data)));
    }
}