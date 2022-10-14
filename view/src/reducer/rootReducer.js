import {user} from './module/user';
import {path} from './module/path'

const { combineReducers } = require('redux');

export const rootReducer = combineReducers({
    user,
    path
});