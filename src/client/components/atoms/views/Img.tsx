import * as React from "react";

export interface ImgProps {
 src?: string;
 className?: string;
 onClick?: ( e: any ) => void;
}

export interface ImgState {
 isLoaded: boolean;
}

const INITIAL_PROPS: ImgProps = {
 src: "",
 className: ""
};

const INITIAL_STATE: ImgState = {
 isLoaded: false
};

export class Img extends React.Component<ImgProps, ImgState>
{
 public static defaultProps = INITIAL_PROPS;

 public el: HTMLImageElement;

 constructor ( props: ImgProps )
 {
  super(props);

  this.state = { ...INITIAL_STATE };
 }

 public componentDidMount ()
 {
  if ( this.props.src ) {
      const img = new Image();

      img.src = this.props.src;
      img.onload = () => {
        window.dispatchEvent(new Event("resize"));
      };
  }
 }

 public render ()
 {
  const props = this.props;

  return (
   <img src={props.src} className={props.className} onClick={props.onClick} />
  )
 }
}
