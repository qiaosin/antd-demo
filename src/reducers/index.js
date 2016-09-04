import {combineReducers} from 'redux';
import {auth} from './auth';
import {userManage} from './user';
import {path} from './pathRoute';
import {reportManage} from './reports';

const rootReducer = combineReducers({
  auth,path,userManage,reportManage
})


export default rootReducer
