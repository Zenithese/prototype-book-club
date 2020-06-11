import { STORE_BOOK, RECEIVE_BOOK } from '../actions/books_actions'

const booksReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case STORE_BOOK:
            let newState = Object.assign({}, state)
            newState['book'] = action.bookId
            return newState
        case RECEIVE_BOOK:
            return Object.assign({}, state)
        default:
            return state;
    }
};

export default booksReducer;