import { RECEIVE_HIGHLIGHT, RECEIVE_HIGHLIGHTS, REMOVE_HIGHLIGHT } from '../actions/highlights_actions'

const highlightsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_HIGHLIGHT:
            return [...state, action.highlight]
        case RECEIVE_HIGHLIGHTS:
            return action.highlights
        case REMOVE_HIGHLIGHT:
            let newState = [...state]
            return newState.filter(highlight => highlight.id !== action.id)
        default:
            return state;
    }
};

export default highlightsReducer;