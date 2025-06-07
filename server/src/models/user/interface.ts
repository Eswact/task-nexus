import { Document } from "mongoose";
import { UserRole } from "../../enums/user-role";

export default interface IUser extends Document {
  username: string;
  password: string;
  role: UserRole;
  mail: string;
  mailConfirmed: boolean;
}