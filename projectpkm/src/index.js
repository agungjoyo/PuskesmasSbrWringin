import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "simplebar/src/simplebar.css";

import "assets/scss/material-kit-react.scss?v=1.10.0";
//import routes
import App from "App";
import rootReducer from "views/store/reducers/rootReducer";

var hist = createBrowserHistory();

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider history={hist}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </Provider>,
  document.getElementById("root")
);
