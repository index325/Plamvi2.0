import { IUser } from '../../../interfaces';

export enum ActionTypes {
  authRequest = 'AUTH_REQUEST',
  authSuccess = 'AUTH_SUCCESS',
  logout = 'LOGOUT',
  loadUser = 'LOAD_USER',
  setLoading = 'AUTH_LOADING',
}

export interface IAuthState {
  user: IUser | null;
  token: string;
  loading: boolean;
}

export interface IAuthRequest {
  email: string;
  password: string;
  loading: boolean;
}
