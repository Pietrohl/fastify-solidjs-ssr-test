import pino from "pino";

const targets = [];

if (process.env.NODE_ENV === "production") {
  targets.push({
    target: "pino/file",
    level: "info",
    options: { destination: `logs/info.log` },
  });
} else {
  targets.push({
    level: "info",
    target: "pino-pretty",
    options: { colorize: true },
  });
}


export const pinoConfig = 
  {
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    customLevels: {
      http: 25,
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    transport: {
      targets,
    }
  }


export const logger = pino(pinoConfig);
