import { combineReducers } from 'redux';
import highlights from './highlights_reducer'
import rendition from './rendition_reducer'
import users from './users_reducer'
import books from './books_reducer'
import settings from './setting_reducer'
import comments from './comments_reducer'


export default combineReducers({
    highlights,
    rendition,
    users,
    books,
    settings,
    comments,
});