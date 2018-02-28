import * as React from "react";
import { Colors } from "../../core/constants";
import { AssetPaths } from "../../core/constants/content";

export interface HtmlProps {
  title?: string;
  root?: string;
  store?: any;
  storeAsString?: any;
}

const INITIAL_PROPS: HtmlProps = {
  title: "Shopin ICO"
};

function renderScript(store) {
  return { __html: `<script type='text/javascript'>  window.INITIAL_STATE = ${store};</script>` }
}

export const Html: React.SFC<HtmlProps> = (props: HtmlProps) => (
  <html lang="en-us">
    <head>
      <title>{props.title}</title>
      <meta name="theme-color" content={Colors.PRIMARY_COLOR} />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" type="image/png" href={AssetPaths.graphics + "/logo_32.png"}/>
      <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500" rel="stylesheet" />
      <link rel="stylesheet" href="/static/main.bundle.css" />

      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="Enjio" />

      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={props.title} />

      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      <link rel="apple-touch-icon" href={AssetPaths.manifest + "/icon-48x48.png"} />
      <link rel="apple-touch-icon" sizes="72x72" href={AssetPaths.manifest + "/icon-72x72.png"} />
      <link rel="apple-touch-icon" sizes="96x96" href={AssetPaths.manifest + "/icon-96x96.png"} />
      <link rel="apple-touch-icon" sizes="144x144" href={AssetPaths.manifest + "/icon-144x144.png"} />
      <link rel="apple-touch-icon" sizes="192x192" href={AssetPaths.manifest + "/icon-192x192.png"} />

      <meta name="msapplication-TileImage" content={AssetPaths.manifest + " /icon-144x144.png"} />
      <meta name="msapplication-TileColor" content={Colors.PRIMARY_COLOR} />
      <meta name="msapplication-tap-highlight" content="no" />


    </head>
    <body className="fullbleed">
      <div id="root" dangerouslySetInnerHTML={({ __html: props.root })}></div>

      <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js" />
      <script src="https://d3js.org/d3.v4.min.js" />
      <script async defer src={AssetPaths.thirdParty + "/gtm.js"} />
      <div id="store" dangerouslySetInnerHTML={renderScript(props.storeAsString)}></div>
      <div id="env_var" dangerouslySetInnerHTML= {{__html: `<script type='text/javascript'>  window.SHOPIN_RECENT_INVESTORS_TOTAL_LEN = ${process.env.SHOPIN_RECENT_INVESTORS_TOTAL_LEN};</script>`}}></div>
      <script src="/static/shopin-ico-web.browser.js" />
      <script async defer src={AssetPaths.thirdParty + "/zendesk-integration.js"} />
      <script type="text/javascript" src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async></script>
      <script async defer src={"/onesignal-integration.js"} />
    </body>
  </html>
);

// <script src="/static/shopin-ico-web.browser.js"></script>

Html.defaultProps = INITIAL_PROPS;
