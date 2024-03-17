import { type Component } from "solid-js";
import { Router, Route } from "@solidjs/router";

import AppRouterWrapper from "../layouts/AppRouterWrapper";

import HomePage from "../views/index";
import FirstTimePage from "../views/first-time";
import WorkspaceCreationInformationPage from "../views/workspace-creation/information"

const AppRouter: Component = () => {
  return (
    <Router root={AppRouterWrapper}>
      <Route path="/" component={HomePage} />

      <Route path="/workspace-creation">
        <Route path="information" component={WorkspaceCreationInformationPage} />
      </Route>

      <Route path="/first-time" component={FirstTimePage} />
    </Router>
  )
};

export default AppRouter;
