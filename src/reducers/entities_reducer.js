import { combineReducers } from 'redux';
import highlights from './highlights_reducer'
import rendition from './rendition_reducer'


export default combineReducers({
    highlights,
    rendition
});