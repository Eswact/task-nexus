import { Schema, model } from "mongoose";
import ITask from "./interface";
import { TaskPriority } from "../../enums/task-priority";
import { TaskStatus } from "../../enums/task-status";

const TaskSchema = new Schema<ITask>({
  createrId: { type: String, required: true },
  assignedId: { type: String, required: true },

  title: { type: String, required: true },
  description: { type: String },
  status: { type: Number, enum: Object.values(TaskStatus), default: 0 },
  startDate: { type: Date },
  endDate: { type: Date },
  notes: [
    {
      content: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  checklist: [
    {
      label: String,
      checked: { type: Boolean, default: false },
    },
  ],
  priority: { type: Number, enum: Object.values(TaskPriority), default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

TaskSchema.pre<ITask>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default model<ITask>("Task", TaskSchema);
