import React from 'react'
import './Comment.css';
import './comments-system.sass';

function Comment(props) {
    return (
        <section className="comment">
            <section className="user-date">
                <strong>{props.user}</strong> <small>{props.date}</small>
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