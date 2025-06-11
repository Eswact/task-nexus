import { Schema, model, Document } from "mongoose";
import IStatus from "./interface";

type StatusDocument = IStatus & Document;
const StatusSchema = new Schema<StatusDocument>({
    user: { type: String, required: true },
    list: [
      {
        name: { type: String, required: true },
        value: { type: Number, required: true }
      }
    ]
}, { timestamps: true });

export type { StatusDocument };
export default model<StatusDocument>("statuses", StatusSchema);