import { all } from 'redux-saga/effects';
import auth from './auth/sagas';
import alerts from './alerts/sagas';

export default function* rootSaga() {
  return yield all([auth, alerts]);
}
