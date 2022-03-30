import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  transports: [],
});

if (process.env.NODE_ENV === "development") {
  logger.add(new winston.transports.Console());
}

export default logger;
