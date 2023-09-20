import { type FastifyDynamicSwaggerOptions } from "@fastify/swagger";
import { type FastifyPluginCallback } from "fastify";
import { renderUi } from "./redoc-swagger-ui";

const defaultOpenApiConfig: FastifyDynamicSwaggerOptions["openapi"] = {
  info: {
    title: "Fastify API",
    description:
      "Building a blazing fast REST API with Node.js, MongoDB, Fastify and Swagger",
    version: "0.1.0",
  },
  tags: [{ name: "Dogs", description: "Dog related end-points" }],
};

export const createOpenapiConfig = (
  openapi = defaultOpenApiConfig
): FastifyDynamicSwaggerOptions => {
  return {
    mode: "dynamic",
    openapi,
  };
};

export const swaggerUi: FastifyPluginCallback = (instance, _, done) => {
  const jsonUrl = "/docs/json";

  instance.get(jsonUrl, () => {
    return instance.swagger();
  });

  instance.get(
    "/docs",
    {
      helmet: {
        contentSecurityPolicy: {
          directives: {
            "script-src": ["self", "https://cdn.redoc.ly"],
            "worker-src": ["self", "blob:"],
            "img-src": ["self", "data:", "https://cdn.redoc.ly"],
          },
        },
      },
    },
    async (_, reply) => {
      await reply.type("text/html").send(renderUi(jsonUrl));
    }
  );
  done();
};
