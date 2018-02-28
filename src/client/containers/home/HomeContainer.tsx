declare var window: Window & { __initialState__: any,SHOPIN_RECENT_INVESTORS_TOTAL_LEN:any };
import * as React from "react";
import {Dispatch} from 'redux';
import MediaQuery from 'react-responsive';
//import { RootState } from "core/store";
import {connect} from "react-redux";
import {addDays} from "date-fns";
import * as CONTENT from "core/constants/content";
import * as FAQs from "core/constants/faqs";
import {Countdown, Img, Parallax, ListView, SearchListView, View,TakeoverView} from "components/atoms";
import {
    ContentSection,
    IconCard,
    ProfileCard,
    VideoCard,
    LogoCard,
    ListCard,
    ToastrCard,
    FormContainer,
    QuestionAnswerCard,
    ContentHeader,
    VideoPlayer,
    CoinParallax,
    Chart,
    Fade,
    MapContainer,
    MapChart
} from "components/molecules";
import {
 HomeMissionSection,
 RoadmapTimeline
} from "components/organisms";
import {fetchIcoData,fetchIcoContribution} from "core/actions";
import {submitPopUpForm} from "core/actions"
import {toast,style} from 'react-toastify';
import Transition from "react-transition-group/Transition";

const toastOptions = {
  transition: Fade,
  hideProgressBar: true,
  position: 'bottom-left',
  // Close directly after the enter transition
  autoClose: CONTENT.notifyDuration.closeToastr,
 };

export interface HomeContainerProps {
  icoData:any,
  icoContribution:any,
  fetchIcoData:any,
  fetchIcoContribution:any
}


export interface HomeContainerState {
    isPromptTakeoverOpen: boolean;
    promptTakeoverError: boolean;
    isTakeoverOpenHome: boolean;
    materialSection?:string;
    dropDownState?:boolean;
    whitePaperLang?:string;
    fetchFurtherContributions?:boolean;

}
const INITIAL_STATE: HomeContainerState = {
 isPromptTakeoverOpen: false,
 promptTakeoverError: null,
 isTakeoverOpenHome: false,
 materialSection:"Whitepaper",
 dropDownState:false,
 whitePaperLang:"Eng",
 fetchFurtherContributions:true
};
export interface HomeActionProps {}

const createContribMessages = function(messageData){
    const amount = messageData['promisedAmount'];
    const promisedCurrency = CONTENT.currencyType[messageData['promisedCurrency']];

    return ["Participation from",messageData['countryName'],"for",amount,promisedCurrency,"just now!"].join(" ");
    //return [amount,promisedCurrency,"pledged from","Canada"].join(" ");
 }
export class HomeContainerContainer extends React.Component<HomeContainerProps, HomeContainerState>
{

    constructor ( props: HomeContainerProps )
    {
      super(props);

      this.state = { ...INITIAL_STATE };
      this.showContributionMessages = this.showContributionMessages.bind(this);
      
     
    }
   
    componentDidMount(){
        
         this.props.fetchIcoContribution();
    }
    public showContributionMessages(messageData,initialData){
           // api call data fetch over..call api again when counter reaches 0
        this.setState({fetchFurtherContributions:false});
        let counter = messageData.lastestInvestors.length;
        let toastId = -1;
        let messageCountDown = setInterval(
            ()=>{
                counter--;
                if(counter <0){
                     clearInterval(messageCountDown);
                     if(!messageData.endQueryChain){
                          this.props.fetchIcoContribution(); // all messages consumed so api call to fetch subsequent data
                          this.setState({fetchFurtherContributions:true}); // activate flag for api call
                      }
                }
                else{
                        
                        if(!toast.isActive(toastId)){
                            toastId = toast(<ToastrCard content = {createContribMessages(messageData.lastestInvestors[counter])} />, toastOptions);
                            setTimeout(function(){
                                 toast.dismiss(toastId); },CONTENT.notifyDuration.closeToastr,toastId);
                        }
                }
            },CONTENT.notifyDuration.showNewNotification,toastId);

    }
    public renderMaterialLinks(materialLanguages){
       let linkContent=[];
       materialLanguages.map((member,index) => {
        if(materialLanguages.length === index + 1) {
            linkContent.push(<a href={CONTENT.AssetPaths.files + '/' + member.fileName} target="_blank">and {member.language}.</a>);
        } else {
            linkContent.push(<a href={CONTENT.AssetPaths.files + '/' + member.fileName} target="_blank">{member.language}, </a>);      
        }
       });
       return linkContent;
    }  

    public renderMaterialsDropDown(materialLanguages){
        let linkContent = [];
        materialLanguages.map((member,index) => {
                linkContent.push(<li key={member}>
                                    <a id= {member} onClick = {this.selectDropDown.bind(this)}>{member}</a>
                                    </li>);
        }); 
        return linkContent;   
    }  

    public closeMapForm(status){
      this.setState({isTakeoverOpenHome:!this.state.isTakeoverOpenHome});
      if(status){
          this.togglePrompt();
        //let toastId = toast(CONTENT.formSuccessPrompt,toastOptions);
        //setTimeout(function(){ toast.dismiss(toastId); }, 8000,toastId);
      }else{
        let toastId = toast(CONTENT.formErrorPrompt,toastOptions);
        setTimeout(function(){ toast.dismiss(toastId); }, 8000,toastId);
      }
    }

    public changeMaterialsImage(content){
      this.setState({materialSection:content});
    }


    public changeDropDownState(){
        this.setState({dropDownState:!this.state.dropDownState});
    }

    public selectDropDown(event){
        this.setState({
            dropDownState:!this.state.dropDownState,
            whitePaperLang:event.target.id
            });
    }

    public togglePrompt ( open: boolean = !this.state.isPromptTakeoverOpen, promptTakeoverError = false )
    {
      this.setState({
        isPromptTakeoverOpen: open,
        promptTakeoverError,
        isTakeoverOpenHome:false // close the form prompt also
      });

      if ( open ) {
        setTimeout(() => {
            this.setState({
                isPromptTakeoverOpen: false,
                promptTakeoverError: false,
                isTakeoverOpenHome:false // close the form prompt also
            });
        }, 5000);
      }
    }

    public render()
	{

        let dropDownClass = "";
        if(this.state.dropDownState){
            dropDownClass = " open";
        }
        

        if(this.state.fetchFurtherContributions &&
			typeof this.props.icoContribution.lastestInvestors !="undefined" 
            && this.props.icoContribution.lastestInvestors.length > 0){
            this.showContributionMessages(this.props.icoContribution,false);
        }

        return (
            <div id="about" className="shpn-home-container">

                {/*<div className="shpn-logo-container site compact" >
                    <div className="shpn-logo-grid">
                        {CONTENT.logos.map(logo => (
                            <LogoCard svgFile={logo} key={logo}/>))
                        }
                    </div>
                </div>
		*/}	
                
                <ContentHeader title={CONTENT.why.title} center/>



                <div className="vertical center layout site compact pad__t-12">
                    <div className="collapse">
                        <div className="horizontal center layout">
                            <a href="https://globenewswire.com/news-release/2018/01/25/1304702/0/en/Victory-Square-Technologies-Invests-in-Top-Three-ICO-Companies-at-North-American-Bitcoin-Conference-in-Miami.html" target="_blank">
                                <img src="/static/assets/images/logos/logo__nabc.jpg" className="pad__l-8 pad__r-8 txt_img1" width="180" />
                            </a>
                        </div>
                        <div className="horizontal center layout">
                            <img src="/static/assets/images/logos/logo__coinagenda.jpg" className="pad__l-8 pad__r-8 txt_img2" width="180" />
                        </div>                        
                    </div>
                </div>
                       

                <div className="shpn-why-container site total-signup">
                    <div className="shpn-why-grid">
                        <div className="store-wrap relative">
                            {/*<div className="backipad">
               <img src="" />
          </div>*/}
                            <div className="why-video">
                                <VideoPlayer className="fit" {...CONTENT.why.video} />
                            </div>
                        </div>
                    </div>
                </div>

                <HomeMissionSection />

                <ContentSection title={CONTENT.stats.title} subtext={CONTENT.stats.subtext} subtext1={CONTENT.stats.subtext1} className="site" id="stats">
                    <div className="grid four-col pilots-card pad__b-8">
                        {CONTENT.stats.cards.map((card,index) => (
                            <IconCard src={card.src} title={card.title} key={`icard-${card.title}`}
                              index={index}
                            />
                        ))}
                    </div>
                </ContentSection>

                <ContentSection title={CONTENT.solutions.title} subtext={CONTENT.solutions.subtext}
                                className="site solution">

                                <Img src="/static/assets/images/graphics/graphic__solutions--large@2x.png"
                                      className="fit-width hidden-m"/>
                                 <img src="/static/assets/images/graphics/graphic__solutions--small.png"
                                      className="fit-width hidden-d"/>

                </ContentSection>

                <ContentSection title={CONTENT.architecture.title} className="site architecture compact">
                    <ul>
                        <li>
                            <img src="/static/assets/images/graphics/blockchain-image-1.svg" height="40" width="40"/>
                            <div className="clearfix"></div>
                            Millions   of   data   transactions   per   second   on   the   Shopin   blockchain
                        </li>
                        <li>
                            <img src="/static/assets/images/graphics/blockchain-image-2.svg" height="40" width="40"/>
                            <div className="clearfix"></div>
                            Token   interoperability   through   Atomic   swaps
                        </li>
                        <li>
                            <img src="/static/assets/images/graphics/blockchain-image-3.svg" height="40" width="40"/>
                            <div className="clearfix"></div>
                            Powerful   recommendation   engine   powered   by   A.I.
                        </li>
                        <li>
                            <img src="/static/assets/images/graphics/blockchain-image-4.svg" height="40" width="40"/>
                            <div className="clearfix"></div>
                            The   exchange   of   value   between   shoppers   and   retailers
                        </li>
                    </ul>
                </ContentSection>

                <ContentSection title={CONTENT.technology.title} subtext={CONTENT.technology.subtext}
                                className="site hidden-m" id="technology-wrapper">
                    <Img src="/static/assets/images/graphics/technology@2x.png"/>
                </ContentSection>

                <div className="hidden-m">
                    <h3 className="text-align-center text-sz-4 text-bold pad__t-6 pad__b-6 site">Funding Structure</h3>
                    <Chart />
                </div>

                <div className="sec pad__b-0 token-sale">
                    <ContentSection title={CONTENT.tokens.title} className="site compact">
                        <div className="token-sale collapse">
                            <div className="left-text w-60">
                            Shopin’s Public Token Presale offers early participants an opportunity to acquire our tokens before the public token generation event and enjoy a bonus of 20% for the first 10MM, with no minimum requirement. This is a limited opportunity to pick up Shopin tokens at great value.
                            </div>
                            <div className="flex" />
                            <div className="action-items">
                                <div className="we-accept horizontal layout">
                                    <a>
                                        <img src="/static/assets/images/graphics/eth-color.svg" width="30"/>
                                    </a>
                                    <a>
                                        <span className="v-line"> | </span>
                                        <img src="/static/assets/images/graphics/btc-color.svg" width="30"/>
                                    </a>
                                </div>
                                <div className="txt">WE ACCEPT</div>
                            </div>
                        </div>
                        <div className="shpn-token-grid">
                            <div className="private">
                                <h1>Private Presale</h1>
                                <p className="hardcap">{CONTENT.tokens.hardcap}</p>
                                <ul>
                                    <li>
                                        <span className="left">Starts</span>
                                        <span className="right">{CONTENT.tokens.startDate}</span>
                                    </li>
                                    <li>
                                        <span className="left">Ends</span>
                                        <span className="right">{CONTENT.tokens.endDate}</span>
                                    </li>
                                </ul>
                                <div id="bonus" className="bonus">
                                    <h3>Bonus</h3>
                                    <div className="investment">
                                        <div className="left">
                                            {/* <div className="outer-circle">
                                                <div className="inner-circle">
                                                    <span className="prec">66%</span>
                                                </div>
                                            </div> */}
                                            <img src="/static/assets/images/graphics/66.png" height="74" alt="66%"/><br />
                                            <span className="txt">$500 000+<br/>participation</span>
                                        </div>
                                        <div className="right">
                                            {/* <div className="outer-circle">
                                                <div className="inner-circle">
                                                    <span className="prec">40%</span>
                                                </div>
                                            </div> */}
                                            <img src="/static/assets/images/graphics/40.png" height="74" alt="40%"/><br />
                                            <span className="txt"> &lt; $500 000<br/>participation </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="public">
                                <div className="top">
                                    <h1>Public Token Sale</h1>
                                    <p className="hardcap">{CONTENT.tokens.goal}</p>
                                    <ul>
                                        <li>
                                            <span className="left">Starts</span>
                                            <span className="right">15 March, 2018</span>
                                        </li>
                                        <li>
                                            <span className="left">Ends</span>
                                            <span className="right">To Be Announced</span>
                                        </li>
                                    </ul>

                                    <div className="bonus">
                                        <h4>Bonus</h4>
                                        <div className="bonus-circles">
                                            <div>
                                                {/* <span className="crcl1">20%</span> */}
                                                <img src="/static/assets/images/graphics/20.png" height="74" alt="20%"/><br />
                                                <p>$10MM+ collected</p>
                                            </div>
                                            <div>
                                                {/* <span className="crcl2">17%</span> */}
                                                <img src="/static/assets/images/graphics/17.png" height="74" alt="17.5%"/><br />
                                                <p>$20MM+ collected</p>
                                            </div>
                                            <div>
                                                {/* <span className="crcl3">15%</span> */}
                                                <img src="/static/assets/images/graphics/15.png" height="74" alt="15%"/><br />
                                                <p>$30MM+ collected</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="footer">
                                    <div className="left">
                                        <img src="/static/assets/images/graphics/timer.svg" width="34px"/>
                                        <span>Opens after</span>
                                    </div>
                                    <div className="right">
                                        <div className="presale-text exact-time-left">
                                            <div className="shpn-countdown"><Countdown end={new Date(2018,2,15)} /></div>
                                        </div>
                                        <div className="presale-text-1">
                                            <span>D</span>
                                            <span>H</span>
                                            <span>M</span>
                                            <span>S</span>
                                        </div>

                                        {/*
                                        <ul>
                                            <li>To Be Announced</li>
                                        </ul>

                                        <ul>
                                            <li>
                                                <p>25</p>
                                                <p>D</p>
                                            </li>
                                            <li>
                                                <p>&nbsp;: &nbsp;25 &nbsp;:&nbsp;</p>
                                                <p>H</p>
                                            </li> 
                                            <li>
                                                <p>25</p>
                                                <p>M</p>
                                            </li>
                                            <li>
                                                <p>&nbsp;: 25</p>
                                                <p>S</p>
                                            </li>
                                        </ul>
                                        */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ContentSection>
                    <div className="site compact token-sale-footer-bg">
                     <CoinParallax />
                    </div>
                </div>
                <ContentSection className="site" id="materials">
                    <div className="shopin-materials-container">
                        {(this.state.materialSection == "Whitepaper")?(
                        <div className="shopin-materials-book">
                            <img src={CONTENT.AssetPaths.photos + "/" +
                            "white_paper.png"} height="280" width="220"/>
                        </div>):null}
                        {(this.state.materialSection == "Pitchdeck")?(
                        <div className="shopin-materials-book">
                            <img src={CONTENT.AssetPaths.photos + "/" +
                            "pitch_deck.png"} height="280" width="220" />
                        </div>):null}
                        {(this.state.materialSection == "Token Dynamics")?(
                        <div className="shopin-materials-book">
                            <img src={CONTENT.AssetPaths.photos + "/" +
                            "token.png"} height="280" width="220" />
                        </div>):null}
                        <div className="shopin-materials-content">
                            <div className="language-selector">
                                <div className="label">
                                    Choose language
                                </div>
                                <div className =  {"language-dropdown-wrapper" + dropDownClass }>
                                    <div className="selected-language" onClick = {this.changeDropDownState.bind(this)} >{this.state.whitePaperLang}</div>
                                    <ul className="language-options">
                                    {this.renderMaterialsDropDown(Object.keys(CONTENT.materials.whitePaperLinks))}
                                    </ul>
                                </div>
                            </div>
                            <div className="shopin-materials-header">
                                {(this.state.materialSection== "Whitepaper")?
                                (<span className="shopin-content-header">{CONTENT.materials.whitePaperTitle}</span>):
                                (null)}
                                {(this.state.materialSection== "Pitchdeck")?
                                (<span className="shopin-content-header">{CONTENT.materials.pitchDeckTitle}</span>):
                                (null)}
                                {(this.state.materialSection== "Token Dynamics")?
                                (<span className="shopin-content-header">{CONTENT.materials.tokenTitle}</span>):
                                (null)}
                            </div>
                            <div className="shopin-materials-text">
                                <p style={(this.state.materialSection== "Whitepaper")?({"display":"block","opacity":1}):({"display":"none","opacity":0})}>{
                                  CONTENT.materials.whitePaperSubText
                                }</p>
                                <p style={(this.state.materialSection== "Pitchdeck")?({"display":"block","opacity":1}):({"display":"none","opacity":0})}>{
                                  CONTENT.materials.pitchDeckSubText
                                }</p>
                                <p style={(this.state.materialSection== "Token Dynamics")?({"display":"block","opacity":1}):({"display":"none","opacity":0})}>{
                                  CONTENT.materials.tokenSubText
                                }</p>
                            </div>
                            <div className="shopin-materials-type">
                            {CONTENT.materials.list.map(member => (
                                <ListCard assetFile={"cloud-down.svg"} content={member.displayName}
                                          link={member.link}
                                          whitePaperPdf={this.state.whitePaperLang}
                                          seperatorClass="profile-image"
                                          onFocus= {this.changeMaterialsImage.bind(this)}
                                          key={member.link} />
                            ))}
                            </div>
                        </div>
                    </div>
                </ContentSection>

                <div id="roadmap">
                    <div className="shpn-content-section site">
                        <h1 className="section-title">Company Roadmap</h1>
                        <RoadmapTimeline />
                    </div>
                </div>

                <div id="testimonials" className="testimonial">
                    <ContentSection title={CONTENT.testimonials.title} subtext={CONTENT.testimonials.subtext}
                                    className="site thinner" id="testimonial">
                        {CONTENT.testimonials.videos.length ? (
                            <ListView
                                className="grid two-col"
                                items={CONTENT.testimonials.videos}
                                template={( video: any, index: number ) => (
                                    <VideoCard
                                        video={video}
                                        key={`vcard-${video.name}`}
                                        index={index} />
                                )}
                                toggle={(<a className="showall">Show all Videos</a>)}
                            />
                        ) : (
                            <h3 className="text-align-center text-bold">Testimonial Videos Coming Soon</h3>
                        )}
                    </ContentSection>
                    <ContentSection className="site">
                        <div className="mapview">
                            <MapChart data={this.props.icoData.countryWiseDist} />

                            <p className="map-text">We   are   already   trusted   all   over   the   world. <br/>
                                 Be   part   of   the   Shopin   token   economy.</p>
                            <div className="map-btn join-now">
                                <button className="join-now-button outline" onClick={() => this.setState({ isTakeoverOpenHome: true })} >Join Now</button>
                            </div>
                        </div>
                    </ContentSection>
                </div>


                <ContentSection title={CONTENT.team.title} subtext={CONTENT.team.subtext} subtext1={CONTENT.team.subtext1} className="site" sectionClassName="site m-full" id="team">
                    <div className="grid three-col pilots-card m-grid-scroll-x">
                        {CONTENT.team.members.map((member,index) => (
                            <ProfileCard profile={member} key={`team-${member.name}`}
                                index={index}
                            />
                        ))}
                    </div>
                </ContentSection>

                <ContentSection title={CONTENT.advisors.title} subtext={CONTENT.advisors.subtext} className="site" sectionClassName="site m-full" id="advisors">
                    <div className="grid three-col pilots-card m-grid-scroll-x">
                        {CONTENT.advisors.members.map((member,index) => (
                            <ProfileCard profile={member} key={`team-${member.name}`}
                                index={index}
                            />
                        ))}
                    </div>
                </ContentSection>

                {/* FAQ Section */}
                <div className="faq-wrapper" id = "faq">
                    <div className="faq-bg-container">
                        <div className="shpn-content-section site">
                            <h1 className="section-title">Shopin Token Sale FAQ</h1>
                            <SearchListView
                             search
                             items={FAQs.faqs}
                             pageSize={10}
                             className="faq-list"
                             template={( member: any, index: number ) => (
                                <div key={index}>
                                    <QuestionAnswerCard
                                        question={member.question}
                                        answer={member.answer}
                                        index={index + 1}/>
                                </div>
                              )}
                              toggle={(<a className="showall">Show More</a>)}
                             />
                        </div>
                    </div>
                </div>
                <TakeoverView open={this.state.isTakeoverOpenHome} onClose={() => this.setState({ isTakeoverOpenHome: false })}>
                    <div style={({ color: "red" })}>
                    <div className="shpn-modal open">
                        <div className="modal-container">
                            <div className="modal-brand-logo hidden-d">
                                <img src="/static/assets/images/graphics/group-logo.svg" />
                                <span> Shopin </span>
                            </div>
                            <div className="modal-close">
                                <a role="button" onClick={() => this.setState({ isTakeoverOpenHome: false })}>
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
                                                  onEmailExists={() => this.togglePrompt(true, true)}
                                                  fromFooter = {false}
                                                  fromMap={true}
                                                  closeMapForm = {this.closeMapForm.bind(this)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                        <button onClick={() => this.setState({ isTakeoverOpenHome: false })}>(X) Close</button>
                    </div>
                </TakeoverView>
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
            </div>
  );
 }
  }

  const mapStateToProps = ( state: any ) => ({
    icoData:state.icoData,
    icoContribution:state.icoContributionResponse
  } as HomeContainerProps);

function mapDispatchToProps(dispatch: any) {

  const actions = {
    fetchIcoData:()  => dispatch(fetchIcoData()),
    fetchIcoContribution:() =>dispatch(fetchIcoContribution())
  }
  return actions;
}

export const  loadData = (store)=>{
  return store.dispatch(fetchIcoData());
}
export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeContainerContainer);
