import { UserRole } from "../../enums/user-role";

export default interface IUser {
  username: string;
  password: string;
  role: UserRole;
  mail: string;
  mailConfirmed: boolean;
}