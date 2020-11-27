import React, {useState, useEffect} from 'react';
import List from './List'
import './Box.css';
import './comments-system.sass';
import axios from 'axios';
import io from 'socket.io-client'

const SERVER = "http://localhost:5000";

function Box(props) {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        fetch('/comment/'+ props.data)
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
        fetch('/comment/' + props.data)
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
        axios.post('/comment/' + props.data, newComment, {
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
      <section class="column is-5-desktop" id="box">
          <section class="message is-primary">
              <section class="message-header has-text-weight-semibold">
              </section>
              <List data={comments} />
              <style>{css}</style>
              <iframe title="hiddenFrame" name="hiddenFrame" className="hide"></iframe>
              <form method="POST" id="form" target="hiddenFrame" onSubmit={handleSubmit}>
                  <input class="input" type="text" id="name" name="name" placeholder="Name"></input>
                  <textarea class="textarea" id="message" name="message" placeholder="Add a comment..."></textarea>
              <section className="btn">
                  <button class="button is-primary">Submit</button>
              </section>
              </form>
          </section>
          </section>
    );
}

export default Box;