import React from 'react';
import Comment from './Comment';
import './List.css';
import './comments-system.sass';

function List(props) {
    const onUpdateDeletedComment = props.onUpdateDeletedComment;
    const fetchData = props.fetchData;
    var commentNodes = props.data.map((comment) => (
        <Comment user={comment.name} date={comment.time} key={comment._id} commentID={comment._id} eventID={comment.eventID} message={comment.message} onUpdateDeletedComment={onUpdateDeletedComment} fetchData={fetchData}>
            <li className="list-group-item">{comment.message}</li>
        </Comment>
    ));
    return (
        <section className="message-body">
            <section className="list">
                <ul className="block-list">
                    {commentNodes}
                </ul>
            </section>
        </section>
    );
}

export default List;