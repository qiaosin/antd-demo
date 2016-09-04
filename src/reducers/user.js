import * as types from '../actions/user';

import { List, Map } from 'immutable';

export function userManage(state,action){
  return {items:items(state,action),loading:isLoading(state,action),total:getTotal(state,action)};
}

function getTotal(state = 0,action){
  switch(action.type){
    case types.RECEIVE_USERS:{
       return action.total;
    }
  }
  return state.total || 0;
}

function isLoading(state = false,action){
  switch(action.type){
    case types.QUERY_USERS:{
      return true;
    }
    case types.DEL_USER:{
      return true;
    }
  }
  return false;
}

function items(state={},action){
  switch (action.type){
    case types.RECEIVE_USERS:{
      return action.users
    }
    case types.DEL_USER_SUCCESS:{
      return state.items.filter(function(item){
         return item.id != action.id
      })
    }
    case types.ADD_USER_SUCCESS:{
      const users = state.items.slice();
      users.splice(0,0,action.user);
      return users;
    }
    case types.EDIT_USER_SUCCESS:{
      const users = state.items.slice();
      let index = users.findIndex(user => user.id == action.user.id);
      if(index > 0){
        users.splice(index, 1, Object.assign({}, action.user));
      }
      return users;
    }
  }
  return state.items || [];
}

