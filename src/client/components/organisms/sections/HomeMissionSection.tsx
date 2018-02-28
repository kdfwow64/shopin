import * as React from "react";
import * as CONTENT from "core/constants/content";
import { Img, View } from "components/atoms";
import {
    ContentSection,
    VideoPlayer
} from "components/molecules";

export interface HomeMissionSectionProps {
 onEnter?: () => void;
 onExit?: () => void;
}

export interface HomeMissionSectionState {
 entered: boolean;
 visible: any;
}

const INITIAL_PROPS: HomeMissionSectionProps = {
};

const INITIAL_STATE: HomeMissionSectionState = {
 entered: false,
 visible: {
  1: false,
  2: false,
  3: false,
  4: false
 }
};

export class HomeMissionSection extends React.Component<HomeMissionSectionProps, HomeMissionSectionState>
{
 public static defaultProps = INITIAL_PROPS;

 private _el: HTMLElement;

 constructor ( props: HomeMissionSectionProps )
 {
  super(props);

  this.state = INITIAL_STATE;
 }

 public componentDidMount ()
 {
  if ( !this._el ) return;
 }

 public render ()
 {
  return (
   <div className="view" ref={el => {
    if ( !el || this._el ) return;

    this._el = el;
   }}>
                  <ContentSection title={CONTENT.mission.title} subtext={CONTENT.mission.subtext} className={`site ${this.state.entered ? "entered" : ""}`}>
                    <div className="shopn-mission-container">
                     <View onEnter={() => {
                      if ( !this.state.entered ) {
                       let max = Object.keys(this.state.visible).length;
                       let current = 1;
                       let interval = setInterval(() => {
                        if ( current == max ) clearInterval(interval);

                        const visible = { ...this.state.visible };

                        visible[current] = true;

                        current++;

                        this.setState({ visible });
                       }, 160);
                      }
                     }}>
                        <div className="shopn-mission-grid">
                            <div className="shopn-mission-content">
                                <div className="shopn-mission-content-part">
                                    <div className="shopn-mission-content-image">
                                        <div className="img-wrapper circle-icon">
                                            <div className={`circle ${this.state.visible["1"] ? "reveal-pop-in" : "invisible"}`} />
                                            <img src={CONTENT.AssetPaths.graphics + "/" +
                                            "mission_1.svg"} className={`${this.state.visible["1"] ? "reveal-fade-in" : "invisible"}`} width="40"/>
                                        </div>
                                    </div>
                                    <div className={`shopn-mission-content-text ${this.state.visible["1"] ? "reveal-slight-left" : "invisible"}`}>
                                        <p>{CONTENT.mission.content1}</p>
                                    </div>

                                </div>
                                <div className="shopn-mission-content-part">
                                    <div className="shopn-mission-content-image">
                                        <div className="img-wrapper circle-icon">
                                         <div className={`circle ${this.state.visible["2"] ? "reveal-pop-in" : "invisible"}`} />
                                            <img src={CONTENT.AssetPaths.graphics + "/" +
                                            "mission_2.svg"} className={`${this.state.visible["2"] ? "reveal-fade-in" : "invisible"}`} width="40"/></div>
                                    </div>
                                    <div className={`shopn-mission-content-text ${this.state.visible["2"] ? "reveal-slight-left" : "invisible"}`}>
                                        <p>{CONTENT.mission.content2}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="shopn-mission-content">
                                <div className="shopn-mission-content-part">
                                    <div className="shopn-mission-content-image">
                                        <div className="img-wrapper circle-icon">
                                            <div className={`circle ${this.state.visible["3"] ? "reveal-pop-in" : "invisible"}`} />
                                            <img src={CONTENT.AssetPaths.graphics + "/" +
                                            "mission_3.svg"} className={`${this.state.visible["3"] ? "reveal-fade-in" : "invisible"}`} width="40"/></div>
                                    </div>
                                    <div className={`shopn-mission-content-text ${this.state.visible["3"] ? "reveal-slight-left" : "invisible"}`}>
                                        <p>{CONTENT.mission.content3}</p>
                                    </div>
                                </div>
                                <div className="shopn-mission-content-part">
                                    <div className="shopn-mission-content-image">
                                        <div className="img-wrapper circle-icon">
                                            <div className={`circle ${this.state.visible["4"] ? "reveal-pop-in" : "invisible"}`} />
                                            <img src={CONTENT.AssetPaths.graphics + "/" +
                                            "mission_4.svg"} className={`${this.state.visible["4"] ? "reveal-fade-in" : "invisible"}`}/></div>
                                    </div>
                                    <div className={`shopn-mission-content-text ${this.state.visible["4"] ? "reveal-slight-left" : "invisible"}`}>
                                        <p>{CONTENT.mission.content4}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </View>
                    </div>

                    <div className="shopn-mission-video">
                        <VideoPlayer {...CONTENT.mission.video} />
                    </div>

                </ContentSection>

  </div>
  )
 }
}
