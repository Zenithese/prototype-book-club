export const STORE_BOOK = "STORE_BOOK"
export const RECEIVE_BOOK = "RECEIVE_BOOK"

const storeBook = (bookId) => {
    return {
        type: STORE_BOOK,
        bookId,
    }
}

const receiveBook = () => {
    return {
        type: RECEIVE_BOOK,
    }
}

export const createBook = (bookId) => dispatch => {
    return dispatch(storeBook(bookId))
}

export const fetchBook = () => dispatch => {
    return dispatch(receiveBook())
}