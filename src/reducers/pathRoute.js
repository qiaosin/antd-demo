import {ROUTE_CHANAGE} from '../actions/route';

export function path(state,action){
   return changePath(state,action);
}

function changePath(state='',action){
  switch(action.type){
    case ROUTE_CHANAGE:{
      return action.path;
    }
  }
  return state;
}
