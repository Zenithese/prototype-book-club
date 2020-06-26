import * as APIUtil from '../util/session_api_util';

export const STORE_SETTINGS = "STORE_SETTINGS"
export const RECEIVE_SETTINGS = "RECEIVE_SETTINGS"

const storeSettings = (settings) => {
    return {
        type: STORE_SETTINGS,
        color: settings.highlight_color,
        fontSize: settings.font_size,
        theme: settings.theme,
    }
}

const receiveSettings = () => {
    return {
        type: RECEIVE_SETTINGS,
    }
}

// export const createSettings = (color, fontSize, theme) => dispatch => {
//     return dispatch(storeSettings(color, fontSize, theme))
// }

export const createSettings = (color, fontSize, theme) => dispatch => {
    return APIUtil.updateSettings(color, fontSize, theme).then(settings => {
        dispatch(storeSettings(settings))
    })
}

export const fetchSettings = () => dispatch => {
    return dispatch(receiveSettings())
}