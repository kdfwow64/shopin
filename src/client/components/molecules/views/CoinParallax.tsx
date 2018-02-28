import * as React from "react";
import { View } from "components/atoms";

export interface CoinParallaxProps {
}

export interface CoinParallaxState {
 entered: boolean;
}

const INITIAL_PROPS: CoinParallaxProps = {
};

const INITIAL_STATE: CoinParallaxState = {
 entered: false
};

export class CoinParallax extends React.Component<CoinParallaxProps, CoinParallaxState>
{
 public static defaultProps = INITIAL_PROPS;

 constructor ( props: CoinParallaxProps )
 {
  super(props);

  this.state = { ...INITIAL_STATE };
 }

 public render ()
 {
  return (
   <div className={`coin-parallax ${this.state.entered ? "entered" : ""}`}>
    <View onEnter={() => {
     if ( this.state.entered ) return;

     setTimeout(() => {
      this.setState({ entered: true });
     }, 300);
    }}>
     <div className="horizontal layout">
      <div className="flex">
       <div>
        <img src="/static/assets/images/graphics/etherium.png" />
       </div>
      </div>
      <div className="flex z-10">
       <img src="/static/assets/images/graphics/bitcoin.png" />
      </div>
      {/*<div className="flex">
       <img src="/static/assets/images/graphics/dollar.png" />
      </div>*/}
     </div>
    </View>
   </div>
  );
 }
}