import fastify, { type FastifyInstance } from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import type { AwilixContainer } from "awilix";
import type { AppContainer } from "../container";
import { logger } from "../utils/logger";
import { pinoConfig } from "../utils/logger";
import {
  createOpenapiConfig,
  swaggerUi,
} from "../middleware/swagger/fastify-swagger.middleware";
import {
  TypeBoxValidatorCompiler,
  type TypeBoxTypeProvider,
} from "@fastify/type-provider-typebox";
import fs from "node:fs";
import fastifyStatic from "@fastify/static";
import path from "node:path";
import type { HTMLRenderer } from "../client/server-entry.tsx";
import { generateHydrationScript } from "solid-js/web";
import type { AppProps } from "../client/components/App";

async function attachRoutes(
  app: FastifyInstance,
  container: AwilixContainer<AppContainer>
) {
  const router = container.resolve("dogRouter");

  // Define Fastify routes using the router and resolve dependencies from the container
  await app.register(router, { prefix: "/dog" });
}

export async function createServer(container: AwilixContainer<AppContainer>) {
  logger.info("creating fastify server...");
  const app = fastify({
    logger: pinoConfig,
  });

  app.withTypeProvider<TypeBoxTypeProvider>();
  app.setValidatorCompiler(TypeBoxValidatorCompiler);

  // Middleware
  // await app.register(helmet);
  // await app.register(cors);
  await app.register(swagger, createOpenapiConfig());

  // Static files Route
  await app.register(fastifyStatic, {
    root: path.join(process.cwd(), "public"),
    prefix: "/", // optional: default '/'
  });

  // Attaching Routes
  await attachRoutes(app, container);
  await app.register(swaggerUi);

  // Adding SSR  catch-all route
  app.get("/", async (request, reply) => {
    const serverEntryPath = "../../dist/client/server-entry.mjs";
    const { default: renderedHTML } = (await import(serverEntryPath)) as {
      default: HTMLRenderer<AppProps>;
    };

    const html = fs
      .readFileSync(path.join(process.cwd(), "public/index.html"), "utf-8")
      .replace("<!--#include HydrationScript -->", generateHydrationScript())
      .replace(
        "<!--#include App -->",
        await renderedHTML(request, { name: "John" })
      );

    await reply.type("text/html").send(html);
  });

  return app;
}
