import { Request, Response } from "express";
import { sessionService, userService } from "../services";
import { decryptPassword, generateToken, hashPassword, decodeToken } from "../utils";
import { JWT } from "../config/env.config";

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

      const verifyPassword = decryptPassword(password, (user.password));
      if (!verifyPassword) {
        return res.badRequest("Invalid credentials");
      }

      const dateNow = new Date();
      await userService.updateUser(user, {lastLogin: dateNow})

      // create session
      const session = await sessionService.createSession({
        userId: user._id,
        expiresAt: new Date(dateNow.setHours(dateNow.getHours() + Number(JWT.REFRESH_EXPIRY))),
        userAgent: req.get("user-agent") || "N/A",
        clientIp: req.ip,
      });

      const token = {
        accessToken: generateToken(res, user, session),
        refreshToken: generateToken(res, user, session, true),
      };

      user.password = undefined;
      
      res.ok({ user, token }, "Login successful");
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route GET /api/auth/logout
   * @desc Logout user
   * @access Private
   */
  logout = async (req: Request, res: Response) => {
    try {
      const session = await sessionService.getSession({ _id: req.user.sessionId });
      await sessionService.updateSession(session, { expiresAt: new Date() });
      res.ok(null, "Logout successful");
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route POST /api/auth/refresh
   * @desc Get new authToken
   * @access Public
   */
  refreshToken = async (req: Request, res: Response) => {
    const { token } = req.body;
    try {
      req.user = decodeToken(token, true);

      const session = await sessionService.getSession({ _id: req.user.sessionId });
      if (!session || session.expiresAt < new Date()) {
        return res.badRequest("Token expired or Invalid");
      }

      // Users can only request new token at a limited interval
      if (session.refreshTokenCount > 4) {
        await sessionService.updateSession(session, {
          expiresAt: new Date(),
        });
      }

      const _token = {
        accessToken: generateToken(res, { _id: req.user.userId, ...req.user }, session),
        refreshToken: token,
      };

      // Increment refreshTokenCount as new token is requested
      await sessionService.updateSession(session, {
        refreshTokenCount: session.refreshTokenCount + 1,
      });

      res.ok({ token: _token });
    } catch (_) {
      res.badRequest("Token expired or Invalid");
    }
  };
}

export default AuthController;