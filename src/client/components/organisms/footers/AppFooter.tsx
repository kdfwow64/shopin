import * as React from "react";
import * as CONTENT from "core/constants/content";
export interface AppFooterProps {
}

const INITIAL_PROPS: AppFooterProps = {
};

export const AppFooter: React.SFC<AppFooterProps> = props => (
 <div className="app-footer">
    <div>
    <div className="footer-wrapper">
        <div className="footer-content site layout wrap">
            <div className="presale-form-wrapper">
                <h1>Shopin Token Presale Form</h1>
                <p>Join the revolution in democratizing your data and retailers on the open web</p>

                <div className="shpn-content-section__main">
                    {props.children}
                </div>
            </div>
            <div className="footer-bottom">
                <div className="copyright"><img src={CONTENT.AssetPaths.graphics + "/" + "logo.svg"} height="30" /> &copy; 2018 UnitedData, Inc. All Rights Reserved.</div>
                <div className="social">
                    <a href="https://www.pinterest.com/shopinEverywhere" target="_blank"><img src={CONTENT.AssetPaths.graphics + "/" + "social-pinterest.svg"} /></a>
                    <a href="https://www.linkedin.com/company/3346671/" target="_blank"><img src={CONTENT.AssetPaths.graphics + "/" + "social-linkedin.svg"} /></a>
                    <a href="https://www.facebook.com/shopineverywhere" target="_blank"><img src={CONTENT.AssetPaths.graphics + "/" + "social-facebook.svg"} /></a>
                    <a href="https://twitter.com/shopinapp" target="_blank"><img src={CONTENT.AssetPaths.graphics + "/" + "social-twitter.svg"} /></a>
                    <a href="http://telegram.me/shopineverywhere" target="_blank"><img src={CONTENT.AssetPaths.graphics + "/" + "social-telegram.svg"} height="25" width="25" /></a>
                </div>
            </div>
        </div>
    </div>
    </div>
</div>
);

AppFooter.defaultProps = INITIAL_PROPS;
