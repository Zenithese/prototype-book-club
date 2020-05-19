import { STORE_RENDITION, RECEIVE_RENDITION } from '../actions/rendition_actions'

const renditionReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case STORE_RENDITION:
            let newState = Object.assign({}, state)
            newState['rendition'] = action.rendition
            return newState
        case RECEIVE_RENDITION:
            return Object.assign({}, state)
        default:
            return state;
    }
};

export default renditionReducer;