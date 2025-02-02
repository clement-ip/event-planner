import React, {useState, useEffect, useRef} from 'react';
import List from './List'
import './Box.css';
import './comments-system.sass';
import axios from 'axios';
import io from 'socket.io-client'
import { PromiseProvider } from 'mongoose';

import CommentServices from '../../../../../Services/CommentServices';

const API_ADDR = process.env.NODE_ENV === 'production' ?
                    process.env.REACT_APP_API_ADDR_PRODUCTION :
                    process.env.REACT_APP_API_ADDR_DEV;

const SERVER = `${API_ADDR}`;
const socket = io(SERVER, {transports: ['websocket']});

function Box(props) {
    const [comments, setComments] = useState([]);
    const fetchData = useRef(() => {});

    useEffect(() => {
      CommentServices.commentList(props.eventID)
      .then(({ message, data }) => {
        if(message.msgError) {
          console.log(message.msgBody);
        }
        else {
          setComments(data);
        }
      });

      socket.on('Comment', (msg) => {
          console.log('Socket received: ', msg);
          CommentServices.commentList(props.eventID)
          .then(({ message, data }) => {
            if(message.msgError)
              console.log(message.msgBody);
            else
              setComments(data);
          });
        });
        socket.on('DeleteComment', (msg) => {
          console.log('Socket received delete comment');
          CommentServices.commentList(props.eventID)
          .then(({ message, data }) => {
            if(message.msgError)
              console.log(message.msgBody);
            else
              setComments(data);
          });
      });
        // return () => socket.disconnect();
    }, [props.eventID]);

    fetchData.current = () => {
      console.log("fetchData called");
      CommentServices.commentList(props.eventID)
      .then(({ message, data }) => {
        if(message.msgError)
          console.log(message.msgBody);
        else {
          setComments(data);
        }
      });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newComment = {name: e.target.name.value, message: e.target.message.value, eventID: props.eventID, topLevel: true, replyLevel: false};
        console.log("New Comment: ", newComment);
        const socket = io(SERVER, {transports: ['websocket']});
        socket.emit('Comment', newComment);
        // Fetch call 2
        CommentServices.createComment(newComment)
          .then(response => {
            fetchData.current();
            e.target.name.value = "";
            e.target.message.value = "";
          })
      };

    function updateDeletedComment() {
      const socket = io(SERVER, {transports: ['websocket']});
      socket.emit('DeleteComment');
      fetchData.current();
    }

    const css = `.hide { position:absolute; top:-1px; left:-1px; width:1px; height:1px; }`
    return (
      <section className="column" id="box">
                <iframe title="hiddenFrame" name="hiddenFrame" className="hide"></iframe>
              <form method="POST" id="form" target="hiddenFrame" onSubmit={handleSubmit}>
                  <input className="input" type="text" id="name" name="name" value={props.user.email} disabled></input>
                  <textarea className="textarea" id="message" name="message" placeholder="Add a comment..."></textarea>
              <section className="btn">
                  <button className="button is-primary">Submit</button>
              </section>
              </form>
          <section className="message is-primary">
              <List data={comments} eventID={props.eventID} onUpdateDeletedComment={updateDeletedComment} fetchData={fetchData.current} currentUser={props.user.email}/>
              <style>{css}</style>
          </section>
          </section>
    );
}

export default Box;
