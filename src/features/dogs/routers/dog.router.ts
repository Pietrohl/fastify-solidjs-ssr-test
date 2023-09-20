import type { DogController } from "../controllers/dog.controller";
import { type FastifyPluginCallback } from "fastify";
import { DogDTO } from "../models/dog.DTO";

function createDogRouter(dogController: DogController) {
  const router: FastifyPluginCallback = (instance, _ops, done) => {
    instance.get(
      "/",
      { schema: { description: "Read all dogs!" } },
      dogController.getAllDogs
    );

    instance.get(
      "/:id",
      { schema: { description: "Read a dog by id!" } },
      dogController.getDogById
    );

    instance.post(
      "/",
      { schema: { description: "Create a new dog!", body: DogDTO } },
      dogController.addDog
    );

    instance.put(
      "/:id",
      { schema: { description: "Update a dog!", body: DogDTO } },
      dogController.updateDog
    );

    done();
  };
  return router;
}

export { createDogRouter };
