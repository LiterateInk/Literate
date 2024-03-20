import "@unocss/reset/tailwind.css";
import "@fontsource/lexend/400.css";
import "@fontsource/lexend/500.css";
import "@fontsource/lexend/600.css";
import 'virtual:uno.css';

/* @refresh reload */
import { render } from 'solid-js/web';
import { Presence } from "solid-motionone";
import { Router, Route, Navigate } from "@solidjs/router";

import HomePage from "~/views/index";
import FirstTimePage from "~/views/first-time";

import WorkspaceCreationWrapper from "~/components/layouts/WorkspaceCreationWrapper";
import WorkspaceCreationServicesPage from "~/views/workspace-creation/services"
import WorkspaceCreationInformationPage from "~/views/workspace-creation/information"

render(() => (
  <Router root={(props) => <Presence>{props.children}</Presence>}>
    <Route path="/" component={HomePage} />

    <Route path="/workspace-creation" component={WorkspaceCreationWrapper}>
      <Route path="information" component={WorkspaceCreationInformationPage} />
      <Route path="services" component={WorkspaceCreationServicesPage} />
      <Route path="*404" component={() => <Navigate href="information" /> } />
    </Route>

    <Route path="/first-time" component={FirstTimePage} />
  </Router>
), document.getElementById("root")!);
