import { Schema, model, Document } from "mongoose";
import ITask from "./interface";
import { TaskPriority } from "../../enums/task-priority";
import { TaskStatus } from "../../enums/task-status";

type TaskDocument = ITask & Document;
const TaskSchema = new Schema<TaskDocument>({
  createrId: { type: String, required: true },
  assignedId: { type: String, required: true },

  title: { type: String, required: true },
  description: { type: String },
  status: { type: Number, enum: Object.values(TaskStatus).filter(v => typeof v === 'number'), default: 1 },
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
  priority: { type: Number, enum: Object.values(TaskPriority).filter(v => typeof v === 'number'), default: 1 },
}, { timestamps: true });

export type { TaskDocument };
export default model<TaskDocument>("tasks", TaskSchema);
