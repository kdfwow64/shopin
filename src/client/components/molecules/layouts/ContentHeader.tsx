import * as React from "react";

export interface ContentHeaderProps {
 title?: string;
 center?: boolean;
}

const INITIAL_PROPS: ContentHeaderProps = {
  center: false
};

export const ContentHeader: React.SFC<ContentHeaderProps> = props => (
  	<div className="shopn-header-container site compact">
      <div className={`shopn-header-content ${props.center ? "text-align-center fit-width" : ""}`}>
        {props.title}
        <img src="/static/assets/images/graphics/trophy.png" className="trophy_img"/>
      </div>
   </div>
);