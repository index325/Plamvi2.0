import { Reducer } from 'redux';
import produce from 'immer';
import AsyncStorage from '@react-native-community/async-storage';
import { IUser, IAuthState, ActionTypes } from './types';

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

        AsyncStorage.setItem('Plamvi:User', JSON.stringify(user));
        AsyncStorage.setItem('Plamvi:Token', token);

        break;
      }

      case ActionTypes.logout: {
        draft.user = null;
        draft.token = '';

        AsyncStorage.removeItem('Plamvi:User');
        AsyncStorage.removeItem('Plamvi:Token');

        break;
      }

      default: {
        return draft;
      }
    }
  });
};

export default auth;
