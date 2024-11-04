import { IUser } from "../interfaces";
import { User } from "../models";

class UserService {
  // CreateUser :one
  public createUser(user: IUser): Promise<IUser> {
    return User.create(user);
  }

  // GetUser :one
  public getUser(user: IUser): Promise<IUser> {
    return User.findById(user._id).select({
      password: 0,
    });
  }

  // ListUsers :many
  public listUsers(): Promise<IUser[]> {
    return User.find();
  }

  // UpdateUser :one
  public updateUser(user: IUser, updates: IUser): Promise<IUser> {
    return User.findByIdAndUpdate(user._id, updates);
  }

  // GetUserByUsername :one
  public getUserByEmail(email: string): Promise<IUser> {
    return User.findOne({ email });
  }
}

export default UserService;