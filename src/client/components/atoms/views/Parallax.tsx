import * as React from "react";
import {
 View
} from "./View";

export interface ParallaxProps {
}

export interface ParallaxState {
}

const INITIAL_PROPS: ParallaxProps = {
};

const INITIAL_STATE: ParallaxState = {
};

export class Parallax extends React.Component<ParallaxProps, ParallaxState>
{
 public render ()
 {
  return (<View onEnter={() => {
   console.log("ENTER!");
  }} onExit={() => {
   console.log("EXIT!");
  }}>{this.props.children}</View>)
 }
}
