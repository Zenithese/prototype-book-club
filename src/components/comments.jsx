import React from 'react';
import { connect } from 'react-redux';
import { createComment } from '../actions/comments_actions'

const mapStateToProps = ({ entities, session }) => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createComment: () => dispatch(createComment()),
    }
}

function Comment({ comment }) {

    const nestedComments = (comment.comments || []).map(comment => {
        return <Comment key={comment.id} comment={comment} />
    }) // Thank you Nick @CoderRocketFuel for the recursive functional component lesson!

    const reply = () => {
        
    }

    return (
        <div className="comments">
            <div className="comment" key={comment.id}>
                <div>{comment.body}</div>
                <button onClick={() => reply()}>reply</button>
                {nestedComments}
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);