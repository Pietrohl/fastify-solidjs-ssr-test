import { renderToStringAsync } from "solid-js/web";
import App, { type AppProps } from "./components/App";
import type { FastifyRequest } from "fastify";
import { Router } from "@solidjs/router";

export type HTMLRenderer<AppProps> = (
  req: FastifyRequest,
  props: AppProps
) => Promise<string>;

const renderedHTML: HTMLRenderer<AppProps> = (req, props) =>
  renderToStringAsync(() => (
    <Router url={req.url}>
      <App {...props} />
    </Router>
  ));

export default renderedHTML;
