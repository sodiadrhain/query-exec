/* eslint-disable no-unused-vars */
/**
 * @description Application environments
 */
export enum ENVIRONMENT {
  development = "development",
  staging = "staging",
  production = "production",
  test = "test",
}

/**
 * @description Status codes
 */
export enum STATUS_CODES {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  UNPROCESSABLE_ENTITY = 422,
}

/**
 * @description Response Messages
 */
export enum RESPONSE_MSG {
  STATUS_SUCCESS = "success",
  STATUS_ERROR = "error",
  STATUS_FAILED = "failed",
  BAD_REQUEST = "BAD-REQUEST",
  ERROR_OCURRED = "An error occured, Please try again.",
  BAD_GATEWAY = "BAD-GATEWAY",
  NOT_FOUND = "NOT-FOUND",
  UNAUTHORIZED = "UNAUTHORIZED-ACCESS",
  FORBIDDEN = "FORBIDDEN",
  DATA_CREATED = "Created Successfully",
  DATA_SUCCESS = "Fetch Successfully",
}

/**
 * @description Token types
 */
export enum TOKEN_TYPE {
  REFRESH = "refresh",
  JWT = "jwt",
}
