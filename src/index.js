import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import "./index.css";
//redux
import { createStore } from "redux";
import teamReducer from "./reducers/teamReducer";
const store = createStore(teamReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
