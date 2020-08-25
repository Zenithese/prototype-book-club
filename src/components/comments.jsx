import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createComment } from '../actions/comments_actions'

const mapStateToProps = ({ session }) => {
    return {
        userId: Number(session.id),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createComment: (comment) => dispatch(createComment(comment)),
    }
}

function Comment({ comment, createComment, userId }) {

    const [visible, setVisible] = useState(false)
    const [body, setBody] = useState("")

    const nestedComments = (comment.comments || []).map(comment => {
        return <Comment key={comment.id} comment={comment} createComment={createComment} userId={userId} />
    }) // Thank you Nick @CoderRocketFuel for the recursive functional component lesson!

    const handleSubmit = (e, id) => {
        e.preventDefault();
        const comment = {
            body,
            id,
            userId
        }
        createComment(comment);
    }

    return (
        <div className="comments">
            <div className="comment" key={comment.id}>
                <div>{comment.body}</div>
                <button onClick={() => setVisible(!visible)}>reply</button>
                <form style={visible ? { display: "block" } : { display: "none" }} onSubmit={(e) => handleSubmit(e, comment.id)} >
                    <label>Reply:</label>
                    <input type="body" value={body} onChange={(e) => setBody(e.target.value)} />
                </form>
                {nestedComments}
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);