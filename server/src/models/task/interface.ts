import { Document, Types } from "mongoose";
import { TaskPriority } from "../../enums/task-priority";
import { TaskStatus } from "../../enums/task-status";

interface IChecklistItem {
  label: string;
  checked: boolean;
}

interface INote {
  content: string;
  createdAt: Date;
}

export default interface ITask extends Document {
  createrId: string;
  assignedId: string;

  title: string;
  description?: string;

  status: TaskStatus;

  startDate?: Date;
  endDate?: Date;

  notes: INote[];
  checklist: IChecklistItem[];

  priority: TaskPriority;

  createdAt: Date;
  updatedAt: Date;
}
