import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "core/store";
import {
    Countdown,
    TakeoverView,
    resizeListeners,
    scrollListeners,
    scrollPosition
} from "components/atoms";
import {FormContainer,Fade} from "components/molecules";
import {
    AppHeaderClass,
    AppFooter
} from "components/organisms";
import {
 addDays, lastDayOfISOWeek
} from "date-fns";
import {submitPopUpForm} from "core/actions"
import { ToastContainer, toast } from 'react-toastify';
import Transition from "react-transition-group/Transition";
import {placeHolderStore,formSuccessPrompt,formErrorPrompt,AssetPaths} from "core/constants/content";
import { Img } from "components/atoms";




const toastOptions = {
  transition: Fade,
  hideProgressBar: true,
  // Close directly after the enter transition
  autoClose: 5000
};

export interface ShellProps {
    icoData:any
}


export interface ShellState {
    isTakeoverOpen: boolean;
    isTakeoverOpenHeader: boolean;
    isPromptTakeoverOpen: boolean;
    promptTakeoverError: boolean;
    isAtBottom: boolean;
}

const INITIAL_PROPS: ShellProps = {icoData:{}};

const INITIAL_STATE: ShellState = {
 isTakeoverOpen: false,
 isPromptTakeoverOpen: false,
 isTakeoverOpenHeader:false,
 promptTakeoverError: false,
 isAtBottom: false
};

const addCommas = intNum => (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}
export class ShellComponent extends React.Component<ShellProps, ShellState>
{
    public static defaultProps = INITIAL_PROPS;

    constructor ( props: ShellProps )
    {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    public componentDidMount ()
    {
        let root = document.querySelector<HTMLElement>("#root");
        let docHeight = 0;
        let launcherEl = null;
        let interval = setInterval(() => {
            launcherEl = document.querySelector<HTMLElement>("#launcher");

            if ( launcherEl ) {
                alignLauncher();
                clearInterval(interval);
            }
        }, 10);
        const MAX_WIDTH = 1160;
        const alignLauncher = () => {
            if ( scrollPosition.w > MAX_WIDTH ) {
                const deltaX = (scrollPosition.w - MAX_WIDTH) / 2;

                launcherEl.style.right = `${deltaX}px`;
            } else {
                launcherEl.style.right = "0";
            }
        };
        const check = () => {
            const bY = scrollPosition.y + scrollPosition.h;

            if ( bY >= docHeight && !this.state.isAtBottom ) {
                this.setState({ isAtBottom: true });
                document.body.classList.add("at-bottom");
            } else if ( bY < docHeight && this.state.isAtBottom ) {
                this.setState({ isAtBottom: false });
                document.body.classList.remove("at-bottom");
            }
        };
        const resize = () => {
            docHeight = root.offsetHeight - 70;

            if ( launcherEl ) alignLauncher();
        };

        scrollListeners.push(check);
        resizeListeners.push(resize);
        resize();
    }

    public togglePrompt ( open: boolean = !this.state.isPromptTakeoverOpen, promptTakeoverError = false )
    {
        this.setState({
            isTakeoverOpen: false,
            isTakeoverOpenHeader: false
        });

        setTimeout(() => {
            this.setState({
                isPromptTakeoverOpen: open,
                promptTakeoverError
            });
        });

      if ( open ) {
        //setTimeout(() => {
            this.setState({
                isPromptTakeoverOpen: false,
                promptTakeoverError: false
            });
        //}, 5000);
      }
    }

    public closeForm(status){
      this.setState({isTakeoverOpenHeader:!this.state.isTakeoverOpenHeader});
      if(status){
        this.togglePrompt();

        /*
        let toastId = toast(formSuccessPrompt,toastOptions);
        setTimeout(function(){ toast.dismiss(toastId); }, 5000,toastId);
        */
      }
      else{
        let toastId = toast(formErrorPrompt,toastOptions);
        setTimeout(function(){ toast.dismiss(toastId); }, 5000,toastId);
      }

    }
    public closeFooterForm(status){
      if(status){
       //check this.setState({ isPromptTakeoverOpen: true, promptTakeoverError: false });
        this.togglePrompt();
        // let toastId = toast(formSuccessPrompt,toastOptions);
        // setTimeout(function(){ toast.dismiss(toastId); }, 5000,toastId);
      }
      else{
        let toastId = toast(formErrorPrompt,toastOptions);
        setTimeout(function(){ toast.dismiss(toastId); }, 5000,toastId);
      }
    }

    public render() {
      const props = this.props;
      
      /* let icoData = props.icoData;
      if (isEmpty(props.icoData)){
        icoData = placeHolderStore;
      }*/
      let icoData = placeHolderStore;
      let {countryWiseDist,totalValDist}=icoData;
      let {contributionTarget,currencyWiseContributions,totalContributed}=totalValDist;
      let displayCurrency = {};
      let totalCurrency = 0;
      let currentContribution = Math.floor(Number((totalContributed/contributionTarget)*100));
      let progressBarStyle={};
      if(currentContribution>=100){
        currentContribution=99;
        progressBarStyle['textAlign']="center";
        progressBarStyle['fontFamily'] =  "Montserrat";
        progressBarStyle['fontSize'] = "15px";
        progressBarStyle['fontWeight']= "bold";
        progressBarStyle['fontStyle'] = "normal";
        progressBarStyle['fontStretch']= "normal";
        progressBarStyle['lineHeight'] = "1.33";
      }
      else if(currentContribution==0){
        progressBarStyle['color'] = "#008aff";
      }
      progressBarStyle['width']=70+"%";

      for (let currency in currencyWiseContributions){
        displayCurrency[currency]=addCommas(currencyWiseContributions[currency]['unitsContributed']);
        totalCurrency += currencyWiseContributions[currency]['valContributed'];
      }

      displayCurrency['BTCSHARE'] = "";
      displayCurrency['ETHSHARE'] = "";
      displayCurrency['USDSHARE'] = "";
      if(totalCurrency!=0){
        displayCurrency['BTCSHARE'] = Math.floor(Number((currencyWiseContributions['BTC']['valContributed']/totalCurrency)*100));
        displayCurrency['ETHSHARE'] = Math.floor(Number((currencyWiseContributions['ETH']['valContributed']/totalCurrency)*100));
        displayCurrency['USDSHARE'] = Math.floor(Number((currencyWiseContributions['USD']['valContributed']/totalCurrency)*100));
      }


        return (
            <div className={`shpn-app-shell ${this.state.isAtBottom ? "at-bottom" : ""}`}>
             <AppHeaderClass sticky onClickJoin={() => this.setState({ isTakeoverOpenHeader: true })}/>
                <div className="home-wrapper">
                    <div className="h1_margin">
                        <div className="hero-text">Shopping Made Personal</div>
                        <div className="hero-sub-text">Shopin is the world's first decentralized shopper profile built on the blockchain.</div>
                    </div>
                    <ToastContainer style={{'zIndex': '100000'}}
                                             closeButton={false} />
                    <div className="fund-progress-meter">
                        <div className="backback_progressbar">
                            <div className="fill-bar">
                                <div className="back_progressbar">
                                    <div className="filled-meter" style={progressBarStyle} >
                                        <span className="txt_progressbar1">Private Presale</span>
                                        <span className="txt_progressbar2">Public Presale</span>
                                    </div>
                                    <span className="txt_progressbar3">$20,000,000</span>  
                                    <div className="blockline3"></div>  
                                    <div className="token_back">
                                        <span className="token_txt">Token Generation</span>
                                    </div>
                                </div>
                                <div className="blockline1"></div>
                                <div className="proback"><span>70%</span></div>
                                <div className="blockline2"></div>
                            </div>
                        </div>
                        <div className="join-now">
                            <button className="join-now-button" onClick={() => this.setState({ isTakeoverOpenHeader: true })}>Why We're Winners</button>
                        </div>
                    </div>
                </div>




                <div>{this.props.children}</div>

                <div className="shopn-modal-alert">
                    <TakeoverView open={this.state.isPromptTakeoverOpen}>
                        <div className="modal-container">
                            <div className="modal-brand-logo site">
                                <img src="/static/assets/images/logos/logo__shopin--light.svg" height="35" width="141" alt="Shopin Logo" />
                            </div>
                            <div className="modal-close">
                                <a role="button" onClick={() => this.setState({ isPromptTakeoverOpen: false })}>
                                    <img className="hidden-m" src="/static/assets/images/graphics/close.svg" alt=""/>
                                    <img className="hidden-d" src="/static/assets/images/graphics/close-gray.svg" alt=""/>
                                </a>
                            </div>
                        </div>
                        <div className="shpn-modal-content horizontal center layout">
                            <div className="vertical center layout flex">
                                <div className="fit-width vertical center layout">
                                    <div className="img-wrapper mar__b-3 circle-icon">
                                        <div className="circle" />
                                        <img src="/static/assets/images/icons/icon__handshake.svg"  width="40"/>
                                    </div>

                                    <div className="vertical center layout fit-width" hidden={this.state.promptTakeoverError}>
                                        <h1 className="mar__b-8 block">Thank you for your support!</h1>
                                    </div>
                                </div>
                                <div className="vertical center layout fit-width" hidden={!this.state.promptTakeoverError}>
                                    <h1 className="mar__b-8 block">Looks like you already have submitted</h1>
                                    <a href="mailto:kyc@shopin.com"><button className="button ethereal">Contact us directly</button></a>
                                </div>
                            </div>
                        </div>
                    </TakeoverView>
                </div>

                <TakeoverView open={this.state.isTakeoverOpenHeader} onClose={() => this.setState({ isTakeoverOpenHeader: false })}>
                    <div>
                    <div className="shpn-modal open">
                        <div className="modal-container">
                            <div className="modal-brand-logo hidden-d">
                                <img src="/static/assets/images/graphics/group-logo.svg" />
                                <span> Shopin </span>
                            </div>
                            <div className="modal-close">
                                <a role="button" onClick={() => this.setState({ isTakeoverOpenHeader: false })}>
                                    <img className="hidden-m" src="/static/assets/images/graphics/close.svg" alt=""/>
                                    <img className="hidden-d" src="/static/assets/images/graphics/close-gray.svg" alt=""/>
                                </a>
                            </div>
                            <div className="site">
                                <div className="shpn-modal-content">
                                    <div className="grid two-col">
                                        <div className="shpn-believers">
                                            <img className="hidden-m" src="/static/assets/images/logos/logo__shopin--light.svg" height="35" width="141" alt="Shopin Logo" />
                                            <h1 className="modal-heading">Shopin Token Presale Form</h1>
                                            <p className="secondary-heading-m">*Due to high demand, we have opened a Public Presale for a limited time only. Please fill out our online form to be whitelisted for the Public Presale.</p>
                                            <ul className="hidden-m image-holder" hidden>
                                                <li>
                                                    <img src="/static/assets/images/photos/modal/Bitmap.jpg" alt="bitmap"/>
                                                </li>
                                                <li>
                                                    <img src="/static/assets/images/photos/modal/Bitmap1.jpg" alt="bitmap"/>
                                                </li>
                                                <li>
                                                    <img src="/static/assets/images/photos/modal/Bitmap2.jpg" alt="bitmap"/>
                                                </li>
                                                <li>
                                                    <img src="/static/assets/images/photos/modal/Bitmap3.jpg" alt="bitmap"/>
                                                </li>
                                                <li>
                                                    <img src="/static/assets/images/photos/modal/Bitmap4.jpg" alt="bitmap"/>
                                                </li>
                                                <li>
                                                    <img src="/static/assets/images/photos/modal/Bitmap5.jpg" alt="bitmap"/>
                                                </li>
                                                <li>
                                                    <img src="/static/assets/images/photos/modal/Bitmap6.jpg" alt="bitmap"/>
                                                </li>
                                                <li>and other 100,000+ people</li>
                                            </ul>
                                        </div>
                                        <div className="shpn-registration-form">
                                            <div className="presale-form-wrapper">
                                                <div className="shpn-content-section__main">
                                                    <FormContainer icoData={this.props.icoData}
                                                    submitPopupForm ={submitPopUpForm}
                                                    fromFooter = {false}
                                                    onEmailExists={() => this.togglePrompt(true, true)}
                                                    fromMap={false}
                                                    closeForm = {this.closeForm.bind(this)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                        <button onClick={() => this.setState({ isTakeoverOpenHeader: false })}>(X) Close</button>
                    </div>
                </TakeoverView>
                <AppFooter >
                    <FormContainer icoData={this.props.icoData}
                    submitPopupForm ={submitPopUpForm}
                    onEmailExists={() => this.togglePrompt(true, true)}
                    fromFooter = {true}
                    closeFooterForm = {this.closeFooterForm.bind(this)}
                    />
                </AppFooter>
            </div>
        );
    }
}

const mapStateToProps = ( state: any ) => ({
  icoData:state.icoData
} as ShellProps);

export const Shell = connect(mapStateToProps)(ShellComponent);
