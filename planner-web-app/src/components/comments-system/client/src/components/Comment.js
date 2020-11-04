import React, {Component} from 'react';
import './Comment.css';
class Comment extends Component {
    render() {
        return (
            <section className="comment">
                <h3 className="commentAuthor">
                    {this.props.author}
                </h3>
                <p>
                    {this.props.children}
                </p>
            </section>
        );
    }
}

export default Comment;