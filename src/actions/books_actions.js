export const STORE_BOOK = "STORE_BOOK"
export const RECEIVE_BOOK = "RECEIVE_BOOK"

const storeBook = (book) => {
    return {
        type: STORE_BOOK,
        book,
    }
}

const receiveBook = () => {
    return {
        type: RECEIVE_BOOK,
    }
}

export const createBook = (book) => dispatch => {
    return dispatch(storeBook(book))
}

export const fetchBook = () => dispatch => {
    return dispatch(receiveBook())
}