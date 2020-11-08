import React, {Component} from 'react';
import Comment from './Comment'
import './List.css';

class List extends Component {
    render() {
        var commentNodes = this.props.data.map((comment) => (
                <Comment user={comment.name} date={comment.time} key={comment._id}>
                    <li className="list-group-item">{comment.message}</li>
                </Comment>
            ));
          return (
            <section className="container">
                <section className="list">
                    <ul className="list-group">
                        {commentNodes}
                    </ul>
                </section>
            </section>
          );
    }
}

export default List;