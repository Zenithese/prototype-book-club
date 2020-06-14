export const STORE_SETTINGS = "STORE_SETTINGS"
export const RECEIVE_SETTINGS = "RECEIVE_SETTINGS"

const storeSettings = (color, fontSize, theme) => {
    return {
        type: STORE_SETTINGS,
        color,
        fontSize,
        theme,
    }
}

const receiveSettings = () => {
    return {
        type: RECEIVE_SETTINGS,
    }
}

export const createSettings = (color, fontSize, theme) => dispatch => {
    return dispatch(storeSettings(color, fontSize, theme))
}

export const fetchSettings = () => dispatch => {
    return dispatch(receiveSettings())
}