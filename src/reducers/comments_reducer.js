import { RECEIVE_COMMENT, RECEIVE_COMMENTS, REMOVE_COMMENT } from '../actions/comments_actions'

const commentsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_COMMENT:
            return [...state, action.comment]
        case RECEIVE_COMMENTS:
            return action.comments
        case REMOVE_COMMENT:
            let newState = [...state]
            return newState.filter(comment => comment.id !== action.id)
        default:
            return state;
    }
};

export default commentsReducer;