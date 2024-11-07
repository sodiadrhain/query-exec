import { Request, Response } from "express";
import { userService } from "../services";
import { decryptPassword, generateToken, hashPassword } from "../utils";

class AuthController {
  /**
   * @route POST /api/auth/register
   * @desc Register user
   * @access Public
   */
  register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await userService.createUser({ email, password: hashPassword(password) });
      res.created({ email: user.email }, "User created successfully");
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route POST /api/auth/login
   * @desc Login user
   * @access Public
   */
  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await userService.getUserByEmail(email);
      if (!user) {
        return res.badRequest("User does not exist");
      }

      const verifyPassword = decryptPassword(password, user.password);
      if (!verifyPassword) {
        return res.badRequest("Invalid credentials");
      }

      const dateNow = new Date();
      await userService.updateUser(user, { lastLogin: dateNow });

      generateToken(res, user);

      user.password = undefined;

      res.ok(user, "Login successful");
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route GET /api/auth/logout
   * @desc Logout user
   * @access Private
   */
  logout = async (_: Request, res: Response) => {
    try {
      res.clearCookie("accessToken");
      res.ok(null, "Logout successful");
    } catch (error) {
      res.serverError(error);
    }
  };
}

export default AuthController;
