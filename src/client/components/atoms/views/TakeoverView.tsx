import * as React from "react";
import {
 bodyPositionFixed,
 bodyPositionUnfixed
} from "core/utilities";
import {
 lockDocumentScroll,
 unlockDocumentScroll
} from "core/utilities";

export interface TakeoverViewProps {
 toggle?: any;
 open?: boolean;
 onClose?: () => void;
}

export interface TakeoverViewState {
 scrollY: number;
 isOpen: boolean;
}

const INITIAL_PROPS: TakeoverViewProps = {};

const INITIAL_STATE: TakeoverViewState = {
 scrollY: 0,
 isOpen: false
};

export class TakeoverView extends React.Component<TakeoverViewProps, TakeoverViewState>
{
 public static defaultProps = INITIAL_PROPS;

 constructor ( props: TakeoverViewProps )
 {
  super(props);

  this.state = INITIAL_STATE;
 }

 public componentDidMount ()
 {
   if ( this.props.open ) this.open();
 }

 public componentWillReceiveProps ( newProps: TakeoverViewProps ): void
 {
  if ( newProps.open != this.state.isOpen ) {
   newProps.open ? this.open() : this.close();
  }
 }

 public async open ()
 {
  const scrollY = window.scrollY;

  this.setState({
   scrollY,
   isOpen: true
  });

  lockDocumentScroll();
 }

 public async close ()
 {
  this.setState({ isOpen: false });

  unlockDocumentScroll();

  setTimeout(() => {
   if ( this.props.onClose ) this.props.onClose();
  });
 }

 public render ()
 {
  const props = this.props;

  return (
   <div className="shpn-takeover-view">
    <div className="shpn-takeover-view__pane bg-lightest absolute client-width client-height scroll-y"
     style={({ top: `${this.state.scrollY}px`, left: "0", zIndex: 10000 })}
     hidden={!this.state.isOpen}>
     {props.children}
    </div>
   </div>
  );
 }
}
