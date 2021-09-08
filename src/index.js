import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

//Following is Code for firebase
//imports:
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
//initialization:
var config = {
  apiKey: "AIzaSyCMLXNCXcd3McyYtRYjHtKjrk-O5aN9h4o",
  authDomain: "nutricious-f7f8a.firebaseapp.com",
  databaseURL: "https://nutricious-f7f8a.firebaseio.com",
  projectId: "nutricious-f7f8a",
  storageBucket: "nutricious-f7f8a.appspot.com",
  messagingSenderId: "501429354140"
};
firebase.initializeApp(config);

//Render App
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
