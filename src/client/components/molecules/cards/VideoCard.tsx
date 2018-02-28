import * as React from "react";
import { Video } from "core/types";
import {AssetPaths} from "core/constants/content";
import {videoClass} from "core/constants/content";
import { Img } from "components/atoms";
export interface VideoCardProps {
 video: Video,
 index ?: number;
}

export interface VideoCardState {
 hasUserInteracted: boolean;
}

const INITIAL_PROPS: VideoCardProps = {
 video: {
  name: "",
  title: "",
  src: "",
  splash: ""
 }
};

const INITIAL_STATE: VideoCardState = {
 hasUserInteracted: false
};

export class VideoCard extends React.Component<VideoCardProps, VideoCardState>{

  public static defaultProps = INITIAL_PROPS;

  constructor ( props: VideoCardProps )
  {
   super(props);
   this.state = INITIAL_STATE;

  }

  public render(){
    const props = this.props;
    const state = this.state;

      if(state.hasUserInteracted){
        return(
                <div className={"shopn-video-card " + videoClass[props.index]}>
                  <div className="shopn-video-card__content">
                    <div className="shpn-video-player ">
                        <div className="shpn-video-player__splash"
                          style={({ backgroundImage: "none" })}>
                          <iframe
                            src={props.video.src}
                            frameBorder='0'
                          />
                        </div>
                      </div>
                      <div className="shopn-video-desc">
                          <div className="shopn-video-name">
                                {props.video.name}
                          </div>
                          <div className="shopn-video-title">
                                {props.video.title}
                          </div>
                      </div>
                  </div>
                </div>
        )
      }
      else{
        return(
          <div className={"shopn-video-card " + videoClass[props.index]} >
            <div className="shopn-video-card__content">
             <div className="shopn-video-container"
            style={({ backgroundImage: `url(${props.video.splash})` })}>
              <div className="shopn-video-icon-t">
                  <Img src={AssetPaths.graphics + "/play-icon.svg"}
                  onClick={() => this.setState({ hasUserInteracted: true })} />
              </div>
            </div>
              <div className="shopn-video-desc">
                  <div className="shopn-video-name">
                        {props.video.name}
                  </div>
                  <div className="shopn-video-title">
                        {props.video.title}
                  </div>
              </div>
            </div>
         </div>
        );
      }
  }

}

//  export const VideoCard: React.SFC<VideoCardProps> = ({ video }) => (
//   <div className="shopn-video-card">
//      <div className="shopn-video-container"
//     style={({ backgroundImage: `url(${video.splash})` })} >
//       <div className="shopn-video-icon">
//           <img src={AssetPaths.graphics + "/play-icon.svg"} />
//       </div>
//     </div>
//       <div className="shopn-video-desc">
//           <div className="shopn-video-name">
//                 {video.name}
//           </div>
//           <div className="shopn-video-title">
//                 {video.title}
//           </div>
//       </div>
//  </div>
// );

VideoCard.defaultProps = INITIAL_PROPS;
