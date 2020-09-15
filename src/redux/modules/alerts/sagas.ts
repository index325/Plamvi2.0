import { all, takeLatest, put } from 'redux-saga/effects';

import { alertSuccess, alertFailure, alertRequest } from './actions';
import { ActionTypes } from './types';

type AlertRequest = ReturnType<typeof alertRequest>;

function* auth({ payload }: AlertRequest) {
  const { message, isDialog, messageType } = payload;

  if (messageType === 'success') {
    yield put(
      alertSuccess({
        message,
        isDialog,
        messageType,
      }),
    );
  } else {
    yield put(
      alertFailure({
        message,
        isDialog,
        messageType,
      }),
    );
  }
}

export default all([takeLatest(ActionTypes.alertRequest, auth)]);
