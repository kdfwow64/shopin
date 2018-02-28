import * as React from "react";
import { render } from "react-dom";
import { App } from "./App";
import "web-animations-js";
import "babel-polyfill";
import "./main.css";

const initializeServiceWorker = async () => {
 if ( "serviceWorker" in navigator === false ) return;

 await Promise.all([
  navigator.serviceWorker.register("/service-worker.js", { scope: "/" }),
  navigator.serviceWorker.ready
 ]);
};

document.addEventListener("DOMContentLoaded", () => {
 const target = document.querySelector("#root");

 render(<App />, target);
});

initializeServiceWorker();

const mod: any = module;

if ( mod.hot ) {
 mod.hot.accept();
}
