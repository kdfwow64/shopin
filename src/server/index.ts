import * as express from "express";
import * as fs from "fs";
import * as http from "http";
import * as https from "https";
import * as React from "react";
import * as ReactDOM from "react-dom/server";
import * as compression from "compression";
import * as helmet from "compression";
import * as bodyParser from "body-parser";
import * as path from "path";
import { Html } from "../client/containers";
import {matchRoutes} from 'react-router-config';
import { Routes } from "../client/Routes";
import { App } from "./App";
import createStore from "./serverStore";
import * as apiRoutes from "./apiRoutes";
import {placeHolderStore} from "core/constants/content"
const APP = express();
const PORT = (process.env.PORT || 4080);

APP.enable('trust proxy');

const handleReactRoute = ( req: any, res: any ) => {
  const store = createStore();
  // Handle all data loading required
  //// Below logic to initialize and load data into the store
  const promises = matchRoutes(Routes,req.path).map(({route}) => {
      return route.loadData? route.loadData(store):null;
  });
  Promise.all(promises).then(() => {
    // render after data is fetched
   
    let storeAsString = JSON.stringify(store.getState());
    const root = ReactDOM.renderToString(App({ location: req.url,store:store }));
    const html = ReactDOM.renderToStaticMarkup(Html({ root:root,store:store,storeAsString:storeAsString,title:"Welcome to Shopin tokensale ICO. Won 1st place ICO at BTC Miami. Join Now!" }));
    res.send(html);
  }).catch(function(err) {
      console.log("in error case ");
      console.log(store);
      let storeAsString = JSON.stringify(placeHolderStore);
      const root = ReactDOM.renderToString(App({ location: req.url,store:store }));
      const html = ReactDOM.renderToStaticMarkup(Html({ root:root,store:store,storeAsString:storeAsString,title:"Welcome to Shopin tokensale ICO. Won 1st place ICO at BTC Miami. Join Now!" }));
      res.send(html);
  });

};

const routes = ["/"];

APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({ extended: true }));
APP.use(compression());
APP.use(helmet());
APP.use("/static", express.static(path.join(__dirname, "static")));

routes.forEach(path => APP.get(path, handleReactRoute));
apiRoutes.routeArr.forEach( (route_elem) => {
  APP.use("/", route_elem);
});

console.log("app is listening on port => ", PORT);

APP.listen(PORT);
