import * as React from "react";

export interface ContentSectionProps {
 title?: string;
 subtext?: string;
 subtext1?: string;
 className?: string;
 id?:string;
 sectionClassName?: string;
}

const INITIAL_PROPS: ContentSectionProps = {
	id:""
};

export const ContentSection: React.SFC<ContentSectionProps> = props => (
<div id={props.id}>
 <div className={`shpn-content-section ${props.className} compact`}>
  <header>
   <h2>{props.title}</h2>
   <p>{props.subtext}</p>
   <p>{props.subtext1}</p>
  </header>
 </div>
 <div className={`shpn-content-section ${props.sectionClassName || props.className}`}>
   <div className="shpn-content-section__main">
    {props.children}
   </div>
  </div>
 </div>
);

ContentSection.defaultProps = INITIAL_PROPS;
