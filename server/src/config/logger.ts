import winston from "winston";
import { LOG_LEVEL, NODE_ENV } from "./env";

const transports: winston.transport[] = [
  // Always keep the error.log file
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
];

// Add combined.log only when LOG_LEVEL is not "error"
if (LOG_LEVEL !== "error") {
  transports.push(
    new winston.transports.File({
      filename: "logs/combined.log",
      level: LOG_LEVEL, // info or debug etc.
    })
  );
}

// Add console only in development
if (NODE_ENV !== "production") {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    })
  );
}

const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.prettyPrint()
  ),
  defaultMeta: { service: "mili-resort-api" },
  transports,
});

export default logger;
