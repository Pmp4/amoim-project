import {user} from './module/user';

const { combineReducers } = require('redux');

export const rootReducer = combineReducers({
    user,
});