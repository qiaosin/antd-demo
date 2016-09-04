import * as types from '../constant/ActionTypes';

import Immutable from 'immutable';

export function reportManage(state,action){
  return Immutable.fromJS({ items:items(state,action)	});
}


function items(state=Immutable.fromJS({}),action){
  /*console.log(state)
  console.log(action.data)*/
  switch (action.type){
    case types.DATA_LIST:{
      return action.data
    }
    default:
  	return state.items;
  }
}