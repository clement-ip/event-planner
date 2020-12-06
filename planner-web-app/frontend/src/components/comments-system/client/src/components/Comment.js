import React, { useContext, useState, useEffect } from "react";
import './Comment.css';
import './comments-system.sass';
import CommentServices from '../../../../../Services/CommentServices';
import { AuthContext } from '../../../../../../src/Context/AuthContext';
import io from 'socket.io-client'

const SERVER = "http://35.247.19.51";
const socket = io(SERVER, {transports: ['websocket']});

function Comment(props) {
    const { user } = useContext(AuthContext);
    const [showReplies, setRepliesState] = React.useState(false);
    const [replies, setReplies] = React.useState([]);

    useEffect(() => {
        console.log("CommentID: ", props.commentID);
        CommentServices.replyList(props.commentID)
        .then(({ message, data }) => {
          if(message.msgError) {
            console.log(message.msgBody);
          }
          else {
            console.log("DATA: ", data);
            setReplies(data);
          }
        });

        socket.on('Comment', (msg) => {
            console.log('Socket received: ', msg);
            CommentServices.replyList(props.commentID)
            .then(({ message, data }) => {
              if(message.msgError)
                console.log(message.msgBody);
              else
                setReplies(data);
            });
          });

          socket.on('DeleteComment', (msg) => {
            console.log('Socket received delete comment');
            CommentServices.replyList(props.commentID)
            .then(({ message, data }) => {
              if(message.msgError)
                console.log(message.msgBody);
              else
                setReplies(data);
            });
        });
    }, [props.commentID]);

    var replyNodes = replies.map(function (reply) {
        function showDeleteReplies() {
            if (user.email === reply.name || user.email === "admin@email.com") {
                return true;
            }
            return false;
        }
        return (
            <section className="reply-node" key={reply._id}>
                <section className="reply-user-date">
                    <strong>{reply.name}</strong> <small>{reply.time}</small>
                    {showDeleteReplies() ? <button className="delete-btn" onClick={() => handleDelete(reply._id)}><strong id="label">Delete</strong></button> : ''}
                </section>
                <li>
                    <p>{reply.message}</p>
                </li>
            </section>
        );
    });

    function handleSubmit(e) {
        e.preventDefault();
        console.log(e.target.message.value);
        console.log("PROPS: ", props);

        const newComment = {name: props.currentUser, message: e.target.message.value, eventID: props.eventID, topLevel: false, replyLevel: true, topLevelID: props.commentID};
        console.log("New Comment: ", newComment);
        const socket = io(SERVER, {transports: ['websocket']});
        socket.emit('Comment', newComment);
        // Fetch call 2
        CommentServices.createComment(newComment)
          .then(response => {
            props.fetchData();
            e.target.message.value = "";
          })
      };

    const onClick = () => {setRepliesState(!showReplies);console.log("REPLIES: ", replies)}
    const Replies = () => (
        <section className="replies">
            <ul className="reply-list">
                {replyNodes}
            </ul>
            <iframe title="hiddenFrame" name="hiddenFrame" className="hide"></iframe>
            <form method="POST" id="form" target="hiddenFrame" onSubmit={handleSubmit}>
                  <textarea className="textarea" id="message" name="message" placeholder="Add a comment..."></textarea>
              <section className="btn">
                  <button className="button is-primary">Submit</button>
              </section>
              </form>
        </section>
    )

    function showDelete() {
        if (user.email === props.user || user.email === "admin@email.com") {
            return true;
        }
        return false;
    }

    function handleDelete(commentID) {
        props.onUpdateDeletedComment();
        CommentServices.deleteComment(commentID)
        .then(response => {
            console.log(response);
        })
    }

    return (
        <section className="comment">
            <section className="user-date">
                <strong>{props.user}</strong> <small>{props.date}</small>
                {showDelete() ? <button className="delete-btn" onClick={() => handleDelete(props.commentID)}><strong id="label">Delete</strong></button> : ''}
                <button className="reply-btn" onClick={onClick}><strong id="label">Reply ({replies.length})</strong></button>
            </section>
            <section className="comment">
            <p>
                {props.children}
            </p>
            </section>
            <section className="reply-list">
            { showReplies ? <Replies /> : null}
            </section>
        </section>
    );
}

export default Comment;
