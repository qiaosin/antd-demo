import fetch from 'isomorphic-fetch'
import {changeRoute} from './route';
import * as types from '../constant/ActionTypes';


function setDataList(data){
  return {
    type : types.DATA_LIST,
    data
  }
}

export function getDataList(data){

  let initialState=[];
    for (let i = 0; i < 46; i++) {
    initialState.push({
      key: i,
      name: `李大嘴${i}`,
      age: 32,
      address: `西湖区湖底公园${i}号`,
    });
  }
	return dispatch => {
    dispatch(setDataList(initialState));}
  /*let url = 'http://127.0.0.1:8080/api/demo/delete/'  + id;
  return dispatch => {
    dispatch(postDeleteUser());
    const opts = {
      method: 'POST'
    };
    return fetch(url,opts).then(function(res){
      dispatch(deleteUserSuccess(id));
    })
  }*/
/*  data=[];
  for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `李大嘴${i}`,
    age: 32,
    address: `西湖区湖底公园${i}号`,
  });
}
  return dispatch => {
  	dispatch(setDataList(data));
  }*/
}