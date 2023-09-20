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

import path from "path";
import fastifyStatic from "@fastify/static";
import { renderedHTML } from "../view/serverRenderer";

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

  // Middleware
  await app.register(helmet);
  await app.register(cors);
  await app.register(swagger, createOpenapiConfig());

  app.withTypeProvider<TypeBoxTypeProvider>();
  app.setValidatorCompiler(TypeBoxValidatorCompiler);

  await app.register(fastifyStatic, {
    root: path.join(process.cwd(), "dist/public"),
    prefix: "/public/", // optional: default '/'
  });

  app.get("/public", async (request, reply) => {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <title>Vite App</title>
      <script type="module" crossorigin src="/public/assets/index-ec3d6d23.js"></script>
    </head>
    
    <body>
    <div id="root">
      ${renderedHTML}
        </div>
    </body>
    
    </html>
    `;

    await reply.type("text/html").send(html);
  });

  // Attaching Routes
  await attachRoutes(app, container);
  await app.register(swaggerUi);

  return app.then((app) => {
    return {
      ...app,
      listen: (port: number, host: string, callback: () => void) => {
        app.listen({ port, host }, callback);
      },
    };
  });
}
