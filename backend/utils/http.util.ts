/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { log } from "../services";
import { RESPONSE_MSG, STATUS_CODES } from "../types/enums";
import { IRequestUser } from "../interfaces";

declare module "express-serve-static-core" {
  interface Response {
    ok: (data?: unknown, message?: string) => void;
    created: (data?: unknown, message?: string) => void;
    badRequest: (message?: string) => void;
    unauthorized: (message?: string) => void;
    forbidden: (data?: unknown, message?: string) => void;
    notFound: (message?: string) => void;
    serverError: (data?: unknown, message?: string) => void;
    badGateway: (data?: unknown, message?: string) => void;
  }

  interface Request {
    user: IRequestUser;
  }
}

export default (req: Request, res: Response, next: NextFunction) => {
  res.ok = (data: unknown, message: string = RESPONSE_MSG.DATA_SUCCESS) => {
    log.info(`${message}, ${formatRequest(req)}`);
    res.status(STATUS_CODES.OK).json({
      status: RESPONSE_MSG.STATUS_SUCCESS,
      data,
      message,
    });
  };

  res.created = (data: unknown, message: string = RESPONSE_MSG.DATA_CREATED) => {
    log.info(`${message}, ${formatRequest(req)}`);
    res.status(STATUS_CODES.CREATED).json({
      status: RESPONSE_MSG.STATUS_SUCCESS,
      data,
      message,
    });
  };

  res.badRequest = (message: string = RESPONSE_MSG.BAD_REQUEST) => {
    log.info(`${message}, ${formatRequest(req)}`);
    res.status(STATUS_CODES.BAD_REQUEST).json({
      status: RESPONSE_MSG.STATUS_ERROR,
      message,
    });
  };

  res.unauthorized = (message: string = RESPONSE_MSG.UNAUTHORIZED) => {
    log.info(`${message}, ${formatRequest(req)}`);
    res.status(STATUS_CODES.UNAUTHORIZED).json({
      status: RESPONSE_MSG.STATUS_ERROR,
      message,
    });
  };

  res.notFound = (message: string = RESPONSE_MSG.NOT_FOUND) => {
    log.info(`${message}, ${formatRequest(req)}`);
    res.status(STATUS_CODES.NOT_FOUND).json({
      status: RESPONSE_MSG.STATUS_ERROR,
      message,
    });
  };

  res.serverError = (data: unknown, message: string = RESPONSE_MSG.ERROR_OCURRED) => {
    log.error(`${message}, ${data}, ${formatRequest(req)}`);
     res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: RESPONSE_MSG.STATUS_ERROR,
      message,
    });
  };

  return next();
};

function formatRequest(request: Request) {
  const body = request.body;
  const headers = request.headers;
  const method = request.method;
  const endpoint = request.originalUrl;
  const params = request.params;
  const query = request.query;

  if (request.body.password) {
    request.body.password = "******";
  }

  if (request.headers.cookie) {
    request.headers.cookie = "******";
  }

  return JSON.stringify({
    method,
    endpoint,
    body,
    params,
    query,
    headers,
  });
}