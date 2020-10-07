import { all } from 'redux-saga/effects';
import auth from './auth/sagas';
import alerts from './alerts/sagas';
import client from './client/sagas';
import cart from './cart/sagas';

export default function* rootSaga() {
  return yield all([auth, client, cart, alerts]);
}
