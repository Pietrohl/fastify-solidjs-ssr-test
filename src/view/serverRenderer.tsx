import { renderToString } from "solid-js/web";
import App from "./App";

// Define your props type
interface Props {
  id: string;
  name: string;
}

const props: Props = {
  id: "root",
  name: "John",
};

export const renderedHTML = renderToString(() => <App {...props} />);
