import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

const props = {
  name: "John",
};

export const renderedHTML = renderToString(<App id='root' {...props} />);
