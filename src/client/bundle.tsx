import { hydrate } from "solid-js/web";
import App from "./components/App";
import { Router } from "@solidjs/router";

hydrate(
  () => (
    <Router>
      <App name='' />
    </Router>
  ),
  document.getElementById("app")!
);
