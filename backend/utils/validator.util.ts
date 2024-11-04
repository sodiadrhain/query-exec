import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";

const validate =
  (validations: ValidationChain[]) => async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation: ValidationChain) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const errorMsg = errors.array();

    return res.badRequest(errorMsg[0].msg);
  };

export default validate;