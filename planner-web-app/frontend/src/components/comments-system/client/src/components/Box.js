import React, {useState, useEffect, useRef} from 'react';
import List from './List'
import './Box.css';
import './comments-system.sass';
import axios from 'axios';
import io from 'socket.io-client'
import { PromiseProvider } from 'mongoose';

const SERVER = "http://localhost:5000";

function Box(props) {
    const [comments, setComments] = useState([]);
    const fetchData = useRef(() => {});

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
            fetchData.current();
        });
        return () => socket.disconnect();
    }, [props.data]);

    fetchData.current = () => {
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
            fetchData.current();
            e.target.name.value = "";
            e.target.message.value = "";
          })
      };

    const css = `.hide { position:absolute; top:-1px; left:-1px; width:1px; height:1px; }`
    return (
      <section className="column is-5-desktop" id="box">
                <iframe title="hiddenFrame" name="hiddenFrame" className="hide"></iframe>
              <form method="POST" id="form" target="hiddenFrame" onSubmit={handleSubmit}>
                  <input className="input" type="text" id="name" name="name" value={props.user.email} disabled></input>
                  <textarea className="textarea" id="message" name="message" placeholder="Add a comment..."></textarea>
              <section className="btn">
                  <button className="button is-primary">Submit</button>
              </section>
              </form>
          <section className="message is-primary">
              <List data={comments} />
              <style>{css}</style>
          </section>
          </section>
    );
}

export default Box;