/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { MobileProvider } from "./util";
import { Route, Router, Switch, useHistory } from "react-router";
import { BrowserRouter } from "react-router-dom";

const Root = () => (
  <MobileProvider>
    <App />
  </MobileProvider>
);

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/:clubId?" component={Root} />
    </BrowserRouter>
  );
};

ReactDOM.render(<Routes />, document.getElementById("app"));
