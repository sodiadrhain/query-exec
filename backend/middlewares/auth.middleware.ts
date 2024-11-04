import { IRequestUser } from "../interfaces";
import { Request, Response, NextFunction } from "express";
import { sessionService } from "../services";
import { decodeToken } from "../utils";

export default async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.unauthorized();
  }

  try {
    const user: IRequestUser = decodeToken(accessToken);

    if (!user) return res.unauthorized();

    const session = await sessionService.getSession({ _id: user.sessionId });
    if (!session || session.expiresAt < new Date()) {
      return res.unauthorized();
    }

    req.user = user;
    next();
  } catch (error) {
    res.serverError(error);
  }
};

// UPDATED IMPLEMENTATION TO USE COOKIES INSTEAD OF JWT MIDDLEWARE

// passport.authenticate("jwt", async function (err: Error, user: IRequestUser) {
//   if (err) return next(err);
//   if (!user) return res.unauthorized();

//   try {
//     const session = await sessionService.getSession({ _id: user.sessionId });
//     if (!session || session.expiresAt < new Date()) {
//       return res.unauthorized();
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.serverError(error);
//   }
// })(req, res, next);