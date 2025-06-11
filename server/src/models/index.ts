import mongoose from "mongoose";
import dbConfig from "../config/db-config";

import User, { UserDocument } from "./user/model";
import Task, { TaskDocument } from "./task/model";
import Status, { StatusDocument } from "./status/model";
import Priority, { PriorityDocument } from "./priority/model";

interface IDb {
  mongoose: typeof mongoose;
  url: string;
  users: mongoose.Model<UserDocument>;
  tasks: mongoose.Model<TaskDocument>;
  status: mongoose.Model<StatusDocument>;
  priority: mongoose.Model<PriorityDocument>;
}

const db: IDb = {
  mongoose,
  url: dbConfig.url,
  users: User,
  tasks: Task,
  status: Status,
  priority: Priority
};

export default db;
