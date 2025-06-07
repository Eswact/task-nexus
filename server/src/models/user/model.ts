import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import IUser from "./interface";
import { UserRole } from "../../enums/user-role";

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, enum: Object.values(UserRole), required: true },
    mail: { type: String, required: true },
    mailConfirmed: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

// Password hash
UserSchema.pre<IUser>("save", async function(next: Function) {
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

export default model<IUser>("User", UserSchema);