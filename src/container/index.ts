import {
  asFunction,
  asValue,
  createContainer,
  InjectionMode,
  type AwilixContainer,
} from "awilix";
import { logger } from "../utils/logger";
import { config } from "../config";

import {
  type DogRepository,
  type DogService,
  createDogRepository,
  createDogService,
  createDogController,
  createDogRouter,
  DogController,
} from "../features/dogs";
import type { FastifyPluginCallback } from "fastify";


// Add services, controllers and config here
export interface AppContainer {
  config: typeof config;

  // Domain specific providers
  dogRepository: DogRepository;
  dogService: DogService;

  // Framework specific controllers and providers
  dogController: DogController;
  dogRouter: FastifyPluginCallback;

  // Add scoped services, controllers and config here
}

export function configureContainer(): AwilixContainer<AppContainer> {
  logger.info("initiating container...");

  const containerConfig = {
    injectionMode: InjectionMode.CLASSIC,
  };

  const container = createContainer<AppContainer>(containerConfig);

  // Register dependencies
  container.register({
    // Config
    config: asValue(config),

    // Repositories
    dogRepository: asFunction(createDogRepository).singleton(),

    // Services
    dogService: asFunction(createDogService).singleton(),

    // Controllers
    dogController: asFunction(createDogController).singleton(),

    // Routers
    dogRouter: asFunction(createDogRouter).singleton(),
  });

  return container;
}
