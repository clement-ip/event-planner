import React, {useState, useEffect} from 'react';
import List from './List'
import './Box.css';
import axios from 'axios';
import io from 'socket.io-client'

const SERVER = "http://localhost:5000";

function Box() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch('/comment')
        .then(response => response.json())
        .then(data => {
            console.log("Get response: ", data);
            setComments(data);
        })
        .catch(error => console.error(error));
        const socket = io(SERVER, {transports: ['websocket']});
        socket.on('Comment', (msg) => {
            console.log('Socket received: ', msg);
            fetchData();
        });
        return () => socket.disconnect();
    }, []);

    function fetchData() {
        // axios.get('/comment')
        //   .then(({data}) => this.setState({ comments: data}))
        //   .catch(e => console.log(e))
        fetch('/comment')
        .then(response => response.json())    // one extra step
        .then(data => {
          console.log("Get response: ", data);
          setComments(data)
        })
      }

    function handleSubmit(e) {
        e.preventDefault();
        const newComment = JSON.stringify({name: e.target.name.value, message: e.target.message.value});
        console.log("New Comment: ", newComment);
        const socket = io(SERVER, {transports: ['websocket']});
        socket.emit('Comment', newComment);
        axios.post('/comment', newComment, {
          headers: {
              'Content-Type': 'application/json',
              }
            }
          )
          .then(response => {
            fetchData();
            e.target.name.value = "";
            e.target.message.value = "";
          })
      };

    const css = `.hide { position:absolute; top:-1px; left:-1px; width:1px; height:1px; }`
    return (
        <section className="box">
            <h1>Comments</h1>
            <List data={comments} />
            <style>{css}</style>
            <iframe title="hiddenFrame" name="hiddenFrame" className="hide"></iframe>
            <form method="POST" id="form" target="hiddenFrame" onSubmit={handleSubmit}>
                <input type="text" id="name" name="name" placeholder="Name" ></input>
                <input type="text" id="message" name="message" placeholder="Message"></input><br></br>
            <section className="btn">
                <input className="btn btn-primary" type="submit" value="Submit"></input>
            </section>
            </form>
        </section>
    );
}

export default Box;