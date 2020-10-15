export enum ActionTypes {
  authRequest = 'AUTH_REQUEST',
  authSuccess = 'AUTH_SUCCESS',
  logout = 'LOGOUT',
  loadUser = 'LOAD_USER',
}

export interface IUser {
  name: string;
  email: string;
  city: string;
  state: string;
}

export interface IAuthState {
  user: IUser | null;
  token: string;
}

export interface IAuthRequest {
  email: string;
  password: string;
}
