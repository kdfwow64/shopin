import * as React from "react";
import {AssetPaths} from "core/constants/content"
import { Img } from "components/atoms";

export interface ToastrCardProps {
 content?: string;
}

const INITIAL_PROPS: ToastrCardProps = {};

export const ToastrCard: React.SFC<ToastrCardProps> = props => (
  <div className = "toastrCard">
  	<div>
    	<img src={AssetPaths.graphics + "/coinnt.gif" } />
    </div>
    <div className="toastrContent">
    	{props.content}
    </div>
  </div>
);

ToastrCard.defaultProps = INITIAL_PROPS;
