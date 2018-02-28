import * as React from "react";
import {
 Switch,
 Route
} from "react-router-dom";
import {
 HomeContainer,loadData
} from "./containers";



export const Routes = [
  {
      path: '/',
      component: HomeContainer,
      exact: true,
      loadData:loadData
  }
]
