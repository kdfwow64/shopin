import {FETCH_ICO_DATA} from '../actions';


export default (state: any={},action:any)=> {
  switch(action.type){
    case FETCH_ICO_DATA:
      return action.payload.data;
    default:
      return state;
  }
};
