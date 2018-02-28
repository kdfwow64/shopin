import * as React from "react";
import * as CONTENT from "core/constants/content";
import { View } from "components/atoms";

export interface RoadmapTimelineProps {
}

export interface RoadmapTimelineState {
}

const INITIAL_PROPS: RoadmapTimelineProps = {
};

const INITIAL_STATE: RoadmapTimelineState = {
};

export class RoadmapTimeline extends React.Component<RoadmapTimelineProps, RoadmapTimelineState>
{
 public static defaultProps = INITIAL_PROPS;

 private _el: HTMLElement;
 private _currentMonth = -1;
 private _targetMonth = -1;
 private _restingMonth = -1;
 private _maxMonth = -1;
 private _updating = false;
 private _months = [];

 constructor ( props: RoadmapTimelineProps )
 {
  super(props);

  this.state = INITIAL_STATE;
 }

 private _onMonthEnter ( month, index )
 {
  if ( index > this._currentMonth ) {
   this._currentMonth = index;

   this._highlightActive();
  }
 }

 private _highlightActive ()
 {
  if ( this._updating ) return;

  this._updating = true;
  const duration = 500;
  const start = this._currentMonth;
  const target = this._targetMonth;
  const update = () => {
   let totalDiff = this._currentMonth - this._restingMonth;

   if ( totalDiff <= 0 ) {
    this._updating = false;

    clearInterval(interval);

    return;
   };
   
   const nextIndex = this._restingMonth + 1;
   const month = this._months[nextIndex];

   month.el.classList.add("highlight");

   if ( nextIndex == CONTENT.roadmap.timeline[0].months.length ) {
    this._el.querySelector(".year-2018").classList.add("highlight");
   }

   this._restingMonth = nextIndex;
  };
  const interval = setInterval(() => {
      try {
        update(); 
      } catch ( error ) {
        clearInterval(interval);  
      }
  }, duration);

  setTimeout(() => {
   update();
  }, 1);
 }

 public render ()
 {
    let today = new Date();

    today = new Date(today.getFullYear(), today.getMonth());

  return (
   <View onEnter={() => {
   }}>
     <ul className="timeline" ref={el => {
         if ( !el || this._el ) return;

         this._el = el;
     }}>
       <li>
           <View className="year-wrapper">
                <div className="year">2017</div>
            </View>
       </li>

      {CONTENT.roadmap.timeline[0].months.map(( month, index ) => (
         <li key={`2017-${month.title}`}>
          <View className={`month horizontal layout ${index % 2 == 0 ? "direction-l" : "direction-r end-justified"}`} onEnter={() => this._onMonthEnter(month, index)} ref={( el ) => {
           if ( !el || this._months.indexOf(el) > -1 ) return;

           this._months.push(el);
          }}>
           <div className={`timeline__month`}>
              <div className={`timeline__block`}>
                  <div className="connector"><span /></div>
                  <div className="flag-wrapper">
                      <span className="time-wrapper"><span className="time">{month.title}</span></span>
                      {/*<span className="flag">{CONTENT.roadmap.heading1}</span>*/}
                  </div>
                  <div className="desc pad__t-2" dangerouslySetInnerHTML={({ __html: month.content })} />
              </div>
             </div>
            </View>
         </li>
      ))} 

      <li>
        <View className="year-wrapper year-2018">
            <div className="year">2018</div>
        </View>
      </li>

      {CONTENT.roadmap.timeline[1].months.map(( month, index ) => {
          const monthDate = new Date(month.title);
          const isThisMonth = today.valueOf() == monthDate.valueOf();
          const isFutureMonth = today.valueOf() > monthDate.valueOf();
                    
        return (
         <li key={`2018-${month.title}`}>
          <View className={`month horizontal layout ${isThisMonth ? "timeline-highlight" : "" } ${index % 2 == 0 ? "direction-l" : "direction-r end-justified"} ${isFutureMonth ? "in-future" : ""}`}
          onEnter={() => this._onMonthEnter(month, index + CONTENT.roadmap.timeline[0].months.length)}
          ref={( el ) => {
           if ( !el || this._months.indexOf(el) > -1 || monthDate > today ) return;

           this._months.push(el);
          }}>
           <div className={`timeline__month`}>
              <div className={`timeline__block`}>
                  <div className="connector"><span /></div>
                  <div className="flag-wrapper">
                      <span className="time-wrapper"><span className="time">{month.title}</span></span>
                      {/*<span className="flag">{CONTENT.roadmap.heading1}</span>*/}
                  </div>
                  <div className="desc pad__t-2" dangerouslySetInnerHTML={({ __html: month.content })} />
              </div>
             </div>
            </View>
         </li>
      )})}
     </ul>
   </View>
  );
 }
}
