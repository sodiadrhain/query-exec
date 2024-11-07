import * as Winston from "winston";
import { format, Logger as WinstonLogger } from "winston";
import { APP, LOGS } from "../config/env.config";

const LOG_INFO = "info";
const LOG_ERROR = "error";
const LOG_DEBUG = "debug";
const MAX_SIZE = 5242880; // 5MB
const MAX_FILES = 5;

class LoggerService {
  private logger: WinstonLogger;

  constructor() {
    this.logger = new Winston.Logger();
  }

  /**
   * @description Output format
   */
  private readonly formater = format.printf(({ level, message, timestamp }) => {
    return `${timestamp as string} [${level}] ${message}`;
  });

  /**
   * @description Default options
   */
  private readonly options = {
    error: {
      level: LOG_ERROR,
      format: format.combine(format.timestamp(), this.formater),
      filename: `${LOGS.PATH}/error.log`,
      handleException: true,
      json: true,
      maxSize: MAX_SIZE,
      maxFiles: MAX_FILES,
      colorize: false,
    },
    info: {
      level: LOG_INFO,
      format: format.combine(format.timestamp(), this.formater),
      filename: `${LOGS.PATH}/combined.log`,
      handleException: false,
      json: true,
      maxSize: MAX_SIZE,
      maxFiles: MAX_FILES,
      colorize: false,
    },
    console: {
      format: Winston.format.simple(),
      level: LOG_DEBUG,
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };

  private createLog(level: string, message: string) {
    this.logger = Winston.createLogger({
      level,
      transports: [
        new Winston.transports.File(this.options.error),
        new Winston.transports.File(this.options.info),
      ],
      exitOnError: false,
    });

    if (!["production", "test"].includes(APP.ENV)) {
      this.logger.add(new Winston.transports.Console(this.options.console));
    }

    switch (level) {
      case LOG_INFO:
        this.logger["info"](message);
        break;
      case LOG_ERROR:
        this.logger["error"](message);
    }

    return this;
  }

  /**
   * @description Log info
   * @param message
   */
  public info(message: string) {
    this.createLog(LOG_INFO, message);
  }

  /**
   * @description Log error
   * @param message
   */
  public error(message: string) {
    this.createLog(LOG_ERROR, message);
  }
}

export default LoggerService;
