import * as React from "react";

export interface DropDownViewProps {
 top?: any;
 bottom?: any;
 className?: string;
 open?: boolean;
 onOpen?: () => void;
 onClose?: () => void;
}

export interface DropDownViewState {
 isOpen: boolean;
}

const INITIAL_PROPS: DropDownViewProps = {
 className: ""
};

const INITIAL_STATE: DropDownViewState = {
 isOpen: false
};

export class DropDownView extends React.Component<DropDownViewProps, DropDownViewState>
{
 public static defaultProps = INITIAL_PROPS;

 private _el: any;
 private _els: any;
 private _lastHeight: number;
 private _opening: boolean = false;
 private _closing: boolean = false;

 constructor ( props: DropDownViewProps )
 {
  super(props);

  this.state = { ...INITIAL_STATE };
 }

 public componentDidMount ()
 {
  if ( !this._el ) return;

  this._els = {
   top: this._el.querySelector(".shpn-drop-down-view__top"),
   bottom: this._el.querySelector(".shpn-drop-down-view__bottom"),
   background: this._el.querySelector(".shpn-drop-down-view__background")
  };
 }

 public componentWillReceiveProps ( newProps: DropDownViewProps )
 {
  if ( typeof newProps.open == "boolean" && newProps.open !== this.state.isOpen ) {
   if ( newProps.open ) this.open();
   else this.close();
  }
  if ( this.props.top != newProps.top || this.props.bottom != newProps.bottom ) {
      this.close();
  }
 }

 public open ()
 {
  if ( this._opening ) return;

  this._opening = true;

  const topHeight = this._els.top.offsetHeight + 20;

  this._els.bottom.style.display = "block";
  this._els.bottom.style.top = `${window.innerWidth < 720 ? topHeight : topHeight - 20}px`;

  const bottomHeight = this._els.bottom.offsetHeight;
  const scale = (topHeight + bottomHeight) / topHeight;
  const finalHeight = `${topHeight + bottomHeight}px`;

  this._lastHeight = topHeight;

  this._els.bottom.animate([
   { opacity: 0 },
   { opacity: 1 }
  ], {
   duration: 225,
   easing: "ease-out"
  })
  this._el.animate([
   { height: `${topHeight}px` },
   { height: finalHeight }
  ], {
   duration: 225,
   easing: "ease-out"
  }).onfinish = () => {
   this._el.style.height = finalHeight;

   this.setState({ isOpen: true });
   setTimeout(() => this._dispatchResize(), 1);

   this._opening = false;

   if ( this.props.onOpen ) this.props.onOpen();
  };
 }

 public close ()
 {
  if ( this._closing ) return;

  this._closing = true;

  const topHeight = this._els.top.offsetHeight;
  const bottomHeight = this._els.bottom.offsetHeight;
  const scale = (topHeight + bottomHeight) / topHeight;
  const finalHeight = `${topHeight + bottomHeight}px`;

  this._els.bottom.animate([
   { opacity: 1 },
   { opacity: 0 }
  ], {
   duration: 225,
   easing: "ease-out"
  })
  this._el.animate([
   { height: finalHeight },
   { height: `${topHeight}px` }
  ], {
   duration: 225,
   easing: "ease-out"
  }).onfinish = () => {
   this._el.style.height = ""; 
   this._els.bottom.style.display = "none";

   this.setState({ isOpen: false });
   setTimeout(() => this._dispatchResize(), 1);

   this._closing = false;

   if ( this.props.onClose ) this.props.onClose();
  };
 }

 private _dispatchResize (): void
 {
  window.dispatchEvent(new Event("resize"));
 }

 public render ()
 {
  const { isOpen } = this.state;

  return (
   <div className={`shpn-drop-down-view relative ${this.props.className} ${isOpen ? "drop-down-open": ""}`} ref={el => {
    if ( !el || this._el ) return;

    this._el = el;
   }}>
    <div className={`shpn-drop-down-view__background`} />
    <div className={`shpn-drop-down-view__top`} onClick={() => {
     if ( this.state.isOpen  ) this.close(); 
     else this.open();
    }}>
     {this.props.top}
    </div>
    <div className={`shpn-drop-down-view__bottom pad-4 absolute top-100 left-0 right-0`}>
     {this.props.bottom}
    </div>
   </div>
  );
 }
}
