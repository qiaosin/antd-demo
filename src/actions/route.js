/**
 * Created by czhw on 16/6/16.
 */
export const ROUTE_CHANAGE = 'ROUTE_CHANAGE';


export function changeRoute(path){
    return{
      type : ROUTE_CHANAGE,
      path
    }
}
