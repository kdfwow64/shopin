import * as React from "react";
import {AssetPaths} from "core/constants/content";

export interface VideoPlayerProps {
 title?: string;
 subtitle?: string;
 description?: string;
 placeholderSrc?: string;
 videoSrc?: string;
 className?: string;
}

export interface VideoPlayerState {
 hasUserInteracted: boolean;
}

const INITIAL_PROPS: VideoPlayerProps = {
    className: ""
};

const INITIAL_STATE: VideoPlayerState = {
 hasUserInteracted: false
};

export class VideoPlayer extends React.Component<VideoPlayerProps, VideoPlayerState>
{
 public static defaultProps = INITIAL_PROPS;

 constructor ( props: VideoPlayerProps )
 {
  super(props);

  this.state = INITIAL_STATE;
 }

 public render ()
 {
  const props = this.props;
  const state = this.state;

  return (
   <div className={`shpn-video-player relative ${props.className}`} ref={el => {
   }}>
    {state.hasUserInteracted ? (
     <div className="bg-lightest fit-width fit-height absolute">
         <iframe
           src={props.videoSrc}
           frameBorder='0' 
           allowFullScreen
         />
     </div>
    ) :
   <div className="shpn-video-player__splash cursor" onClick={() => this.setState({ hasUserInteracted: true })}>

     <div className="shpn-video-player__splash--content">
      <div className="shopn-video-icon-1">
      <div className="shopn-video-icon">
          <img src={AssetPaths.graphics + "/play-icon.svg"} />
      </div>
      </div>
     </div>
    </div>
    }
   </div>
  )
 }
}
