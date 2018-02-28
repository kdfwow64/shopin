import * as React from "react";
import {AssetPaths,formErrorMsg} from "core/constants/content";
import {connect} from "react-redux";
import {submitPopUpForm,clearPopUpForm} from "core/actions"
// import Notifications, {notify} from 'react-notify-toast';
declare let dataLayer: any;
export interface FormCardState {
   firstName?:string,
   lastName?:string,
   emailId?:string,
   referral?:string,
   promisedAmount?:string,
   promisedCurrency?:string,
   paidPromptly?:boolean,
   firstNameErrorMsg?:boolean,
   lastNameErrorMsg?:boolean,
   emailIdErrorMsg?:boolean,
   promisedAmountErrorMsg?:boolean,
   promisedCurrencyErrorMsg?:boolean,
   footerFormSubmitted?:boolean,
   duplicateEmailErrorMsg?: boolean,
   headerFormSubmitted?:boolean,
   mapFormSubmitted?:boolean,
   readyForSubmit?:boolean
}

const INITIAL_STATE: FormCardState = {
    firstName:"",
    lastName:"",
    referral:"",
    emailId:"",
    promisedAmount:"",
    promisedCurrency:"",
    paidPromptly:true,
    footerFormSubmitted:false,
    headerFormSubmitted:false,
    readyForSubmit:false
};

// const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);


const addToDataLayer = function(){
  if(dataLayer){
      dataLayer.push({
      'event': 'emailSignUp'
      }) 
  }
}
const validator_map = {};

validator_map["aplhabetical"] = (val) => {
    return typeof val === "string" && /^[a-zA-Z]+$/.test(val) ;
};

validator_map["name_only"] = (val) => {
    if (typeof val != "string" || !val) {
        return false;
    }
    if (val.length  === 1){
        return validator_map["aplhabetical"](val);
    }
    return /^[a-zA-Z][a-zA-Z. ,]*[a-zA-Z.]$/.test(val);
};

validator_map["natural_number"] = (val) => {
    return /^[0-9]+\.?[0-9]*$/.test(val);
};

const isNumeric = n => validator_map["natural_number"](n);
function isLetter(text) {
  let letters = /^[a-zA-Z. ,]+$/g;
  if(text.match(letters)){
    return true;
  }
  else{
    return false;
  }
   //return validator_map["name_only"](text);
}

function isValidEmail(val)
{
  val = val.trim();
  
  return /^\w+([!#$%&‘*+–/=?^`.{|}~-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val);
}
export interface FormCardProps {
  icoData:any,
  submitPopupForm:any,
  clearPopUpForm:any,
  responseData?:any,
  fromFooter?:boolean,
  fromMap?:boolean,
  closeForm?:any,
  closeFooterForm?:any,
  closeMapForm?:any,
  onEmailExists?: any
}

const INITIAL_PROPS: FormCardProps = {
  icoData:{},
  submitPopupForm:{},
  clearPopUpForm:{},
};

const errorColor = "red";

const labelColor = "#424242";

const submitDisabledColor = "#d6dfec";

const submitEnabledColor = "#008aff";

const uncheckedKeys = ["firstNameErrorMsg","lastNameErrorMsg","emailIdErrorMsg","promisedAmountErrorMsg","promisedCurrencyErrorMsg","paidPromptly","footerFormSubmitted","headerFormSubmitted","mapFormSubmitted","referral","duplicateEmailErrorMsg"];

const INVALID_EMAILS = [];

export class FormCard extends React.Component<FormCardProps, FormCardState>{

  public static defaultProps = INITIAL_PROPS;
  constructor ( props: FormCardProps )
  {
        super(props);
        this.state = INITIAL_STATE;
        this.handleServerErrorKeys = this.handleServerErrorKeys.bind(this);
  }

  componentWillReceiveProps(nextProps){

    let defaultObj = {
      firstName:"",
      lastName:"",
      emailId:"",
      promisedAmount:"",
      promisedCurrency:"",
      referral:"",
      paidPromptly:true,
      firstNameErrorMsg:false,
      lastNameErrorMsg:false,
      emailIdErrorMsg:false,
      duplicateEmailErrorMsg:false,
      promisedAmountErrorMsg:false,
      promisedCurrencyErrorMsg:false,
      readyForSubmit:false
    }
    let errorDefaultObj ={
      firstNameErrorMsg:false,
      lastNameErrorMsg:false,
      emailIdErrorMsg:false,
      duplicateEmailErrorMsg: false,
      promisedAmountErrorMsg:false,
      promisedCurrencyErrorMsg:false,
      readyForSubmit:false
    }
    let errorVals = ["firstName","lastName","emailId","promisedAmount","duplicateEmail"];
    if(nextProps.responseData.data=="200 OK"){
        if(this.state.headerFormSubmitted){
            addToDataLayer();
            defaultObj['headerFormSubmitted'] =false;
            this.setState(defaultObj);
            this.props.closeForm(true);
            this.props.clearPopUpForm();
        }
        else if(this.state.mapFormSubmitted){
          addToDataLayer();
          defaultObj['mapFormSubmitted'] = false;
          this.setState(defaultObj);
          this.props.closeMapForm(true);
          this.props.clearPopUpForm();
        }
        else if(this.state.footerFormSubmitted){
          addToDataLayer();
          defaultObj['footerFormSubmitted']=false;
          
          this.setState(defaultObj);
          this.props.closeFooterForm(true);
          this.props.clearPopUpForm();
        }
    }
    else if(errorVals.indexOf(nextProps.responseData.data) > -1 ){
      let serverErrorKey = nextProps.responseData.data + "ErrorMsg";
      
      if(this.state.headerFormSubmitted){
        this.handleServerErrorKeys(errorDefaultObj,'headerFormSubmitted',nextProps.responseData.data)
      }
      else if(this.state.mapFormSubmitted){
        this.handleServerErrorKeys(errorDefaultObj,'mapFormSubmitted',nextProps.responseData.data)
      }
      else if(this.state.footerFormSubmitted){
        this.handleServerErrorKeys(errorDefaultObj,'footerFormSubmitted',nextProps.responseData.data)
      }
    }
    else if(nextProps.responseData.data == -1){
      if(this.state.headerFormSubmitted){
          defaultObj['headerFormSubmitted'] =false;
            this.setState(defaultObj);
            this.props.closeForm(false);
            this.props.clearPopUpForm();
      }
      else if(this.state.mapFormSubmitted){
          defaultObj['mapFormSubmitted'] = false;
          this.props.closeMapForm(false);
          this.setState(defaultObj);
      }
      else if(this.state.footerFormSubmitted){
          defaultObj['footerFormSubmitted']=false;
          this.setState(defaultObj);
          this.props.closeFooterForm(false);
          this.props.clearPopUpForm();
      }
    }
  }

  public handleServerErrorKeys(errorObj,formLocation,serverError){
    errorObj[formLocation] = false;
    let serverErrorKey = serverError+ "ErrorMsg";
    if(serverErrorKey!=="duplicateEmailErrorMsg"){
      errorObj[serverErrorKey]=true;
    }
    this.setState(errorObj);
    if(serverError == "duplicateEmail"){
       this.props.onEmailExists();
    }
  }

  public  handleSubmit(event:any) {
    event.preventDefault();
    if(!this.state.readyForSubmit){
      return
    }
    let errorObj = {
      "firstNameErrorMsg":false,
      "lastNameErrorMsg":false,
      "emailIdErrorMsg":false,
      "promisedAmountErrorMsg":false,
      "promisedCurrencyErrorMsg":false
    };
    let isError = false;
    for(let key in this.state){
      if(uncheckedKeys.indexOf(key) == -1  && this.state[key]==""){
        let errorKey = key+"ErrorMsg";
        // let errorMessage = formErrorMsg[key];
        if((key=="promisedAmount" || key=="promisedCurrency") && !this.state.paidPromptly){
          continue;
        }
        errorObj[errorKey]=true;
        this.setState(errorObj);
        isError = true;
      }
      if(key=="emailId"){
        if(!isValidEmail(this.state[key])){
          let errorKey = key+"ErrorMsg";
          errorObj[errorKey]=true;
          this.setState(errorObj);
          isError = true;
        }
      }
      if(key == "firstName" || key=="lastName"){
        if(!validator_map["name_only"](this.state[key].trim()))
        {
          let errorKey = key+"ErrorMsg";
          errorObj[errorKey]=true;
          this.setState(errorObj);
          isError = true;
        }
      }
    }
    if(!isError){
      let payloadData = (({ firstName,lastName,emailId,promisedAmount,promisedCurrency,paidPromptly,referral }) => ({ firstName, lastName,emailId,promisedAmount,promisedCurrency,paidPromptly,referral }))(this.state);
      payloadData['firstName']=payloadData['firstName'].trim();
      payloadData['lastName']=payloadData['lastName'].trim();
      this.props.submitPopupForm(payloadData);
      if(!this.props.fromFooter){
        if(!this.props.fromMap){
          this.setState({
            headerFormSubmitted:true
        });
    }
    else{
      this.setState({
        mapFormSubmitted:true
    });
    }
      }
      else{
        this.setState({
          footerFormSubmitted:true,
      });
      }

  }
  }
  public isFormSubmitReady(fromField){

    let keysToCheck = ['firstName','lastName','emailId','promisedAmount','promisedCurrency', 'duplicateEmail'];
    let index = keysToCheck.indexOf(fromField);
    keysToCheck.splice(index,1);
    let amountCondition = true;
    for(let i=0;i<keysToCheck.length;i++){
      amountCondition = amountCondition && (this.state[keysToCheck[i]]!="");
    }

    // Always check amounts
    // let paidPromptlyCondition = !this.state.paidPromptly;
    // let promptKeysToCheck = ['firstName','lastName','emailId'];
    // let promptIndex = promptKeysToCheck.indexOf(fromField);
    // promptKeysToCheck.splice(index,1);
    // for(let j=0;j< promptKeysToCheck.length;j++){
    //     paidPromptlyCondition = paidPromptlyCondition && (this.state[promptKeysToCheck[j]]!="");
    // }

    // return amountCondition || paidPromptlyCondition;
    return amountCondition;
  }
  public handleInputChange(event:React.FormEvent<HTMLInputElement>):void {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value

     switch (name) {
      case "firstName":
      if(value.length==0){
        this.setState({
          firstName:value,
          readyForSubmit:false
        })
      }
      else{
        if(isLetter(value)){
          if(this.isFormSubmitReady("firstName")){
            this.setState({firstName:value,
                          firstNameErrorMsg:false,
                          readyForSubmit:true
                });
          }
          else{
              this.setState({firstName:value,
                            firstNameErrorMsg:false});
          }
        }
      }
        break;
        case "referral":
        if(value.length==0){
          this.setState({
            referral:value,
          })
        }
        else{
          if(isLetter(value)){
            this.setState({
              referral:value,
            })
          }
        }
          break;
      case "emailId":
      if(value.length==0){
        this.setState({
          emailId:value,
          readyForSubmit:false
        })
      }
      else{
        if(this.isFormSubmitReady("emailId")){
          this.setState({emailId:value,
                        emailIdErrorMsg:false,
                        readyForSubmit:true
              });
        }
        else{
            this.setState({emailId:value,
                            emailIdErrorMsg:false});
        }
      }
        break;
      case "lastName":
      if(value.length==0){
        this.setState({
          lastName:value,
          readyForSubmit:false
        })
      }
      else{
          if(isLetter(value)){
            if(this.isFormSubmitReady("lastName")){
              this.setState({lastName:value,
                            readyForSubmit:true,
                            lastNameErrorMsg:false
                  });
            }
            else{
                this.setState({lastName:value,
                              lastNameErrorMsg:false});
            }
          }
      }
        break;
      case "promisedAmount":
        if(value.length==0){
          this.setState({
            promisedAmount:value,
            readyForSubmit:false
          })
        }
        else{
          if(isNumeric(value)){
            if(this.isFormSubmitReady("promisedAmount")){
              this.setState({promisedAmount:value,
                            readyForSubmit:true,
                            promisedAmountErrorMsg:false
                  });
            }
            else{
                this.setState({promisedAmount:value,promisedAmountErrorMsg:false});
            }
          }
      }
        break;
      case "promisedCurrency":
      if(this.isFormSubmitReady("promisedCurrency")){
        this.setState({promisedCurrency:value,
                      readyForSubmit:true,
                      promisedCurrencyErrorMsg:false
            });
      }
      else{
          this.setState({promisedCurrency:value,
          promisedCurrencyErrorMsg:false});
      }
        break;
      case "paidPromptly":
      // old conditions start
      // if(!this.state.paidPromptly){
      //   // checkbox unselected
      //   if(this.state.firstName!="" &&
      //   this.state.lastName!="" &&
      //   this.state.emailId!="" &&
      //    this.state.promisedAmount!=""
      //  && this.state.promisedCurrency!=""){
      //    // form is still ready to submit since we have amount
      //    this.setState({
      //      paidPromptly:!this.state.paidPromptly,
      //      readyForSubmit:true
      //    })
      //  }
      //  else{
      //    // form is not ready to submit since we don't have amount
      //    this.setState({
      //      paidPromptly:!this.state.paidPromptly,
      //      readyForSubmit:false
      //    })

      //  }
      // }
      // else{
      //   // checkbox selected
      //   if((this.state.firstName!="" &&
      //   this.state.lastName!="" &&
      //   this.state.emailId!="") ||
      //   (this.state.firstName!="" &&
      //   this.state.lastName!="" &&
      //   this.state.emailId!="" &&
      //    this.state.promisedAmount!=""
      //  && this.state.promisedCurrency!="")
      //   )
      //   {
      //     // all conditions met
      //     this.setState({
      //       paidPromptly:!this.state.paidPromptly,
      //       readyForSubmit:true
      //     })
      // }
      // else{
      //   // a field is left
      //   this.setState({
      //     paidPromptly:!this.state.paidPromptly,
      //     readyForSubmit:false
      //   })
      // }
      // }
      // old conditions end

      if(this.isFormSubmitReady("paidPromptly")){
        this.setState({paidPromptly:!this.state.paidPromptly,
                      readyForSubmit:true
            });
      }
      else{
          this.setState({paidPromptly:!this.state.paidPromptly,
          readyForSubmit:false});
      }
        break;
      default:
        break;
    }
  }

  render(){
        const props = this.props;
        const state = this.state;
        let emailError = ""
        if(this.state.emailIdErrorMsg){
          emailError = formErrorMsg.emailId;
        }
        else if(this.state.duplicateEmailErrorMsg){
          emailError = formErrorMsg.duplicateEmail;
        }

        if(!props.fromFooter){
        return(
          <form action="">
              <div className="grid">
                  <div className="" style={(this.state.firstNameErrorMsg)?{color:errorColor}:{color:labelColor}}>
                      <label htmlFor="">First Name*</label><br/>
                      <input type="text" name="firstName" placeholder="First name"
                        value = {this.state.firstName} onChange={e => this.handleInputChange(e)}
                      />
                      {this.state.firstNameErrorMsg?(<div className="form-error">{formErrorMsg.firstName}</div>):(null)}
                  </div>
                  <div className="" style={(this.state.lastNameErrorMsg)?{color:errorColor}:{color:labelColor}}>
                      <label htmlFor="">Last Name* </label><br/>
                      <input type="text" name="lastName" placeholder="Last name"
                      value={this.state.lastName} onChange={this.handleInputChange.bind(this)}
                      />
                      {this.state.lastNameErrorMsg?(<div className="form-error">{formErrorMsg.lastName}</div>):(null)}
                  </div>
                  <div className="" style={{color:labelColor}}>
                      <label htmlFor="">Who referred you? </label><br/>
                      <input type="text" name="referral" placeholder="Satoshi Nakamoto"
                      value={this.state.referral} onChange={this.handleInputChange.bind(this)}
                      />
                  </div>

                  <div className="" style={(this.state.emailIdErrorMsg || this.state.duplicateEmailErrorMsg)?{color:errorColor}:{color:labelColor}} >
                      <label htmlFor="">Email address* </label><br/>
                      <input type="text" name="emailId" placeholder="Email Id"
                       value = {this.state.emailId} onChange={this.handleInputChange.bind(this)} />
                       {(emailError!="")?(<div className="form-error">{emailError}</div>)
                       : null}
                  </div>
                  <div className="horizontal layout">
                      <div className="width-x-100" style={(this.state.promisedAmountErrorMsg)?{color:errorColor}:{color:labelColor}}>
                          <label htmlFor="">Amount* </label><br/>
                          <input type="text" name="promisedAmount"  className="width-x-100" placeholder="Amount"
                           value = {this.state.promisedAmount} onChange={this.handleInputChange.bind(this)}
                          />
                      </div>
                      <div className="currency pad__l-6" style={(this.state.promisedCurrencyErrorMsg)?{color:errorColor}:{color:labelColor}}>
                          <label htmlFor="">Is the amount in* </label><br/>
                          <div className="grid xs-three-col horizontal layout radio-group">
                              <div className="radio eth radio-inline flex">
                                  <label>
                                      <input type="radio" name="promisedCurrency" id="currency1"
                                       value="eth" onChange={this.handleInputChange.bind(this)}
                                       checked={this.state.promisedCurrency=="eth"}
                                        />
                                      <span></span>
                                  </label>
                              </div>
                              <div className="radio btc radio-inline flex">
                                  <label>
                                      <input type="radio" name="promisedCurrency" id="currency2"
                                       value="btc" onChange={this.handleInputChange.bind(this)}
                                       checked={this.state.promisedCurrency=="btc"} />
                                      <span></span>
                                  </label>
                              </div>
                          </div>
                          <div className="currency-note" hidden style= {{color:labelColor}}>your name will be added to our whitelist</div>
                      </div>
                  </div>
                  <div className=""  style={{color:labelColor}} >

                      <div className="checkbox">
                          <label>
                              <input type="checkbox" name="paidPromptly"
                                checked={this.state.paidPromptly==false} onChange={this.handleInputChange.bind(this)}  />
                              <span>I want to participate later, but I want to be aware of all the events</span>
                          </label>
                      </div>
                  </div>
                  <div className="">
                      <input type="submit"  style= {(this.state.readyForSubmit)?{backgroundColor:submitEnabledColor}:{backgroundColor:submitDisabledColor}} className="btn btn-block" onClick={this.handleSubmit.bind(this)} value="Send Information" />
                  </div>
              </div>
          </form>
        )
      }
      else{
        return(
          <form action="">
              <div className="grid two-col">
                  <div className="first-name" style={(this.state.firstNameErrorMsg)?{color:errorColor}:{color:labelColor}}>
                      <label htmlFor="">First Name*</label><br/>
                      <input type="text"  name="firstName"  tabIndex= {1}  placeholder="Enter your first name"
                       value = {this.state.firstName} onChange={e => this.handleInputChange(e)} />
                      {this.state.firstNameErrorMsg?(<div className="form-error">{formErrorMsg.firstName}</div>):(null)}
                  </div>
                  <div className="email-address" style={(this.state.emailIdErrorMsg)?{color:errorColor}:{color:labelColor}} >
                      <label htmlFor="">Email address*</label><br/>
                      <input type="text"  tabIndex={4}  placeholder="Email Id"  name="emailId"
                      value = {this.state.emailId} onChange={this.handleInputChange.bind(this)} />
                      {(emailError!="")?(<div className="form-error">{emailError}</div>)
                       : null}
                  </div>
                  <div className="last-name" style={(this.state.lastNameErrorMsg)?{color:errorColor}:{color:labelColor}}>
                      <label htmlFor="">Last Name*</label><br/>
                      <input type="text"   tabIndex={2}  name="lastName"  placeholder="Enter your last name"
                      value={this.state.lastName} onChange={this.handleInputChange.bind(this)} />
                        {this.state.lastNameErrorMsg?(<div className="form-error">{formErrorMsg.lastName}</div>):(null)}
                  </div>

                  <div className="currency-wrapper">
                      <div className="horizontal layout">
                          <div className="amount w-40" style={(this.state.promisedAmountErrorMsg)?{color:errorColor}:{color:labelColor}}>
                              <label htmlFor="">Amount*</label><br/>
                              <input type="text"  tabIndex={4}  name="promisedAmount"  placeholder="Amount"
                               value = {this.state.promisedAmount} onChange={this.handleInputChange.bind(this)}
                               />
                          </div>
                          <div className="currency flex mar__l-4" style={(this.state.promisedCurrencyErrorMsg)?{color:errorColor}:{color:labelColor}} >
                              <label htmlFor="">Is the amount in*</label><br/>
                              <div className="grid xs-three-col horizontal layout radio-group">
                                  <div className="radio eth radio-inline flex">
                                      <label>
                                          <input type="radio" 
                                          name="promisedCurrency" id="currency1"
                                          value="eth" onChange={this.handleInputChange.bind(this)}
                                          checked={this.state.promisedCurrency=="eth"} /> <span></span>
                                      </label>
                                  </div>
                                  <div className="radio btc radio-inline flex">
                                      <label>
                                          <input type="radio"  name="promisedCurrency" id="currency2"
                                           value="btc" onChange={this.handleInputChange.bind(this)}
                                           checked={this.state.promisedCurrency=="btc"}
                                           /> <span></span>
                                      </label>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="currency-note" hidden>
                        your name will be added to our whitelist
                      </div>
                  </div>
                  <div className="referral">
                      <label htmlFor="">Who referred you?</label><br/>
                      <input type="text"  tabIndex={3}  name="referral"  placeholder="Satoshi Nakamoto"
                      value={this.state.referral} onChange={this.handleInputChange.bind(this)} />
                  </div>
                  <div className="accept">
                      <label>&nbsp;</label>
                      <div className="checkbox">
                          <label>
                              <input  type="checkbox"  tabIndex={6} name="paidPromptly"
                                checked={this.state.paidPromptly==false} onChange={this.handleInputChange.bind(this)} />
                              <span>I want to participate later, but I want to be aware of all the events</span>
                          </label>
                      </div>
                  </div>
                  <div className="action-button">
                      <input type="submit" style= {(this.state.readyForSubmit)?{backgroundColor:submitEnabledColor}:{backgroundColor:submitDisabledColor}} className="btn btn-block" onClick={this.handleSubmit.bind(this)} value="Send Information" />
                  </div>
              </div>
          </form>
        )
      }
    }
  }


// const mapStateToProps = ( state: any,ownProps:any ) => ({
//   icoData:state.icoData,
//   responseData:state.popupFormResponse
// } as FormCardProps);

function mapStateToProps(state:any,ownProps:any){
  return {
    icoData:state.icoData,
    responseData:state.popupFormResponse,
  } as FormCardProps
}

function mapDispatchToProps(dispatch: any) {
  const actions = {
    submitPopupForm: (payload: any) => dispatch(submitPopUpForm(payload)),
    clearPopUpForm:() =>dispatch(clearPopUpForm())
  }
  return actions;
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps
        }
};

export const FormContainer = connect(mapStateToProps,mapDispatchToProps,mergeProps)(FormCard);
