export const STORE_RENDITION = "STORE_RENDITION"
export const RECEIVE_RENDITION = "RENDITION_RENDITION"

const storeRendition = (rendition, on) => {
    return {
        type: STORE_RENDITION,
        rendition,
        on
    }
}

const receiveRendition = () => {
    return {
        type: RECEIVE_RENDITION,
    }
}

export const createRendition = (rendition) => dispatch => {
    let on = rendition.on
    return dispatch(storeRendition(rendition, on))
}

export const fetchRendition = () => dispatch => {
    return dispatch(receiveRendition())
}