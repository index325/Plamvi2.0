import { Reducer } from 'redux';
import produce from 'immer';
import { put } from 'redux-saga/effects';
import { IUser, IAuthState, ActionTypes } from './types';
import { alertRequest } from '../alerts/actions';

const INITIAL_STATE: IAuthState = {
  token: '',
  user: {} as IUser,
};

const auth: Reducer<IAuthState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.authSuccess: {
        const { user, token } = action.payload;

        draft.user = user;
        draft.token = token;

        break;
      }

      case ActionTypes.authFailure: {
        put(alertRequest(action.payload));

        break;
      }

      case ActionTypes.logout: {
        draft.user = {} as IUser;
        draft.token = '';

        break;
      }

      default: {
        return draft;
      }
    }
  });
};

export default auth;
