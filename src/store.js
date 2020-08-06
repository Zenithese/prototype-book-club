import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root_reducer';

let middleware = [thunk];

const configureStore = (preloadedState = {}) => {
    // console.log(preloadedState)
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(...middleware)
    )
};

export default configureStore;