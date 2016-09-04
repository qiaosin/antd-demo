/**
 * Created by czhw on 16/6/16.
 */
import fetch from 'isomorphic-fetch'
import {changeRoute} from './route';
import * as types from '../constant/ActionTypes';





function postAddUser(){
  return {
    type : types.POST_ADD_USER
  }
}

function postEditUser(){
  return {
    type : types.POST_EDIT_USER
  }
}

function editUserSuccess(user){
  return {
    type:types.EDIT_USER_SUCCESS,
    user
  }
}
function addUserSuccess(user){
  return {
    type:types.ADD_USER_SUCCESS,
    user
  }
}

function requestPosts() {
  return {
    type: types.QUERY_USERS
  }
}

function postDeleteUser(){
  return {
    type : types.DEL_USER
  }
}

function deleteUserSuccess(id){
  return {
    type : types.DEL_USER_SUCCESS,
    id
  }
}

function receiveUsers(users,total){
  return {
    type:types.RECEIVE_USERS,
    users,
    total
  }
}


export function deleteUser(id){
  let url = 'http://127.0.0.1:8080/api/demo/delete/'  + id;
  return dispatch => {
    dispatch(postDeleteUser());
    const opts = {
      method: 'POST'
    };
    return fetch(url,opts).then(function(res){
      dispatch(deleteUserSuccess(id));
    })
  }
}

export function queryUsers(condition){
  let url = 'http://127.0.0.1:8080/api/demo/getByCondition?name='+condition.name + "&sex=" + condition.sex+"&start="+condition.start+"&limit=" + condition.limit;
  return dispatch => {
     dispatch(requestPosts());
     return fetch(url)
       .then(response => response.json())
       .then(json => dispatch(receiveUsers(json.data.items,json.data.total)))
  }
}

export function saveOrUpdate(isAdd,user){
  let url = '';
  if(isAdd){
    url = 'http://127.0.0.1:8080/api/demo/add';
  }else{
    url = 'http://127.0.0.1:8080/api/demo/update';
  }
  return dispatch => {
    if(isAdd){
      dispatch(postAddUser());
    }else{
      dispatch(postEditUser());
    }
    const opts = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    };
    return fetch(url,opts)
      .then(response => response.json())
      .then(function(json){
        if(json.code == 'success'){
          if(isAdd){
            dispatch(addUserSuccess(json.data));
          } else {
            console.log('success user:',json);
            dispatch(editUserSuccess(json.data));
          }
          dispatch(changeRoute("/users"));
        }
      })
  }
}
