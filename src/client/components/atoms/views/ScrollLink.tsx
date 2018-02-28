import * as React from "react";
import {
 lockDocumentScroll,
 unlockDocumentScroll
} from "core/utilities";
import {
    resizeListeners,
    scrollListeners,
    scrollPosition
} from "./View";

let LATEST_TICK: Function = null;

export interface ScrollLinkProps {
 target?: string;
 offset?: number;
 speed?: number;
 closeMobileMenu?:any;
}

export interface ScrollLinkState {
    isActive: boolean;
}

const INITIAL_PROPS: ScrollLinkProps = {
 speed: 0.05,
 offset: -100
};


export class ScrollLink extends React.Component<ScrollLinkProps, ScrollLinkState>
{
 public static defaultProps = INITIAL_PROPS;
 public static active: ScrollLink;
 private static _links: ScrollLink[] = [];
 private static _listening = false;

 private _targetY = 0;
 private _el: HTMLElement;

 constructor ( props: ScrollLinkProps )
 {
    super(props);

    this.state = { isActive: false };
 }

 public componentDidMount ()
 {
  setTimeout(() => {
    this.scan();
  }, 1);

    ScrollLink._links.push(this);

    if ( !ScrollLink._listening ) {
        ScrollLink._listening = true;

        const check = () => {
            let found: ScrollLink;
            const scrollY = scrollPosition.y
            const offset = (scrollPosition.h / 3);

            for ( let i = 0; i < ScrollLink._links.length; ++i ) {
                const link = ScrollLink._links[i];
                const next = ScrollLink._links[i + 1];

                if ( (link._targetY - offset) <= scrollPosition.y 
                && (next ? (next._targetY - offset) >= scrollY : true)) {
                    if ( link == ScrollLink.active ) {
                        found = link;
                        
                        break;
                    }

                    if ( ScrollLink.active ) {
                        ScrollLink.active.setState({ isActive: false });
                    }

                    ScrollLink.active = link;
                    link.setState({ isActive: true });

                    found = link;

                    break;
                }
            }

            if ( !found && ScrollLink.active ) {
                ScrollLink.active.setState({ isActive: false });

                ScrollLink.active = null;
            }
        };
        
        scrollListeners.push(check);
        setTimeout(() => check(), 1);
    }

    resizeListeners.push(() => this.scan());
 }

 public scan (): void
 {
  const target: HTMLElement = document.querySelector(this.props.target);

  if ( !target ) return;
 
  this._targetY = target.offsetTop + this.props.offset;
 }

 public async scrollToTarget ()
 {
  let isTicking = true;
  const speed = this.props.speed;
  const startY = window.scrollY;
  const targetY = this._targetY; 
  const isTargetLower = targetY > startY;
  let y = startY;
  

  const tick = () => {
   if ( !isTicking || LATEST_TICK != tick ) return;

   const delta = Math.abs(targetY - y);

   y += (isTargetLower ? delta : -delta) * speed;

   window.scrollTo(0, y);

   if ( isTargetLower && Math.ceil(y) >= targetY
    ||  !isTargetLower && Math.floor(y) <= targetY
   ) {
    isTicking = false;

    unlockDocumentScroll();
   };

   requestAnimationFrame(tick);
  };

  LATEST_TICK = tick;

  this.scan();
  lockDocumentScroll();
  requestAnimationFrame(tick);
 }

 public render ()
 {
  return (
   <a className={`scroll-link ${this.state.isActive ? "active" : ""}`} href={this.props.target} onClick={event => {
    event.preventDefault();
    event.stopPropagation();
    this.scrollToTarget();
    this.props.closeMobileMenu()
   }} ref={el => {
       if ( !el || this._el ) return;

       this._el = el;
   }}>
    {this.props.children}
   </a>
  )
 }
}
