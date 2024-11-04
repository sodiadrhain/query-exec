import { APP, JWT } from "../config/env.config";
import { ISession, IUser } from "../interfaces";
import * as jwt from "jsonwebtoken";
import { Response } from "express";
import { ENVIRONMENT } from "../types/enums";

export const generateToken = (res: Response, user: IUser, session: ISession, refresh = false): string => {
  const dateNow = new Date();
  const expires = refresh
    ? dateNow.setHours(dateNow.getHours() + Number(JWT.REFRESH_EXPIRY))
    : dateNow.setSeconds(dateNow.getSeconds() + Number(JWT.EXPIRY));

  const secret = refresh ? JWT.REFRESH_SECRET : JWT.SECRET;

  const token = jwt.sign(
    {
      userId: user._id,
      username: user.email,
      expires,
      sessionId: session._id,
    },
    secret,
    {
      expiresIn: JWT.EXPIRY,
    }
  );

  res.cookie(refresh ? 'refreshToken' : 'accessToken', token, {
    httpOnly: true,
    secure: APP.ENV !== ENVIRONMENT.development, // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: expires
  });

  return token;
};

export const decodeToken = (token: string, refresh = false): unknown => {
  const secret = refresh ? JWT.REFRESH_SECRET : JWT.SECRET;
  return jwt.verify(token, secret);
};