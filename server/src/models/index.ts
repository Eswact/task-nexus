import mongoose from "mongoose";
import dbConfig from "../config/db-config";

import User, { UserDocument } from "./user/model";
import Task, { TaskDocument } from "./task/model";

interface IDb {
  mongoose: typeof mongoose;
  url: string;
  users: mongoose.Model<UserDocument>;
  tasks: mongoose.Model<TaskDocument>;
}

const db: IDb = {
  mongoose,
  url: dbConfig.url,
  users: User,
  tasks: Task,
};

export default db;
