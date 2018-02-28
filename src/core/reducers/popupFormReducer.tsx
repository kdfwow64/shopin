import {SUBMIT_POPUP_FORM} from '../actions';


export default (state: any={},action:any)=> {
  switch(action.type){
    case SUBMIT_POPUP_FORM:
      return Object.assign({},action.payload,{data:action.payload.data});
    default:
      return state;
  }
};
