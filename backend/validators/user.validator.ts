import { checkSchema } from "express-validator";
import { validate } from "../utils";
class UserValidator {
  updateProfile = validate(
    checkSchema({
      fullName: {
        in: ["body"],
        notEmpty: {
          errorMessage: "Fullname is required",
        },
        isString: {
          errorMessage: "Fullname be string",
        },
        trim: true,
        optional: true,
      },
      password: {
        in: ["body"],
        notEmpty: {
          errorMessage: "Password is required",
        },
        isStrongPassword: {
          errorMessage:
            "Password is weak, kindly create strong password with at least 8 characters long containing at least a number, symbol, letter",
        },
        optional: true,
      },
    })
  );
}

export default UserValidator;