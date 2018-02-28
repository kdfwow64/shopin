import * as React from "react";
import {
 addMilliseconds,
 differenceInMilliseconds
} from "date-fns";

interface Time {
 days: string;
 hrs: string;
 mins: string;
 secs: string;
}

export interface CountdownProps {
 duration?: number;
 end?: Date;
 onComplete?: () => void;
}

export interface CountdownState {
 time: Time;
}

const INITIAL_PROPS: CountdownProps = {
 duration: 0
};

const INITIAL_STATE: CountdownState = {
 time: {
  days: "",
  hrs: "",
  mins: "",
  secs: "" 
 } 
};

export class Countdown extends React.Component<CountdownProps, CountdownState>
{
 public static defaultProps = INITIAL_PROPS;

 private _interval: any;

 constructor ( props: CountdownProps )
 {
  super(props);

  const time = props.end ? msToTime(differenceInMilliseconds(props.end, new Date())) : INITIAL_STATE.time;

  this.state = { ...INITIAL_STATE, time };
 }

 public componentDidMount (): void
 {
  this.update();
 }

 public componentWillUnmount (): void
 {
  this.destroy();
 }

 public componentWillReceiveProps ( newProps: CountdownProps ): void
 {
  const props = this.props;

  if ( props.end != newProps.end ) {
   this.update(newProps);
  }
 }

 public update ( props = this.props ): void
 {
  const {
   onComplete,
   duration,
   end
  } = this.props;

  let timeLeft = end ? differenceInMilliseconds(end, new Date()) : Number(duration);
  const endDate = end ? end : addMilliseconds(new Date(), timeLeft); 

  clearInterval(this._interval);

  const interval = this._interval = setInterval(() => {
   if ( interval != this._interval ) return;

   const ms = differenceInMilliseconds(endDate, new Date());
   const time = msToTime(ms);

   this.setState({
    time
   });

   if ( ms <= 0 && onComplete ) {
    onComplete();
    this.destroy();
   }
  }, 1000);
 }

 public destroy ()
 {
  this._interval = clearInterval(this._interval);
 }

 public render ()
 {
  const { time } = this.state;

  return (
   <div className="shpn-countdown">
    <span>{time.days}</span>
    :
    <span>{time.hrs}</span>
    :
    <span>{time.mins}</span>
    :
    <span>{time.secs}</span>
   </div>
  )
 }
}

function msToTime ( s: any ): Time {
 const pad = ( n: number, z: number = 2 ) => {
  return ('00' + n).slice(-z);
 };

 let ms = s % 1000;
 s = (s - ms) / 1000;
 let secs = s % 60;
 s = (s - secs) / 60;
 let mins = s % 60;
 let hrs = (s - mins) / 60;
 let days = Math.floor(hrs / 24);

 hrs = hrs - (days * 24);

 return {
  secs: pad(secs),
  mins: pad(mins),
  hrs: pad(hrs),
  days: String(days)
 };
}
