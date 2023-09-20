import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const config = {
  PORT: Number(process.env.PORT) || 3000,
  // Add more configs here
  //   PUBLIC_FOLDER: process.env.PUBLIC_FOLDER,
  //   REDIS_URL: process.env.REDIS_URL,
};

export { config };
