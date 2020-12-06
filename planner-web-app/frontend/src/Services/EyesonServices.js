export default {
    join : data => {
        // return fetch(`https://api.eyeson.team/rooms/?user[name]=${data.user}&id=${data.eventID}&options[exit_url]=${data.exit_url}`, {
        return fetch(`${process.env.REACT_APP_EYES_ON_API}/?user[name]=${data.user}&id=${data.eventID}&options[exit_url]=${data.exit_url}`, {
            method : 'POST',
            headers : {
                // Authorization : 'ZaaVD7oZaOXi55cNtSBmwRV0NJxJWRgLJnQUJOTddt'
                Authorization : `${process.env.REACT_APP_EYES_ON_API_AUTH}`
            }
        })
        .then(res => res.json());
        // .then(data => console.log(data)));
    }
}