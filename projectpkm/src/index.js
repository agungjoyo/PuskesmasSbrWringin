import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "simplebar/src/simplebar.css";

import "assets/scss/material-kit-react.scss?v=1.10.0";
//import routes
import App from "App";

var hist = createBrowserHistory();

ReactDOM.render(
  <HelmetProvider history={hist}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById("root")
);
