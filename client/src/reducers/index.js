import {combineReducers} from 'redux';
import users from './users';
import auth from './auth';
import errors from './errors';


const rootReducer = combineReducers({
    users, auth, errors
});

export default rootReducer;