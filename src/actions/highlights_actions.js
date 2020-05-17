export const RECEIVE_HIGHLIGHT = "RECEIVE_HIGHLIGHT"
export const RECEIVE_HIGHLIGHTS = "RECEIVE_HIGHLIGHTS"

const receiveHighlight = (highlight) => {
    return {
        type: RECEIVE_HIGHLIGHT,
        highlight,
    }
}

const receiveHighlights = () => {
    return {
        type: RECEIVE_HIGHLIGHTS
    }
}

export const createHighlight = (highlight) => dispatch => {
    return dispatch(receiveHighlight(highlight));
};

export const fetchHighlights = () => dispatch => {
    return dispatch(receiveHighlights());
};