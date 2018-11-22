import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "@assets/css/index.less";
import FastClick from 'fastclick';
import '@utils/setRem';

FastClick.attach(document.body);

ReactDOM.render(<App />, document.getElementById("root"));
