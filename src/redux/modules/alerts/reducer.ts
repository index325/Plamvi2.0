import { Reducer } from 'redux';
import produce from 'immer';
import { IAlertState, ActionTypes } from './types';

const INITIAL_STATE: IAlertState = {
  message: '',
  isDialog: false,
  messageType: undefined,
};

const auth: Reducer<IAlertState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.alertSuccess: {
        const { message, isDialog, messageType } = action.payload;

        draft.message = message;
        draft.isDialog = isDialog;
        draft.messageType = messageType;

        break;
      }

      case ActionTypes.alertFailure: {
        const { message, isDialog, messageType } = action.payload;

        draft.message = message;
        draft.isDialog = isDialog;
        draft.messageType = messageType;

        break;
      }

      case ActionTypes.alertReset: {
        draft.message = '';
        draft.isDialog = false;
        draft.messageType = undefined;

        break;
      }

      default: {
        return draft;
      }
    }
  });
};

export default auth;
