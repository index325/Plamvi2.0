import { all, takeLatest, call, put } from 'redux-saga/effects';

import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { authRequest, authSuccess, setLoading } from './actions';
import { alertRequest } from '../alerts/actions';
import api from '../../../services/api';
import { ActionTypes, IAuthState } from './types';

type AuthRequest = ReturnType<typeof authRequest>;

function* auth({ payload }: AuthRequest) {
  const { email, password } = payload;

  yield put(setLoading(true));

  try {
    const authResponse: AxiosResponse<IAuthState> = yield call(() =>
      api.post('users/sessions', { email, password }),
    );

    yield put(setLoading(false));
    yield put(
      authSuccess({
        user: authResponse.data.user,
        token: authResponse.data.token,
        loading: false,
      }),
    );
  } catch (error) {
    yield put(setLoading(false));
    yield put(
      alertRequest({
        message: error.response.data.message,
        messageType: 'danger',
        isDialog: true,
      }),
    );
  }
}

function* load() {
  let user = yield AsyncStorage.getItem('Plamvi:User');

  const token = yield AsyncStorage.getItem('Plamvi:Token');
  if (!!token) {
    user = JSON.parse(user);

    yield put(setLoading(false));
    yield put(
      authSuccess({
        user,
        token,
        loading: false,
      }),
    );
  }
}

export default all([
  takeLatest(ActionTypes.authRequest, auth),
  takeLatest(ActionTypes.loadUser, load),
]);
