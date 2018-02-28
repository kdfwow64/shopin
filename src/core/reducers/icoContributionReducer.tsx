import {FETCH_ICO_CONTRIBUTION} from '../actions';


export default (state: any={},action:any)=> {
  switch(action.type){
    case FETCH_ICO_CONTRIBUTION:
      return action.payload.data;
    default:
      return state;
  }
};