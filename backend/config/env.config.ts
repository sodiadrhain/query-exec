import { config } from "dotenv";

config();

const e = process.env;

const configuration = {
  APP: {
    NAME: e.APP_NAME || "QUERY-EXEC",
    PORT: e.PORT || e.APP_PORT || 5000,
    ENV: e.NODE_ENV || e.APP_ENV || "development",
    AUTH_HEADER: e.APP_AUTH_HEADER || "qe-auth-token",
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
    REFRESH_EXPIRY: e.JWT_REFRESH_EXPIRY || 48, // set in hours
    REFRESH_SECRET: e.JWT_REFRESH_SECRET || "QEF746@##@100!!!",
  },
};

const APP = configuration.APP;
const LOGS = configuration.LOGS;
const DB = configuration.DB;
const JWT = configuration.JWT;

export { APP, LOGS, DB, JWT };