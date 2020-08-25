import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createComment, fetchComments } from '../actions/comments_actions'

const mapStateToProps = ({ entities, session }) => {
    return {
        userId: Number(session.id),
        comments: entities.comments,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createComment: (comment) => dispatch(createComment(comment)),
        fetchComments: () => dispatch(fetchComments()),
    }
}

function Comment({ comment, createComment, fetchComments, userId, comments }) {

    const [visible, setVisible] = useState(false)
    const [body, setBody] = useState("")

    // useEffect(() => {
    //     fetchComments();
    // }, [fetchComments])

    const nestedComments = (comment.comments || []).map(comment => {
        return <Comment key={comment.id} comment={comment} createComment={createComment} userId={userId} fetchComments={fetchComments} comments={comments} />
    }) // Thank you Nick @CoderRocketFuel for the recursive functional component lesson!

    const handleSubmit = (e, id) => {
        e.preventDefault();
        const comment = {
            body,
            id,
            userId,
        }
        createComment(comment);
    }

    return (
        <div className="comments">
            {console.log("comments")}
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