import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import IUser from "./interface";
import { UserRole } from "../../enums/user-role";

type UserDocument = IUser & Document;
const UserSchema: Schema = new Schema<UserDocument>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, enum: Object.values(UserRole).filter(v => typeof v === 'number'), default: UserRole.BasicUser, required: true },
    mail: { type: String, required: true },
    mailConfirmed: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

// Password hash
UserSchema.pre<UserDocument>("save", async function(next: Function) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

export type { UserDocument };
export default model<UserDocument>("User", UserSchema);