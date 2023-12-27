export interface User {
  id: number | null;
  firstName: string;
  lastName: string;
}
export interface UserRes {
  token: string;
  user: User;
}
export interface DetailUser extends User {
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
}
export interface LoginUser {
  email: string | undefined;
  password: string | undefined;
}
export interface RegisterUser extends LoginUser {
  firstName: string | undefined;
  lastName: string | undefined;
}
export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}
