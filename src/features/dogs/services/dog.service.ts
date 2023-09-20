import type { Dog } from "../models/dog.model";
import { type DogRepository } from "../repositories/dog.repository";

export interface DogService {
  getAllDogs(): Promise<Dog[]>;
  getDogById(id: number): Promise<Dog | undefined>;
  addDog(dog: Omit<Dog, "id">): Promise<void>;
  updateDog(dog: Dog): Promise<Dog | undefined>;
}

export function createDogService(dogRepository: DogRepository): DogService {
  return {
    getAllDogs: async () => {
      return dogRepository.getAllDogs();
    },
    getDogById: async (id: number) => {
      return dogRepository.getDogById(id);
    },
    addDog: async (dog) => {
      await dogRepository.addDog(dog);
    },
    updateDog: async (dog) => {
      return dogRepository.updateDog(dog);
    },
  };
}
