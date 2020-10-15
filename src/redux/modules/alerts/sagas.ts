import { all, takeLatest, put } from 'redux-saga/effects';

import {
  alertSuccess,
  alertFailure,
  alertRequest,
  alertReset,
} from './actions';
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
    yield put(alertReset());
  } else {
    yield put(
      alertFailure({
        message,
        isDialog,
        messageType,
      }),
    );
    yield put(alertReset());
  }
}

export default all([takeLatest(ActionTypes.alertRequest, auth)]);
