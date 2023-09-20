import { logger as pinoLogger } from "./pino-logger";

export interface Logger {
  info(...args: any[]): void;
  http(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
  debug(...args: any[]): void;
}

export const logger: Logger = pinoLogger;

export { pinoConfig } from "./pino-logger";
