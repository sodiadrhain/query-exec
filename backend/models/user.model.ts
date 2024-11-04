import { Schema, model } from "mongoose";
import { IUser } from "../interfaces";

// Create user schema
const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
    },
    fullName: String,
    password: String,
    lastLogin: Date,
    permissions: Array<string>,
  },
  {
    timestamps: true,
  }
);

// Create and export user model
const User = model<IUser>("Users", UserSchema);

export default User;
