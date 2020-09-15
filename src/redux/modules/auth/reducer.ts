import { Reducer } from 'redux';
import produce from 'immer';
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

        console.log(user, token);

        draft.user = user;
        draft.token = token;

        break;
      }

      case ActionTypes.authFailure: {
        // draft.push(action.payload.productId);
        console.log(action.payload);

        break;
      }

      default: {
        return draft;
      }
    }
  });
};

export default auth;
