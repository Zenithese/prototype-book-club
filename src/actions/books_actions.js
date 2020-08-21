import * as APIUtil from '../util/books_api_util'

export const STORE_BOOK = "STORE_BOOK"
export const RECEIVE_BOOK = "RECEIVE_BOOK"
export const RECEIVE_BOOKS = "RECEIVE_BOOKS"

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

const receiveBooks = (books) => {
    return {
        type: RECEIVE_BOOKS,
        books
    }
}

export const createBook = (book) => dispatch => {
    return dispatch(storeBook(book))
}

export const fetchBook = () => dispatch => {
    return dispatch(receiveBook())
}

export const fetchBooks = () => dispatch => {
    return APIUtil.fetchBooks().then(books => {
        dispatch(receiveBooks(books.data))
    }) 
}

export const updateBook = (id, location) => dispatch => {
    return APIUtil.updateBook(id, location).then(book => {
        dispatch(storeBook(book))
    })
}