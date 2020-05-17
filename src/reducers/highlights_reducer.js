import { RECEIVE_HIGHLIGHT, RECEIVE_HIGHLIGHTS } from '../actions/highlights_actions'

const highlightsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_HIGHLIGHT:
            return [...state, action.highlight]
        case RECEIVE_HIGHLIGHTS:
            console.log("receive highlights:", state)
            return Object.assign([], state)
        default:
            return state;
    }
};

export default highlightsReducer;