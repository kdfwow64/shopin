import * as React from "react";
import * as CONTENT from "core/constants/content";
import { ScrollLink, scrollListeners, scrollPosition } from "components/atoms";

export interface AppHeaderClassProps {
 sticky?: boolean;
 onClickJoin?: () => void;
};


export interface AppHeaderClassState {
 isStuck?: boolean;
 burgerMenu?: boolean,
 dropDownClass?:any,
 responsiveMenuClass?:any,
 footerClass?:any,
 footerLogoClass?:any
};


const INITIAL_PROPS: AppHeaderClassProps = {
 sticky: false,
};

const INITIAL_STATE: AppHeaderClassState = {
    isStuck: false,
    burgerMenu:false,
    dropDownClass:{desktop:"menu-list",other:"menu-list open"},
    responsiveMenuClass:{desktop:"responsive-menu",other:"responsive-menu open"},
    footerClass:{desktop:"footer-bottom",other:"footer-bottom open"},
    footerLogoClass:{desktop:"footer-bottom",other:"footer-bottom open logo"}
};

export class AppHeaderClass extends React.Component<AppHeaderClassProps, AppHeaderClassState>
{
  public static defaultProps = INITIAL_PROPS;

  constructor ( props: AppHeaderClassProps )
  {
      super(props);
      this.state = INITIAL_STATE;
  }

  public componentDidMount ()
  {
      const check = () => {
        if ( scrollPosition.y > 0 && !this.state.isStuck ) {
            this.setState({ isStuck: true });
        } else if ( scrollPosition.y < 1 && this.state.isStuck ) {
            this.setState({ isStuck: false });
        }
      };

      scrollListeners.push(check);

      setTimeout(() => check(), 1);

      new Image().src = "/static/assets/images/logos/logo__shopin.svg";
      new Image().src = "/static/assets/images/logos/logo__shopin--light.svg";
  }

  public closeMobileMenu(event:React.FormEvent<HTMLInputElement>):any{
    if(this.state.burgerMenu){
      this.setState({burgerMenu:!this.state.burgerMenu})
    }
  }
  public render()
  {
    const props = this.props;
    const state = this.state;
    let menuClass = !this.state.burgerMenu?(this.state.dropDownClass['desktop']):(this.state.dropDownClass['other']);
    let resMenuClass = !this.state.burgerMenu?(this.state.responsiveMenuClass['desktop']):(this.state.responsiveMenuClass['other']);
    let footerClass = !this.state.burgerMenu?(this.state.footerClass['desktop']):(this.state.footerClass['other']);

    return(
           <div className={`shpn-app-header ${props.sticky ? "sticky" : ""} ${state.isStuck ? "stuck" : ""} z-4`}>
            <div className="bg-lightest">
             <div className="header-wrapper">
                <div className="site">
                    <div className="brand">
                        <img src={`/static/assets/images/logos/logo__shopin.svg`} height="35" width="141" hidden />
                        <img src={`/static/assets/images/logos/logo__shopin--light.svg`} height="35" width="141" />
                    </div>
                    <div className="menu-nav flex">
                      <ul className={menuClass}>
                          <li><ScrollLink target="#about" closeMobileMenu = {this.closeMobileMenu.bind(this)}>About</ScrollLink></li>
                          <li><ScrollLink target="#stats" closeMobileMenu = {this.closeMobileMenu.bind(this)}>Stats</ScrollLink></li>
                          <li><ScrollLink target="#bonus" closeMobileMenu = {this.closeMobileMenu.bind(this)}>Bonus</ScrollLink></li>
                          <li><ScrollLink target="#materials" closeMobileMenu = {this.closeMobileMenu.bind(this)}>Materials</ScrollLink></li>
                          <li><ScrollLink target="#roadmap" closeMobileMenu = {this.closeMobileMenu.bind(this)}>Roadmap</ScrollLink></li>
                          <li><ScrollLink offset={-25} target="#testimonials" closeMobileMenu = {this.closeMobileMenu.bind(this)}>Testimonials</ScrollLink></li>
                          <li><ScrollLink offset={0} target="#team" closeMobileMenu = {this.closeMobileMenu.bind(this)}>Team</ScrollLink></li>
                          <li><ScrollLink offset={0} target="#faq" closeMobileMenu = {this.closeMobileMenu.bind(this)}>FAQs</ScrollLink></li>
                      </ul>
                    </div>
                    <div className = 'navigate-svg-wrapper'>
                      <a className="svg-content" href="http://telegram.me/shopineverywhere" target="_blank"><img src="/static/assets/images/graphics/if-social-56-1591869.svg" className="hidden-m svg-image" height="35" /></a>
                      <a className="svg-content" href="https://bitcointalk.org/index.php?topic=2788779.msg28511530#msg28511530" target="_blank"><img src="/static/assets/images/graphics/bitcoin-icon.svg" className="hidden-m svg-image" height="35" /></a>
                      <div className="navigate-button"> 
                       <div onClick={() => props.onClickJoin ? props.onClickJoin() : null}></div>
                      </div>
                      <a onClick={() => this.setState({ burgerMenu: !this.state.burgerMenu })} className={resMenuClass}></a>
                    </div>
                  </div>
                  <div className="intro-wrapper">

                  </div>

                  </div>
                  <div className={footerClass}>
                      <div className="footer-img-wrapper">
                        <div className="horizontal layout">
                          <a className="svg-content" href="http://telegram.me/shopineverywhere" target="_blank"><img src="/static/assets/images/graphics/if-social-56-1591869.svg" className="svg-image" width="30" /></a>
                          <div className="flex" />
                          <a className="svg-content" href="https://bitcointalk.org/index.php?topic=2788779.msg28511530#msg28511530" target="_blank"><img src="/static/assets/images/graphics/bitcoin-icon.svg" width="30" className="svg-image" /></a>
                        </div>
                      </div>
                  </div>
                    <div className={footerClass}>
                        <div className="copyright"><img src={CONTENT.AssetPaths.graphics + "/" + "logo.svg"} height="30" className="hidden-m" /> &copy; 2017 UnitedData, Inc. All Rights Reserved.</div>
                        <div className="social hidden-m">
                            <a href="javascript:;"><img src={CONTENT.AssetPaths.graphics + "/" + "social-pinterest.svg"} /></a>
                            <a href="javascript:;"><img src={CONTENT.AssetPaths.graphics + "/" + "social-linkedin.svg"} /></a>
                            <a href="javascript:;"><img src={CONTENT.AssetPaths.graphics + "/" + "social-facebook.svg"} /></a>
                            <a href="javascript:;"><img src={CONTENT.AssetPaths.graphics + "/" + "social-twitter.svg"} /></a>
                        </div>
                    </div>
                </div>
             </div>
   );
   }
};

AppHeaderClass.defaultProps = INITIAL_PROPS;
