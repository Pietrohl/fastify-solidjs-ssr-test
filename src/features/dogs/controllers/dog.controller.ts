import type { DogDTO } from "../models/dog.DTO";
import type { DogService } from "../services/dog.service";
import type {
  FastifyRequest,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from "fastify";

export interface DogController {
  getAllDogs: RouteHandlerMethod;
  getDogById: RouteHandlerMethod<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    { Params: { id: string } }
  >;
  addDog: RouteHandlerMethod<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    { Body: DogDTO }
  >;
  updateDog: RouteHandlerMethod<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    { Params: { id: string }; Body: DogDTO }
  >;
}

export function createDogController(dogService: DogService): DogController {
  return {
    getAllDogs: async (_req, _res) => {
      const dogs = await dogService.getAllDogs();
      return dogs;
    },
    getDogById: async (
      req: FastifyRequest<{ Params: { id: string } }>,
      res
    ) => {
      const id = parseInt(req.params.id);
      const dog = await dogService.getDogById(id);

      if (dog) {
        return dog;
      } else {
        return res.code(404).send({ message: "Dog not found" });
      }
    },
    addDog: async (req, res) => {
      await dogService.addDog(req.body);
      return res.code(201).send({ message: "Dog added successfully" });
    },
    updateDog: async (req, res) => {
      const id = parseInt(req.params.id);
      const dto = req.body;
      const dog = await dogService.updateDog({ id, ...dto });

      if (dog) {
        return dog;
      } else {
        return res.code(404).send({ message: "Dog not found" });
      }
    },
  };
}
