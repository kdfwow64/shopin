import 'babel-polyfill';
declare var window: Window & { devToolsExtension: any, __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any,INITIAL_STATE: any };

import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { ConnectedRouter, routerReducer, routerMiddleware } from "react-router-redux";
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'; 
import {
 formsReducer,
 FormsState
} from "./forms";

import reducers from '../reducers';
export type RootState = {
}

const recoverState = ( state: RootState = {} as RootState ): RootState => ({ ...state } as RootState);
// const rootEpic = combineEpics();

export const buildStore = ( history?: any, initialState: any = {} ) => {
 const routeMiddleware = routerMiddleware(history);
 const composeEnhancers = (false ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose);
 return createStore(
   reducers,
   window.INITIAL_STATE,
   composeEnhancers(
    applyMiddleware(thunk,routeMiddleware)
   )
 );

}

export type Store = { getState: () => RootState, dispatch: Function };
