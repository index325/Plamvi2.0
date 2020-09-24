import { ActionTypes, IAuthRequest, IAuthState } from './types';

export function authRequest(authState: IAuthRequest) {
  return {
    type: ActionTypes.authRequest,
    payload: {
      email: authState.email,
      password: authState.password,
    },
  };
}

export function authSuccess(authState: IAuthState) {
  return {
    type: ActionTypes.authSuccess,
    payload: {
      user: authState.user,
      token: authState.token,
    },
  };
}

export function logout() {
  return {
    type: ActionTypes.logout,
  };
}

export function loadUser() {
  return {
    type: ActionTypes.loadUser,
  };
}
