import { Schema, model, Document } from "mongoose";
import IPriority from "./interface";

type PriorityDocument = IPriority & Document;
const PrioritySchema = new Schema<PriorityDocument>({
    user: { type: String, required: true },
    list: [
      {
        name: { type: String, required: true },
        value: { type: Number, required: true }
      }
    ]
}, { timestamps: true });

export type { PriorityDocument };
export default model<PriorityDocument>("priorities", PrioritySchema);