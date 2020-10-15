import { all, takeLatest, put } from 'redux-saga/effects';

import AsyncStorage from '@react-native-community/async-storage';
import { clientSuccess } from './actions';
import { ActionTypes } from './types';

function* load() {
  let client = yield AsyncStorage.getItem('Plamvi:Client');

  client = JSON.parse(client);

  yield put(clientSuccess(client));
}

export default all([takeLatest(ActionTypes.loadClient, load)]);
