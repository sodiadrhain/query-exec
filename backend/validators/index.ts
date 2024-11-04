import AuthValidator from "./auth.validator";
import QueryLogValidator from "./query_logs.validator";
import UserValidator from "./user.validator";

export const authValidator = new AuthValidator();
export const queryLogValidator = new QueryLogValidator();
export const userValidator = new UserValidator();
