import * as APIUtil from '../util/session_api_util';

export const STORE_SETTINGS = "STORE_SETTINGS"
export const RECEIVE_SETTINGS = "RECEIVE_SETTINGS"

const storeSettings = (highlightColor, fontSize, theme) => {
    return {
        type: STORE_SETTINGS,
        highlightColor, 
        fontSize, 
        theme
    }
}

const receiveSettings = () => {
    return {
        type: RECEIVE_SETTINGS,
    }
}

export const createSettings = (id, color, fontSize, theme) => dispatch => {
    return APIUtil.updateSettings(id, color, fontSize, theme).then(settings => {
        const { highlightColor, fontSize, theme } = settings.data
        dispatch(storeSettings(highlightColor, fontSize, theme))
    })
}

export const fetchSettings = () => dispatch => {
    return dispatch(receiveSettings())
}