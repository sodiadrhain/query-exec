
import { Schema, model } from "mongoose";
import { IQueryLogs } from "../interfaces";

// Create query logs schema
const QueryLogsSchema = new Schema<IQueryLogs>(
  {
    userId: Schema.Types.ObjectId,
    type: String,
    query: String,
    isApproved: Boolean,
    status: Boolean,
  },
  {
    timestamps: true,
  }
);

// Create and export query logs model
const QueryLogs = model<IQueryLogs>("QueryLogs", QueryLogsSchema);

export default QueryLogs;