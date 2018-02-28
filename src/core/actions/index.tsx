import 'babel-polyfill';
import axios from 'axios';
import {Action, ActionCreator, Dispatch} from 'redux';
import {apiUrls} from "core/constants/content";

// export interface

// export type fetchIcoData:string
//export type dispatch=any;

export const FETCH_ICO_DATA = 'fetch_ico_data';
export const FETCH_ICO_CONTRIBUTION = 'fetch_ico_contribution';
export const SUBMIT_POPUP_FORM = 'submit_popup_form';

const contributionMessages = [{"firstName":"A","lastName":"K","emailId":"a@b.com","promisedAmount":"3.2","promisedCurrency":"eth","paidPromptly":true,"referral":"a"},
{"firstName":"B","lastName":"L","emailId":"a@c.com","promisedAmount":"2.3","promisedCurrency":"btc","paidPromptly":false,"referral":"b"},
{"firstName":"C","lastName":"M","emailId":"a@d.com","promisedAmount":"41","promisedCurrency":"eth","paidPromptly":true,"referral":"c"},
{"firstName":"D","lastName":"N","emailId":"a@e.com","promisedAmount":"15","promisedCurrency":"btc","paidPromptly":false,"referral":"d"},
{"firstName":"E","lastName":"O","emailId":"a@f.com","promisedAmount":"6.9","promisedCurrency":"eth","paidPromptly":true,"referral":"e"},
{"firstName":"F","lastName":"P","emailId":"a@g.com","promisedAmount":"1.7","promisedCurrency":"btc","paidPromptly":false,"referral":"f"},
{"firstName":"G","lastName":"Q","emailId":"a@h.com","promisedAmount":"1.9","promisedCurrency":"eth","paidPromptly":false,"referral":"g"},
{"firstName":"H","lastName":"R","emailId":"a@i.com","promisedAmount":"1.2","promisedCurrency":"btc","paidPromptly":true,"referral":"h"},
{"firstName":"I","lastName":"S","emailId":"a@j.com","promisedAmount":"1.8","promisedCurrency":"eth","paidPromptly":false,"referral":"i"},
{"firstName":"J","lastName":"D","emailId":"a@k.com","promisedAmount":"1.6","promisedCurrency":"btc","paidPromptly":false,"referral":"j"}
];

export const fetchIcoData = () => async (dispatch:Dispatch<{}>) => {
  const res = await axios.get(apiUrls['funding']);
  dispatch({
    type:FETCH_ICO_DATA,
    payload:res
  })
};


export function fetchIcoContribution(){
  
  return async function(dispatch:any){
      const res = await axios.get(apiUrls['latestRandomInvestors']);
      dispatch(
      {
        type:FETCH_ICO_CONTRIBUTION,
        payload:res
      });  
  }

}


export function submitPopUpForm(payload:any){
  return async function(dispatch: any){
    try{
      const res = await axios.post(apiUrls['investors'],payload)
      dispatch({
        type:SUBMIT_POPUP_FORM,
        payload:res
      });
    }
    catch(err){
      let emptyData = {}
      if(err.response.data.hasOwnProperty("errField")){
        emptyData = {data:err.response.data.errField}
      }
      else{
        emptyData = {data:-1}
      }
      
      dispatch({
        type:SUBMIT_POPUP_FORM,
        payload:emptyData
      });
    }
  }
}

export function clearPopUpForm(){
  return async function(dispatch: any){
    let emptyData = {data:""};
    dispatch({
      type:SUBMIT_POPUP_FORM,
      payload:emptyData
    });
  }
}
