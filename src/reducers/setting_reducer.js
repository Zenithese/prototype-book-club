import { STORE_SETTINGS, RECEIVE_SETTINGS } from '../actions/settings_actions'

const settingsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case STORE_SETTINGS:
            let newState = Object.assign({}, state)
            newState['settings'] = {color: action.color, fontSize: action.fontSize, theme: action.theme}
            return newState
        case RECEIVE_SETTINGS:
            return Object.assign({}, state)
        default:
            return state;
    }
};

export default settingsReducer;