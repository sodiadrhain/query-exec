import { APP, JWT } from "../config/env.config";
import { PassportStatic } from "passport";
import passportJwt from "passport-jwt";

/**
 * passport-jwt - A Passport strategy for authenticating with a JSON Web Token.
 * This module lets you authenticate endpoints using a JSON web token.
 * It is intended to be used to secure RESTful endpoints without sessions.
 */

const JwtStrategy = passportJwt.Strategy,
  ExtractJwt = passportJwt.ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromHeader(APP.AUTH_HEADER),
  secretOrKey: JWT.SECRET,
};

export default (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      return done(null, jwt_payload);
    })
  );
};