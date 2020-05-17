import { RECEIVE_HIGHLIGHT, RECEIVE_HIGHLIGHTS, REMOVE_HIGHLIGHT } from '../actions/highlights_actions'

const highlightsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_HIGHLIGHT:
            return Object.assign({}, state, { [action.highlight.id]: action.highlight })
        case RECEIVE_HIGHLIGHTS:
            return Object.assign({}, state)
        case REMOVE_HIGHLIGHT:
            console.log("remove highlight")
            let newState = Object.assign({}, state)
            delete newState[action.id]
            return newState
        default:
            return state;
    }
};

export default highlightsReducer;