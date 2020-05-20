import {
    RECEIVE_SESSION_ERRORS,
    RECEIVE_CURRENT_USER,
} from '../actions/session_actions';

export default (state = [], action) => {
    Object.freeze(state);
    
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            let response;
            action.errors == undefined ? response = null : response = action.errors; // for now
            return response;
        case RECEIVE_CURRENT_USER:
            return [];
        default:
            return state;
    }
};