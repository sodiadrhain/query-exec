export interface IUser {
  _id?: string;
  email?: string;
  password?: string;
  fullName?: string;
  lastLogin?: Date;
  permissions?: Array<string>;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface IQueryLogs {
  _id?: string;
  userId?: string;
  type?: string;
  query?: string;
  isApproved?: boolean;
  status?: boolean;
  updatedAt?: Date;
  createdAt?: Date;
}
