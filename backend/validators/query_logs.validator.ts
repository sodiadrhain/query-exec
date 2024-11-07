import { checkSchema } from "express-validator";
import { validate } from "../utils";
class QueryLogValidator {
  create = validate(
    checkSchema({
      type: {
        in: ["body"],
        notEmpty: {
          errorMessage: "Type is required",
        },
        isString: {
          errorMessage: "Type must be string",
        },
        trim: true,
      },
      query: {
        in: ["body"],
        notEmpty: {
          errorMessage: "Query is required",
        },
        isString: {
          errorMessage: "Query must be string",
        },
      },
    })
  );

  update = validate(
    checkSchema({
      id: {
        in: ["params"],
        notEmpty: {
          errorMessage: "Id is required",
        },
        isString: {
          errorMessage: "Id must be type of string",
        },
      },
      type: {
        in: ["body"],
        notEmpty: {
          errorMessage: "Type is required",
        },
        isString: {
          errorMessage: "Type must be string",
        },
        trim: true,
        optional: true,
      },
      query: {
        in: ["body"],
        notEmpty: {
          errorMessage: "Query is required",
        },
        isString: {
          errorMessage: "Query must be string",
        },
        optional: true,
      },
    })
  );

  approve = validate(
    checkSchema({
      id: {
        in: ["params"],
        notEmpty: {
          errorMessage: "Id is required",
        },
        isString: {
          errorMessage: "Id must be type of string",
        },
      },
    })
  );
}

export default QueryLogValidator;
