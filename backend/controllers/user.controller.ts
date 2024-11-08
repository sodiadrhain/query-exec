import { Request, Response } from "express";
import { userService } from "../services";
import { hashPassword, isEmptyObject } from "../utils";

class UserController {
  /**
   * @route GET /api/user/profile
   * @desc Get user profile
   * @access Private
   */
  getProfile = async (req: Request, res: Response) => {
    try {
      const user = await userService.getUser({
        _id: req.user.userId,
      });

      if (!user) {
        return res.notFound("User not found");
      }

      res.ok(user, "User profile fetched successfully");
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route PUT /api/user/profile
   * @desc Update user profile
   * @access Private.
   */
  updateProfile = async (req: Request, res: Response) => {
    const { fullName, password } = req.body;

    if (isEmptyObject(req.body))
      return res.badRequest("Body must have at least one of [fullname, password]");

    try {
      const user = await userService.getUser({ _id: req.user.userId });
      if (!user) {
        return res.notFound("User not found");
      }

      if (String(user._id) !== req.user.userId) {
        return res.unauthorized("You do not have access to this action");
      }

      const updatedUser = await userService.updateUser(user, {
        fullName,
        password: password ? hashPassword(password) : user.password,
      });
      updatedUser.password = undefined;
      res.ok(null, "User profile updated successfully");
    } catch (error) {
      res.serverError(error);
    }
  };
}

export default UserController;
