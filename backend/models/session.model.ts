
import { Schema, model } from "mongoose";
import { ISession } from "../interfaces";

// Create session schema
const SessionSchema = new Schema<ISession>(
  {
    userId: Schema.Types.ObjectId,
    userAgent: String,
    clientIp: String,
    refreshTokenCount: Number,
    isBlocked: Boolean,
    expiresAt: Date,
  },
  {
    timestamps: true,
  }
);

// Create and export session model
const Session = model<ISession>("Session", SessionSchema);

export default Session;