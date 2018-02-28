import {combineReducers} from 'redux';
import icoDataReducer from './icoDataReducer';
import popupFormReducer from './popupFormReducer';
import icoContributionReducer from './icoContributionReducer';
export default combineReducers({
  icoData:icoDataReducer,
  popupFormResponse:popupFormReducer,
  icoContributionResponse:icoContributionReducer
});
