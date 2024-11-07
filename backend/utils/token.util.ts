import { APP, JWT } from "../config/env.config";
import { IUser } from "../interfaces";
import * as jwt from "jsonwebtoken";
import { Response } from "express";
import { ENVIRONMENT } from "../types/enums";

export const generateToken = (res: Response, user: IUser): string => {
  const expires = Number(JWT.EXPIRY);

  const token = jwt.sign(
    {
      userId: user._id,
      username: user.email,
    },
    JWT.SECRET,
    {
      expiresIn: expires,
    }
  );

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: APP.ENV !== ENVIRONMENT.development,
    sameSite: 'strict',
    maxAge: expires * 1000
  });

  return token;
};

export const decodeToken = (token: string): unknown => {
  return jwt.verify(token, JWT.SECRET);
};