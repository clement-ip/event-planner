import React, { useContext } from "react";
import './Comment.css';
import './comments-system.sass';
import CommentServices from '../../../../../Services/CommentServices';
import { AuthContext } from '../../../../../../src/Context/AuthContext';

function Comment(props) {
    const { user } = useContext(AuthContext);
    function showDelete() {
        console.log("User: ", user.email);
        if (user.email === props.user) {
            return true;
        }
        return false;
    }

    function handleDelete() {
        props.onUpdateDeletedComment();
        CommentServices.deleteComment(props.commentId)
        .then(response => {
            console.log(response);
        })
    }

    return (
        <section className="comment">
            <section className="user-date">
                <strong>{props.user}</strong> <small>{props.date}</small>
                {showDelete() ? <button className="button is-danger is-small is-rounded" onClick={handleDelete}>Delete</button> : ''}
            </section>
            <section className="comment">
            <p>
                {props.children}
            </p>
            </section>
        </section>
    );
}

export default Comment;