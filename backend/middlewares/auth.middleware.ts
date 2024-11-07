import { IRequestUser } from "../interfaces";
import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils";

export default async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.unauthorized();
  }

  try {
    const user: IRequestUser = decodeToken(accessToken);
    if (!user) return res.unauthorized();

    req.user = user;
    next();
  } catch (_) {
    return res.unauthorized("Token expired or Invalid");
  }
};
