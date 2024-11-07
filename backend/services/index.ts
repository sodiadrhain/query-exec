import LoggerService from "./logger.service";
import QueryLogService from "./query_logs.service";
import UserService from "./user.service";

export const log = new LoggerService();
export const userService = new UserService();
export const queryLogService = new QueryLogService();
