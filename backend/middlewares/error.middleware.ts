import { Request, Response, NextFunction } from "express";
import { APP } from "../config/env.config";
import { ENVIRONMENT } from "../types/enums";

const NotFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  const ErrorHandler = (err: Error, req: Request, res: Response) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
  
    // If Mongoose not found error, set to 404 and change message
    if (err.name === 'CastError') {
      statusCode = 404;
      message = 'Resource not found';
    }
  
    res.status(statusCode).json({
      message: message,
      stack: APP.ENV === ENVIRONMENT.production ? null : err.stack,
    });
  };
  
  export { NotFound, ErrorHandler };
  