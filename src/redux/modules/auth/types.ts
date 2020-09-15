export enum ActionTypes {
  authRequest = 'AUTH_REQUEST',
  authSuccess = 'AUTH_SUCCESS',
  authFailure = 'AUTH_FAILURE',
  logout = 'LOGOUT',
}

export interface IUser {
  name: string;
  email: string;
  city: string;
  state: string;
}

export interface IAuthState {
  user: IUser;
  token: string;
}

export interface IAuthRequest {
  email: string;
  password: string;
}
