import AuthController from "./auth.controller";
import QueryLogController from "./query_logs.controller";
import UserController from "./user.controller";

export const authController = new AuthController();
export const queryLogController = new QueryLogController();
export const userController = new UserController();
