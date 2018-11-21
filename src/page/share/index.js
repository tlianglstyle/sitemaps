import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "@assets/css/index.scss";
import FastClick from 'fastclick';
import '@utils/setRem';

FastClick.attach(document.body);

ReactDOM.render(<App />, document.getElementById("root"));
