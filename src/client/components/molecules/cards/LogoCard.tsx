import * as React from "react";
import {AssetPaths} from "core/constants/content"
import { Img } from "components/atoms";

export interface LogoProps {
	svgFile?:string
}

const INITIAL_PROPS: LogoProps = {
};

export const LogoCard: React.SFC<LogoProps> = props => (
 <div className="shpn-logo-item">
      <Img src={AssetPaths.graphics + "/" + props.svgFile} />
  </div>
);

LogoCard.defaultProps = INITIAL_PROPS;