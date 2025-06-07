import mongoose from "mongoose";
import dbConfig from "../config/db-config";

import IUser from "./user/interface";
import ITask from "./task/interface";

import User from "./user/model";
import Task from "./task/model";

interface IDb {
  mongoose: typeof mongoose;
  url: string;
  users: mongoose.Model<IUser>;
  tasks: mongoose.Model<ITask>;
}

const db: IDb = {
  mongoose,
  url: dbConfig.url,
  users: User,
  tasks: Task,
};

export default db;
