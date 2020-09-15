import { all, takeLatest, call, put } from 'redux-saga/effects';

import axios, { AxiosResponse } from 'axios';
import { authFailure, authRequest, authSuccess } from './actions';
import api from '../../../services/api';
import { ActionTypes, IAuthState } from './types';
import { IUser } from '../../../interfaces';

type AuthRequest = ReturnType<typeof authRequest>;

function* auth({ payload }: AuthRequest) {
  const { email, password } = payload;

  try {
    const authResponse: AxiosResponse<IAuthState> = yield call(() =>
      api.post('users/sessions', { email, password }),
    );

    yield put(
      authSuccess({
        user: authResponse.data.user,
        token: authResponse.data.token,
      }),
    );
  } catch (error) {
    console.log('deu erro 😢');
    // yield put(authFailure(product.id));
  }
}

export default all([takeLatest(ActionTypes.authRequest, auth)]);
