export interface SerializedModel {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  avatar: string;
}

export interface ModelCreateUpdate {
  id?: number;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  lastLogin?: Date;
  email?: string;
  status?: string;
  avatar?: string;
}

export interface PasswordChange {
  currentPassword?: string;
  newPassword: string;
}

export interface LoginModel {
  username: string;
  password: string;
}
