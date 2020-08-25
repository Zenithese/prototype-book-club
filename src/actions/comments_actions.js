import * as APIUtil from '../util/comments_api_util'

export const RECEIVE_COMMENT = "RECEIVE_COMMENT"
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS"
export const REMOVE_COMMENT = "REMOVE_COMMENT"

const receiveComment = (comment) => {
    debugger
    return {
        type: RECEIVE_COMMENT,
        comment,
    }
}

const receiveComments = (comments) => {
    return {
        type: RECEIVE_COMMENTS,
        comments,
    }
}

const removeComment = (id) => {
    return {
        type: REMOVE_COMMENT,
        id
    }
}

export const createComment = (comment) => dispatch => {
    return APIUtil.createComment(comment).then(comment =>
        dispatch(receiveComment(comment.data))
    )
};

export const fetchComments = () => dispatch => {
    return APIUtil.fetchComments().then(comments =>
        dispatch(receiveComments(comments.data))
    )
};

export const deleteComment = (id) => dispatch => {
    return APIUtil.deleteComment(id).then(response =>
        dispatch(removeComment(response.data.id))
    )
};