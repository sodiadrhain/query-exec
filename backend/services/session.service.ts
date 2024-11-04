import { ISession, IUser } from "../interfaces";
import { Session } from "../models";

class SessionService {
  // CreateSession :one
  public createSession(session: ISession): Promise<ISession> {
    return Session.create(session);
  }

  // GetSession :one
  public getSession(session: ISession): Promise<ISession> {
    return Session.findById(session._id);
  }

  // ListUserSessions :many DESC
  public getSessionsByUserId(user: IUser): Promise<ISession[]> {
    return Session.find({ userId: user._id }).sort({ createdAt: "desc" })
  }

  // UpdateSession :one
  public updateSession(session: ISession, updates: ISession): Promise<ISession> {
    return Session.findByIdAndUpdate(session._id, updates);
  }
}

export default SessionService;