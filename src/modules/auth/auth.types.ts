import type { UserPublic } from '../user/user.types';

export type AuthTokenBundle = {
  accessToken: string;
};

export type RegisterResult = {
  user: UserPublic;
} & AuthTokenBundle;

export type LoginResult = {
  user: UserPublic;
} & AuthTokenBundle;
