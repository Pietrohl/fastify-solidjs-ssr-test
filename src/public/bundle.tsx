import { hydrate } from "solid-js/web";
import App from "../view/App";

const props = {
  name: "Jane",
};

hydrate(() => <App {...props} />, document.getElementById('app'));
