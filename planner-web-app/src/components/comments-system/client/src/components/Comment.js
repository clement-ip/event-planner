import React from 'react'
import './Comment.css';

function Comment(props) {
    return (
        <section className="comment">
            <h3 className="commentUser">
                {props.user}
            </h3>
            <p className="commentDate">
                {props.date}
            </p>
            <p>
                {props.children}
            </p>
        </section>
    );
}

export default Comment;