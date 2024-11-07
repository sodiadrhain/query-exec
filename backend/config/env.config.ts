import { config } from "dotenv";

config();

const e = process.env;

const configuration = {
  APP: {
    NAME: e.APP_NAME || "QUERY-EXEC",
    PORT: e.PORT || e.APP_PORT || 5000,
    ENV: e.NODE_ENV || e.APP_ENV || "development",
  },
  LOGS: {
    PATH: e.LOGS_PATH || "logs/",
  },
  DB: {
    MONGO_URI: e.MONGO_URI,
  },
  JWT: {
    SECRET: e.JWT_SECRET || "QE@00***!!!!-00*&^%",
    EXPIRY: e.JWT_EXPIRY || 3600, // set in seconds
  },
};

const APP = configuration.APP;
const LOGS = configuration.LOGS;
const DB = configuration.DB;
const JWT = configuration.JWT;

export { APP, LOGS, DB, JWT };
