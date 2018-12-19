import authReducer from './authReducer';
import bookReducer from './bookReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    book: bookReducer
});

export default rootReducer;