import 'virtual:uno.css';
import "@unocss/reset/tailwind.css";

/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, Route } from "@solidjs/router";

import GlobalWrapper from "./layouts/global-wrapper";
import Overview from "./pages/index";
import Grades from "./pages/grades";

render(() => (
  <Router root={GlobalWrapper}>
    <Route path="/" component={Overview} />
    <Route path="/grades" component={Grades} />
  </Router>
), document.getElementById("root") as HTMLElement);