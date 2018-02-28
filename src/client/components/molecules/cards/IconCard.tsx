import * as React from "react";
import {cardClass} from "core/constants/content"
import {AssetPaths} from "core/constants/content"
import { Img } from "components/atoms";
export interface IconCardProps {
 src?: string;
 title?: string;
 index?:number
}

const INITIAL_PROPS: IconCardProps = {};

export const IconCard: React.SFC<IconCardProps> = props => (
 <div className={"icon-card " + cardClass[props.index]}>
  <div className="icon-card__img">
    <Img src={props.src} className="fit-width" />
    <div className="icon-card__shadow" />
  </div>
  
  <div className="icon-card__content"><p>{props.title}</p></div>
</div>
);

IconCard.defaultProps = INITIAL_PROPS;
