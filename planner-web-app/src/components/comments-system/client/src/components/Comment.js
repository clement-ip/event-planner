import React, {Component} from 'react';
import './Comment.css';
class Comment extends Component {
    render() {
        return (
            <section className="comment">
                <h3 className="commentUser">
                    {this.props.user}
                </h3>
                <p className="commentDate">
                    {this.props.date}
                </p>
                <p>
                    {this.props.children}
                </p>
            </section>
        );
    }
}

export default Comment;