import { IFailureMessage } from '../../../interfaces';
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

export function authFailure(failure: IFailureMessage) {
  return {
    type: ActionTypes.authFailure,
    payload: {
      message: failure.message,
      messageType: failure.messageType,
      isDialog: failure.isDialog,
    },
  };
}

export function logout() {
  return {
    type: ActionTypes.logout,
  };
}
