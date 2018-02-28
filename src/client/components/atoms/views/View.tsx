import * as React from "react";

function withinBounds ( tY: number, bY: number , tY2: number, bY2: number ): boolean
{
 return (tY < bY2 && tY2 < bY);
}

export let scrollPosition = { x: 0, y: 0, h: 0, w: 0 };
export let scrollListeners: any[] = [];
export let resizeListeners: any[] = [];
let scroller: any;
let resizeTick: any;

export interface ViewProps {
 className?: string;
 onEnter?: () => void;
 onExit?: () => void;
}

export interface ViewState {
 entered: boolean;
}

const INITIAL_PROPS: ViewProps = {
 className: ""
};

const INITIAL_STATE: ViewState = {
 entered: false
};

export class View extends React.Component<ViewProps, ViewState>
{
 public static defaultProps = INITIAL_PROPS;

 public el: HTMLElement;
 public x: number = 0;
 public y: number = 0;
 public w: number = 0;
 public h: number = 0;
 public b: number = 0;

 private _isWithinBounds: boolean = false;

 constructor ( props: ViewProps )
 {
  super(props);

  this.state = INITIAL_STATE;
 }

 public componentDidMount ()
 {
  if ( !this.el ) return;

  if ( !scroller ) {
   let ticking = false;
   let resizeTicking = false;
   const tick = () => {
    ticking = false;

    for ( let listener of scrollListeners ) {
     listener(scrollPosition);
    }
   };
   const resizeTick = () => {
    resizeTicking = false;

    for ( let listener of resizeListeners ) {
     listener(scrollPosition);
    }
   };

   scroller = () => {
    if ( ticking ) return;

    ticking = true;
    scrollPosition.x = window.scrollX;
    scrollPosition.y = window.scrollY;

    window.requestAnimationFrame(tick);
   };

   let resizer = () => {
    if ( resizeTicking ) return;

    resizeTicking = true;
    scrollPosition.w = window.innerWidth;
    scrollPosition.h = window.innerHeight;

    window.requestAnimationFrame(resizeTick);
   };

   window.addEventListener("scroll", scroller);
   window.addEventListener("resize", resizer);

   scroller();
   resizer();
  }

  scrollListeners.push(this._onScroll.bind(this));
  resizeListeners.push(this._scan.bind(this));

  setTimeout(() => {
   this._scan();
   this._onScroll(scrollPosition);
  }, 1);
 }

 private _scan ()
 {
  const rect = this.el.getBoundingClientRect();

  let currentEl: any = this.el;
  let x = 0;
  let y = 0;

  do {
   x += currentEl.offsetLeft;
   y += currentEl.offsetTop;
  } while ( currentEl = currentEl.offsetParent );

  this.w = rect.width; 
  this.h = rect.height; 
  this.x = x; 
  this.y = y; 
  this.b = this.h + this.y;
 }

 private _onScroll ( viewport: any )
 {
  const isWithinBounds = withinBounds(viewport.y, viewport.y + viewport.h, this.y, this.y + this.h);

  if ( this._isWithinBounds && !isWithinBounds ) {
   if ( this.props.onExit ) this.props.onExit();
  } else if ( isWithinBounds && !this._isWithinBounds ){
   if ( this.props.onEnter ) this.props.onEnter();
   if ( !this.state.entered ) this.setState({ entered: true });
  }

  this._isWithinBounds = isWithinBounds;
 }

 public render ()
 {
  return (
   <div className={`view ${this.props.className} ${this.state.entered ? "entered" : ""}`} ref={el => {
    if ( !el || this.el ) return;

    this.el = el;
   }}>{this.props.children}</div>
  )
 }
}
