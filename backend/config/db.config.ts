import mongoose from "mongoose";
import { DB } from "./env.config";
import { log } from "../services";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB.MONGO_URI);
    log.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    log.error(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
