import { Type, type Static } from "@sinclair/typebox";

export const DogDTO = Type.Object({
  name: Type.String({ minLength: 1 }),
  breed: Type.String({ minLength: 1 }),
});

export type DogDTO = Static<typeof DogDTO>;
