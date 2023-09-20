import { type Dog } from "../models/dog.model";

export interface DogRepository {
  getAllDogs(): Promise<Dog[]>;
  getDogById(id: number): Promise<Dog | undefined>;
  addDog(dog: Omit<Dog, "id">): Promise<void>;
  updateDog(dog: Dog): Promise<Dog | undefined>;
}

export function createDogRepository(): DogRepository {
  const dogs: Dog[] = [];

  return {
    getAllDogs: async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 1);
      });
      return dogs;
    },
    getDogById: async (id) => {
      await new Promise((resolve) => {
        setTimeout(resolve, 1);
      });
      return dogs.find((dog) => dog.id === id);
    },
    addDog: async (dog) => {
      await new Promise((resolve) => {
        setTimeout(resolve, 1);
      });
      const id = dogs.length;
      dogs.push({ id, ...dog });
    },
    updateDog: async (dog) => {
      await new Promise((resolve) => {
        setTimeout(resolve, 1);
      });
      const id = dog.id;
      dogs[id] = dog;
      return dogs[id];
    },
  };
}
