import {
    combineReducers
} from 'redux';
import auth from './authReducer';
import book from './bookReducer';

const rootReducer = combineReducers({
    auth,
    book
});
export default rootReducer;
