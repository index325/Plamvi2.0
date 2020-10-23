import { Reducer } from 'redux';
import produce from 'immer';
import AsyncStorage from '@react-native-community/async-storage';
import { IAuthState, ActionTypes } from './types';
import { IUser } from '../../../interfaces';

const INITIAL_STATE: IAuthState = {
  token: '',
  user: {} as IUser,
  loading: false,
};

const auth: Reducer<IAuthState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.authSuccess: {
        const { user, token } = action.payload;

        draft.user = user;
        draft.token = token;
        draft.loading = false;

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

      case ActionTypes.setLoading: {
        const { loading } = action.payload;

        draft.loading = loading;
        break;
      }

      default: {
        return draft;
      }
    }
  });
};

export default auth;
