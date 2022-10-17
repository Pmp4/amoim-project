import {user} from './module/user';
import {path} from './module/path'
import {modal} from './module/modal'

const { combineReducers } = require('redux');

export const rootReducer = combineReducers({
    user,
    path,
    modal
});