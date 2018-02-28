import * as React from "react";
import { Provider } from "react-redux";
import {
 StaticRouter as Router,
 Switch,
 Route } from "react-router-dom";
//import { buildStore } from "../core/store";
import {renderRoutes} from 'react-router-config'; // new
import { Routes } from "../client/Routes";
import { Shell } from "../client/containers";

export interface AppProps {
 location: string,
 store:any
}

//const store = buildStore();// send as props
const context = {};

export const App: React.SFC<AppProps> = ( props: AppProps ) => (
 <Provider store={props.store}>
   <Router location={props.location} context={context}>
    <Shell>
     <div>{renderRoutes(Routes)}</div>
    </Shell>
   </Router>
 </Provider>
);
