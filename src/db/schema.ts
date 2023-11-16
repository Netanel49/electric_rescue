import {
  ColumnType,
  Generated,
  GeneratedAlways,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';
export type Numeric = ColumnType<string, string | number, string | number>;
export type status =
  | 'pending'
  | 'recived'
  | 'on route'
  | 'done'
  | 'can`t be done';

export interface Account {
  id: GeneratedAlways<string>;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
}
export type SelectAccount = Selectable<Account>;
export type NewAccount = Insertable<Account>;
export type AccountUpdate = Updateable<Account>;

export interface Session {
  id: GeneratedAlways<string>;
  userId: string;
  sessionToken: string;
  expires: Date;
}

export type SelectSession = Selectable<Session>;
export type NewSession = Insertable<Session>;
export type SessionUpdate = Updateable<Session>;

export interface User {
  id: GeneratedAlways<string>;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
}
export type SelectUser = Selectable<User>;
export type NewUser = Insertable<User>;
export type UserUpdate = Updateable<User>;

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}
export type SelectVerificationToken = Selectable<VerificationToken>;
export type NewVerificationToken = Insertable<VerificationToken>;
export type VerificationTokenUpdate = Updateable<VerificationToken>;

export interface RequestRescue {
  id: Generated<number>;
  latitude: Numeric;
  longitude: Numeric;
  userId: string;
  timeStamp: Date;
  additionalInfo?: string;
  phoneNumber: string;
  status: status;
  updatedAt: Date;
}
export type SelectRequestRescue = Selectable<RequestRescue>;
export type NewRequestRescue = Insertable<RequestRescue>;
export type RequestRescueUpdate = Updateable<RequestRescue>;
export interface UserRole {
  userId: string;
  role: 'admin' | 'superuser' | 'regular' | 'operator';
}
export type SelectUserRole = Selectable<UserRole>;
export type NewUserRole = Insertable<UserRole>;
export type UserRoleUpdate = Updateable<UserRole>;

export interface Database {
  Account: Account;
  Session: Session;
  RequestRescue: RequestRescue;
  User: User;
  VerificationToken: VerificationToken;
  UserRole: UserRole;
}
