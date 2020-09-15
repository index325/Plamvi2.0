import { ActionTypes, IAlertState } from './types';

export function alertRequest(alertState: IAlertState) {
  return {
    type: ActionTypes.alertRequest,
    payload: {
      message: alertState.message,
      isDialog: alertState.isDialog,
      messageType: alertState.messageType,
    },
  };
}

export function alertSuccess(alertState: IAlertState) {
  return {
    type: ActionTypes.alertSuccess,
    payload: {
      message: alertState.message,
      isDialog: alertState.isDialog,
      messageType: alertState.messageType,
    },
  };
}

export function alertFailure(alertState: IAlertState) {
  return {
    type: ActionTypes.alertFailure,
    payload: {
      message: alertState.message,
      isDialog: alertState.isDialog,
      messageType: alertState.messageType,
    },
  };
}

export function alertReset() {
  return {
    type: ActionTypes.alertReset,
  };
}
