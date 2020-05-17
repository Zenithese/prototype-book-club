export const RECEIVE_HIGHLIGHT = "RECEIVE_HIGHLIGHT"
export const RECEIVE_HIGHLIGHTS = "RECEIVE_HIGHLIGHTS"
export const REMOVE_HIGHLIGHT = "REMOVE_HIGHLIGHT"

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

const removeHighlight = (id) => {
    console.log("removeHighlight")
    return {
        type: REMOVE_HIGHLIGHT,
        id
    }
}

export const createHighlight = (highlight) => dispatch => {
    return dispatch(receiveHighlight(highlight));
};

export const fetchHighlights = () => dispatch => {
    return dispatch(receiveHighlights());
};

export const deleteHighlight = (id) => dispatch => {
    console.log("deleteHighlight")
    return dispatch(removeHighlight(id));
};