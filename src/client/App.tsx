declare var window: Window & { __initialState__: any,SHOPIN_RECENT_INVESTORS_TOTAL_LEN:number };

import * as React from "react";
import { Provider } from "react-redux";
import {renderRoutes} from "react-router-config";
import {
 ConnectedRouter as Router
} from "react-router-redux";
import createHistory from 'history/createBrowserHistory'
import {
 Shell
} from "./containers";
import { buildStore } from "../core/store";
import { Routes } from "./Routes";

const history = createHistory();
const store = buildStore(history, window.__initialState__);

export const AppMain = ( props: any ) => (
 <Shell>
  <div>{renderRoutes(Routes)}</div>
 </Shell>
);

export const App = () => (
 <Provider store={store}>
  <Router history={history}>
   <AppMain />
  </Router>
 </Provider>
);
